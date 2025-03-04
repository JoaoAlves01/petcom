import gulp from 'gulp';
import imagemin from 'gulp-imagemin';
import { captureOriginalSize, logFileSize } from './utils.js';

export function compileImage() {

    return gulp.src('./assets/images/**/*')
        .pipe(captureOriginalSize())
        .pipe(imagemin())
        .pipe(logFileSize())
        .pipe(gulp.dest('./assets/dist/images')
    );
}