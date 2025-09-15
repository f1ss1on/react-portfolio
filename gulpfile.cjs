const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const cleanCSS = require('gulp-clean-css');
const stripCssComments = require('gulp-strip-css-comments').default;
const sourcemaps = require('gulp-sourcemaps');
const rename = require('gulp-rename');

const paths = {
  scss: 'src/scss/style.scss',
  scssAll: 'src/scss/**/*.scss',
  cssDest: 'src/css/'
};

// Compile SCSS, output style.css and style.min.css
function styles() {
  // Output normal style.css
  gulp.src(paths.scss)
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(rename('style.css'))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(paths.cssDest));
  // Output minified style.min.css
  return gulp.src(paths.scss)
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(stripCssComments({ preserve: false }))
    .pipe(cleanCSS())
    .pipe(rename('style.min.css'))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(paths.cssDest));
}

gulp.task('styles', styles);

gulp.task('watch', gulp.series('styles', function() {
  gulp.watch(paths.scssAll, styles);
}));

gulp.task('default', gulp.series('styles'));
