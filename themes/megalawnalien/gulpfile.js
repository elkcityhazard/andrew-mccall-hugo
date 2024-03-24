const gulp = require('gulp');
const concatCss = require('gulp-concat-css');

gulp.task('concat-css', function() {
 return gulp.src('./static/css/*.css') // Adjust the path to your CSS files
    .pipe(concatCss('bundle.css')) // Name of the output file
    .pipe(gulp.dest('./assets/css')); // Output directory
});
