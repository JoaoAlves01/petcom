import gulp from 'gulp';
import { minifyCss } from './gulp-tasks/minify-css.js';
import { minifyJs } from './gulp-tasks/minify-js.js';
import { compileSass } from './gulp-tasks/compile-sass.js';
import { compileImage } from './gulp-tasks/compile-image.js';
import { updateHtmlPaths } from './gulp-tasks/update-html-paths.js';

gulp.task('default', gulp.series(minifyCss, minifyJs, compileSass, compileImage, updateHtmlPaths));

gulp.task('watch', function() {
    gulp.watch('./assets/sass/**/*.scss', gulp.series('compile-sass'));
});