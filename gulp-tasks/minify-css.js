import gulp from 'gulp';
import postcss from 'gulp-postcss';
import autoprefixer from 'autoprefixer';
import cleanCSS from 'gulp-clean-css';
import { captureOriginalSize, logFileSize } from './utils.js';

export function minifyCss() {

    return gulp.src('./assets/dist/style.css')
        .pipe(captureOriginalSize())
        .pipe(postcss([
            autoprefixer({
                cascade: false,
                grid: true
            })
        ]))
        .pipe(cleanCSS({
            level: {
                1: { all: true },
                2: { all: true }
            },
            rebase: true
        }))
        .pipe(logFileSize())
        .pipe(gulp.dest('./assets/dist')
    );
}