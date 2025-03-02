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
import replace from 'gulp-replace';

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
            const minifiedSize = Buffer.byteLength(file.contents);
            log(`
                Arquivo: ${file.relative}
                Tamanho original: ${file.originalSize} bytes
                Tamanho otimizado: ${minifiedSize} bytes
                Eficiência: ${((1 - minifiedSize / file.originalSize) * 100).toFixed(2)}%
            `);
        }
        cb(null, file);
    });
}

gulp.task('minify-css', function() {

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
        .pipe(gulp.dest('./assets/dist'));
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

    return gulp.src('./assets/images/**/*')
        .pipe(captureOriginalSize())
        .pipe(imagemin())
        .pipe(logFileSize())
        .pipe(gulp.dest('./assets/dist/images'));
});

gulp.task('update-html-paths', function() {

    return gulp.src('./**/*.php')
        .pipe(replace('assets/images/', 'assets/dist/images/'))
        .pipe(gulp.dest(function(file) {
            return file.base;
        }));
});

gulp.task('default', gulp.series('minify-css', 'minify-js', 'compile-image', 'update-html-paths'));

gulp.task('watch', function() {
    gulp.watch('./assets/sass/**/*.scss', gulp.series('compile-sass'));
});