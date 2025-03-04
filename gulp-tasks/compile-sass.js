import gulp from 'gulp';
import gulpSass from 'gulp-sass';
import * as sass from 'sass';

const sassProcessor = gulpSass(sass);
export function compileSass() {

    return gulp.src('./assets/sass/style.scss')
        .pipe(sassProcessor())
        .on('error', sassProcessor.logError)
        .pipe(gulp.dest('./assets/dist/')
    );
}
