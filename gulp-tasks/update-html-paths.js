import gulp from 'gulp';
import replace from 'gulp-replace';

export function updateHtmlPaths() {

    return gulp.src('./**/*.php')
        .pipe(replace('assets/images/', 'assets/dist/images/'))
        .pipe(gulp.dest(function(file) {
            return file.base;
        })
    );
}