import $ from 'jquery';

class myNotes {
  constructor() {
    this.events();
  }

  // Events
  events() {
    $('#my-notes').on('click', '.delete-note', this.deleteNote); 
    $('#my-notes').on('click', '.edit-note', this.editNote.bind(this)); 
    $('#my-notes').on('click', '.update-note', this.updateNote.bind(this));
    $('.submit-note').on('click', this.createNote.bind(this));
  }

  // Methods
  editNote(e) {
    var thisNote = $(e.target).parents('li');
    if (thisNote.data('state') ==  'editable' ) {
      // make read only
      this.makeNoteReadOnly(thisNote);
    } else {
      // make editable
      this.makeNoteEditable(thisNote);
    }   
  }

  makeNoteEditable(thisNote) {
    thisNote.find('.edit-note').html('<i class="fa fa-times" aria-hidden="true"></i> Cancel');
    thisNote.find('.note-title-field, .note-body-field').removeAttr('readonly').addClass('note-active-field');
    thisNote.find('.update-note').addClass('update-note--visible');
    thisNote.data('state', 'editable');
  }

  makeNoteReadOnly(thisNote) {
    thisNote.find('.edit-note').html('<i class="fa fa-pencil" aria-hidden="true"></i> Edit');
    thisNote.find('.note-title-field, .note-body-field').attr('readonly', 'readonly').removeClass('note-active-field');
    thisNote.find('.update-note').removeClass('update-note--visible');
    thisNote.data('state','cancel');
  }

  // Delete note
  deleteNote(e) {
    var thisNote = $(e.target).parents('li');

    $.ajax({
      beforeSend: (xhr) => {
        xhr.setRequestHeader('X-WP-Nonce', universityData.nonce);
      },
      url: universityData.root_url + '/wp-json/wp/v2/note/' + thisNote.data('id'),
      type: 'DELETE',
      success: (response) => {
        thisNote.slideUp();        
        console.log('Deleted Successfully');
        console.log(response);
        if (response.userNoteCount < 5) {
          $('.note-limit-message').removeClass('active');
        }
      },
      error: (response) => {
        console.log('Sorry, could not delete');
        console.log(response);
      }
    });
  }

  // Save the updated note
  updateNote(e) {
    var thisNote = $(e.target).parents('li');
    var ourUpdatedPost = {
      'title': thisNote.find('.note-title-field').val(),
      'content': thisNote.find('.note-body-field').val()
    }

    $.ajax({
      beforeSend: (xhr) => {
        xhr.setRequestHeader('X-WP-Nonce', universityData.nonce);
      },
      url: universityData.root_url + '/wp-json/wp/v2/note/' + thisNote.data('id'),
      type: 'POST',
      data: ourUpdatedPost,
      success: (response) => {   
        this.makeNoteReadOnly(thisNote);     
        console.log('Saved Successfully');
        console.log(response);
      },
      error: (response) => {        
        console.log('Sorry, the new data are not saved');
        console.log(response);
      }
    });
  }

  // Create new note
  createNote(e) {
    
    var ourNewPost = {
      'title': $('.new-note-title').val(),
      'content': $('.new-note-body').val(),
      'status': 'publish'
    }

    $.ajax({
      beforeSend: (xhr) => {
        xhr.setRequestHeader('X-WP-Nonce', universityData.nonce);
      },
      url: universityData.root_url + '/wp-json/wp/v2/note/',
      type: 'POST',
      data: ourNewPost,
      success: (response) => {
        $('.new-note-title, .new-note-body').val('');
        $(`
          <li data-id="${response.id}">
            <input readonly class="note-title-field" value="${response.title.raw}">
            <span class="edit-note"><i class="fa fa-pencil" aria-hidden="true"></i> Edit</span>
            <span class="delete-note"><i class="fa fa-trash-o" aria-hidden="true"></i> Delete</span>
            <textarea readonly class="note-body-field">${response.content.raw}</textarea><br>
            <span class="update-note btn btn--blue btn--small"><i class="fa fa-arrow-right" aria-hidden="true"></i> Save</span>
          </li>
        `).prependTo('#my-notes').hide().slideDown();
        console.log('New Post Saved Successfully');
        console.log(response);
      },
      error: (response) => {        
        console.log('Sorry, the new post was not saved');
        console.log(response);
        if (response.responseText = "You have reached your note limit.") {
          $(".note-limit-message").addClass("active");
        }
      }
    });
  }
}

export default myNotes;
