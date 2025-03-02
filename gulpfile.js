import gulp from 'gulp';
import postcss from 'gulp-postcss';
import autoprefixer from 'autoprefixer';
import cleanCSS from 'gulp-clean-css';
import babel from 'gulp-babel';
import uglify from 'gulp-uglify';
import log from 'fancy-log';
import through from 'through2';
import gulpSass from 'gulp-sass';
import * as sass from 'sass';
import imagemin from 'gulp-imagemin';


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

const sassProcessor = gulpSass(sass);
gulp.task('compile-sass', function() {

    return gulp.src('./assets/sass/style.scss')
        .pipe(sassProcessor())
        .on('error', sassProcessor.logError)
        .pipe(gulp.dest('./assets/dist/'));
});

gulp.task('compile-image', function() {

    return gulp.src('./assets/images/*')
        .pipe(captureOriginalSize())
        .pipe(imagemin())
        .pipe(logFileSize())
        .pipe(gulp.dest('./assets/dist/images'));
});

gulp.task('default', gulp.series('compile-image'));

gulp.task('watch', function() {
    gulp.watch('./assets/sass/**/*.scss', gulp.series('compile-sass'));
});