const gulp = require('gulp');
const cleanCSS = require('gulp-clean-css');
const uglify = require('gulp-uglify');
const debug = require('gulp-debug').default;
const log = require('fancy-log');
const mime = require('mime');
const colors = require('ansi-colors');
const through = require('through2');

function captureOriginalSize() {

    return through.obj(function(file, enc, cb) {
        
        if (file.isBuffer()) {
            file.originalSize = Buffer.byteLength(file.contents);
        }

        cb(null, file);
    });
}

function logFileSize() {
 
    return through.obj(function(file, enc, cb) {

        if (file.isBuffer()) {

            file.contents = Buffer.from(file.contents.toString());

            const minifiedSize = Buffer.byteLength(file.contents);
            
            log(`
                Archive: ${file.relative}
                Original size: ${file.originalSize} bytes
                Minified size: ${minifiedSize} bytes
                Efficiency: ${((1 - minifiedSize / file.originalSize) * 100).toFixed(2)}%
            `);
        }
        cb(null, file);
    });
}

gulp.task('minify-css', function() {

    return gulp.src('./assets/css/style.css')
        .pipe(captureOriginalSize())
        .pipe(cleanCSS({
            level: {
                1: { all: true },
                2: { all: true }
            },
            rebase: true,
            rebaseTo: 'dist',
            compatibility: 'ie8, > 0.5%, last 2 versions'
        }))
        .pipe(logFileSize())
        .pipe(gulp.dest('./assets/dist/'));
});

gulp.task('minify-js', function() {

    return gulp.src('./assets/js/app.js')
        .pipe(captureOriginalSize())
        .pipe(uglify())
        .pipe(logFileSize())
        .pipe(gulp.dest('./assets/dist/'));
});

gulp.task('default', gulp.series('minify-css', 'minify-js'));