const gulp = require('gulp');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cleanCSS = require('gulp-clean-css');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const log = require('fancy-log');
const through = require('through2');
const sass = require('gulp-sass')(require('sass'));

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
        .pipe(gulp.dest('./assets/dist/'));
});

gulp.task('minify-js', function() {

    return gulp.src('./assets/js/app.js')
        .pipe(captureOriginalSize())
        .pipe(babel({
            presets: ['@babel/preset-env']
        }))
        .pipe(uglify())
        .pipe(logFileSize())
        .pipe(gulp.dest('./assets/dist/'));
});

gulp.task('compile-sass', function() {

    return gulp.src('./assets/sass/style.scss')
        .pipe(sass())
        .on('error', sass.logError)
        .pipe(gulp.dest('./assets/dist/'));
});

gulp.task('default', gulp.series('minify-css', 'minify-js'));

gulp.task('watch', function() {
    gulp.watch('./assets/sass/**/*.scss', gulp.series('compile-sass'));
});