import gulp from 'gulp';
import babel from 'gulp-babel';
import uglify from 'gulp-uglify';
import { captureOriginalSize, logFileSize } from './utils.js';

export function minifyJs() {

    return gulp.src('./assets/js/app.js')
        .pipe(captureOriginalSize())
        .pipe(babel({
            presets: ['@babel/preset-env']
        }))
        .pipe(uglify())
        .pipe(logFileSize())
        .pipe(gulp.dest('./assets/dist/')
    );
}