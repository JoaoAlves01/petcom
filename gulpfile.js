const gulp = require('gulp');
const cleanCSS = require('gulp-clean-css');
const gulpDebug = require('gulp-debug').default;

gulp.task('minify-css', function() {

    return gulp.src('./assets/css/style.css')
        .pipe(cleanCSS({
            debug: true,
            level: {
                1: { all: true },
                2: { all: true }
            },
            rebase: true,
            rebaseTo: 'dist',
            compatibility: 'ie8, > 0.5%, last 2 versions'
        }, (details) => {
            console.log(`
                Archive: ${details.name}
                Original size: ${details.stats.originalSize}
                Minified size: ${details.stats.minifiedSize}
                Efficiency: ${details.stats.efficiency * 100}%
            `);
        }))
        .pipe(gulp.dest('./assets/dist/'));
});

gulp.task('default', gulp.series('minify-css'));