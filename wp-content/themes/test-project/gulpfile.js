var gulp = require('gulp'),
    browserSync = require('browser-sync'),
    sass = require('gulp-sass');


// Configure BrowserSybc
gulp.task('browser-sync', function(){
  var files = [
    './style.css',
    './*.php'
  ];
  // Initialize BrowserSync with a PHP server
  browserSync.init(files, {
    proxy: 'http://localhost/test-project/'
  });
});

// Configure Sass task to run when the specified .scss files change
// BrowserSync will also reload browsers
gulp.task('sass', function(){
  return gulp.src('sass/*.scss')
    .pipe(sass({
      'outputStyle': 'compressed'
    }))
    .pipe(gulp.dest('./'))
    .pipe(browserSync.stream());
});

// Create the default task that can be called using 'gulp'
// The task will process sass, run browser-sync and start watching for changes
gulp.task('default', ['sass', 'browser-sync'], function(){
  gulp.watch('sass/**/*.scss', ['sass']);
});
