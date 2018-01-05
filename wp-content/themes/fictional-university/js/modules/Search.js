import $ from 'jquery';

class Search {

  // 1. describe and create/initiate our object
  constructor() {
    this.addSearchHTML();  // loads the overlay HTML
    this.resultsDiv       = $('#search-overlay__results');
    this.openButton       = $('.js-search-trigger');
    this.closeButton      = $('.search-overlay__close');
    this.searchOverlay    = $('.search-overlay');
    this.searchField      = $('#search-term');
    this.events();    
    this.isOverlayOpen    = false;
    this.isSpinnerVisible = false;
    this.previousValue;
    this.typingTimer;    
  }

  // 2. events
  events() {
    this.openButton.on('click', this.openOverlay.bind(this)); // on() changes the meaning of "this" to HTML element, so we use bind()
    this.closeButton.on('click', this.closeOverlay.bind(this));
    $(document).on('keydown', this.keyPressDispatcher.bind(this));
    this.searchField.on('keyup', this.typingLogic.bind(this)); // here we set keyup because keydown is too fast and does not allow the search field to update it's own value
  }

  // 3. methods (function, action)
  typingLogic() {
    if (this.searchField.val() != this.previousValue) {
      clearTimeout(this.typingTimer);

      if (this.searchField.val()) {
        if (!this.isSpinnerVisible) {
          this.resultsDiv.html('<div class="spinner-loader"></div>');
          this.isSpinnerVisible = true;
        }
        this.typingTimer = setTimeout(this.getResults.bind(this), 750);

      } else {
        this.resultsDiv.html('');
        this.isSpinnerVisible = false;
      }      
    }    
    this.previousValue = this.searchField.val();
  }

  getResults() {

    // requests with custom API 
    var apiUrl = universityData.root_url + '/wp-json/university/v1/search?term=' + this.searchField.val();

    $.getJSON(apiUrl, (results) =>  {
      this.resultsDiv.html(`
        <div class="row">
          <div class="one-third">
            <h2 class="search-overlay__section-title">General Information</h2>
            ${results.generalInfo.length ? "<ul class='link-list min-list'>" : "<p>No general information matches that search.</p>"}  
              ${results.generalInfo.map(item => `<li><a href ="${item.permalink}">${item.title}</a> ${item.postType == 'post' ? ` by ${item.authorName}` : ''}</li>`).join('')}
            ${results.generalInfo.length ? "</ul>" : ""}
          </div>

          <div class="one-third">
            <h2 class="search-overlay__section-title">Programs</h2>
            ${results.programs.length ? "<ul class='link-list min-list'>" : `<p>No programs match that search. <a href='${universityData.root_url}/programs'>View all programs</a></p>`}  
              ${results.programs.map(item => `<li><a href ="${item.permalink}">${item.title}</a></li>`).join('')}
            ${results.programs.length ? "</ul>" : ""}

            <h2 class="search-overlay__section-title">Professors</h2>
            ${results.professors.length ? "<ul class='professor-cards'>" : `<p>No professors match that search.</p>`}  
              ${results.professors.map(item => `
                <li class="professor-card__list-item">
                  <a class="professor-card" href="${item.permalink}">
                    <img class="professor-card__image" src="${item.image}">
                    <span class="professor-card__name">${item.title}</span>
                  </a>
                </li>
              `).join('')}
            ${results.professors.length ? "</ul>" : ""}            
          </div>

          <div class="one-third">            
            <h2 class="search-overlay__section-title">Campuses</h2>
            ${results.campuses.length ? "<ul class='link-list min-list'>" : `<p>No campuses match that search. <a href='${universityData.root_url}/campuses'>View all Campuses</a></p>`}  
              ${results.campuses.map(item => `<li><a href ="${item.permalink}">${item.title}</a></li>`).join('')}
            ${results.campuses.length ? "</ul>" : ""}

            <h2 class="search-overlay__section-title">Events</h2>
            ${results.events.length ? '' : `<p>No events match that search. <a href='${universityData.root_url}/events'>View all events</a></p>`}  
              ${results.events.map(item => `
                <div class="event-summary">
                  <a class="event-summary__date t-center" href="${item.permalink}">
                    <span class="event-summary__month">${item.month}</span>
                    <span class="event-summary__day">${item.day}</span>  
                  </a>
                  <div class="event-summary__content">
                    <h5 class="event-summary__title headline headline--tiny"><a href="${item.permalink}">${item.title}</a></h5>
                    <p>${item.description} <a href="${item.permalink}" class="nu gray">Learn more</a></p>
                  </div>
                </div>
              `).join('')}
          </div>
        </div>
      `);
      this.isSpinnervisible = false;
    });

  /*  
    // Asinchronous method (faster) using Wordpress API
    $.when(
      $.getJSON(universityData.root_url + '/wp-json/wp/v2/posts?search=' + this.searchField.val()), 
      $.getJSON(universityData.root_url + '/wp-json/wp/v2/pages?search=' + this.searchField.val())
      )
        .then((posts, pages) => {
          var combinedResults = posts[0].concat(pages[0]);
          this.resultsDiv.html(`
            <h2 class="search-overlay__section-title">General Information</h2> 
              ${combinedResults.length ? "<ul class='link-list min-list'>" : "<p>No general information mathces that search.</p>"}  
                ${combinedResults.map(item => `<li><a href ="${item.link}">${item.title.rendered}</a> ${item.type == 'post' ? ` by ${item.authorName}` : ''}</li>`).join('')}
              ${combinedResults.length ? "</ul>" : ""}
          `);
          this.isSpinnerVisible = false;
        }, () => {
          this.resultsDiv.html('<p>Unexpecting eror, please try again.</p>');
    });
  */

    // Sinchronous method of getting requests using Wordpress API
   /*$.getJSON(universityData.root_url + '/wp-json/wp/v2/posts?search=' + this.searchField.val(), posts => {
      $.getJSON(universityData.root_url + '/wp-json/wp/v2/pages?search=' + this.searchField.val(), pages => {
        var combinedResults = posts.concat(pages);
        this.resultsDiv.html(`
        <h2 class="search-overlay__section-title">General Information</h2> 
          ${combinedResults.length ? "<ul class='link-list min-list'>" : "<p>No general information mathces that search.</p>"}  
            ${combinedResults.map(item => `<li><a href ="${item.link}">${item.title.rendered}</a></li>`).join('')}
          ${combinedResults.length ? "</ul>" : ""}
      `);
        this.isSpinnerVisible = false;
      });
    });
 */

  }

  keyPressDispatcher(e) {  
    //console.log(e.keyCode);
    if (e.keyCode == 83 && !this.isOverlayOpen && !$('input, textarea').is(':focus')) {
      this.openOverlay();
    }
    if (e.keyCode == 27 && this.isOverlayOpen) {
      this.closeOverlay();
    }
  }

  openOverlay() {
    this.searchOverlay.addClass('search-overlay--active');
    $('body').addClass('body-no-scroll');
    this.searchField.val(''); // clear the search field before open
    setTimeout(() => this.searchField.focus(),301); // paces the cursor in the search field
    this.isOverlayOpen = true;
  }

  closeOverlay() {
    this.searchOverlay.removeClass('search-overlay--active');
    $('body').removeClass('body-no-scroll');
    this.isOverlayOpen = false;
  }

  // load the overlay HTML on page
  addSearchHTML() {
    $('body').append(`
            <div class="search-overlay">
         <div class="search-overlay__top">
            <div class="container">
							<i class="fa fa-search search-overlay__icon" aria-hidden="true"></i>              
              <input type="text" class="search-term" placeholder="What are you looking for?" id="search-term">
							<i class="fa fa-window-close search-overlay__close" aria-hidden="true"></i> 
            </div>
         </div>
         <div class="container">
           <div id="search-overlay__results"></div>
         </div>
      </div>
    `);
  }
}

export default Search;