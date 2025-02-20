const gulp = require('gulp');
const fs = require('fs');
const path = require('path');

function minifyCss(content) {
    return content.replace(/\s+/g, ' ').replace(/\/\*.*?\*\//g, '');
}

gulp.task('minify-css', function(done) {

    const sourcePath = path.join(__dirname, 'assets/css');
    const destPath = path.join(__dirname, 'assets/css');

    fs.readdir(sourcePath, (err, files) => {
        if (err) throw err;

        files.forEach(file => {
            const filePath = path.join(sourcePath, file);
            const fileExt = path.extname(file);

            if (fileExt === '.css') {
                fs.readFile(filePath, 'utf8', (err, data) => {
                    if (err) throw err;

                    const minifiedContent = minifyCss(data);

                    const destFilePath = path.join(destPath, file);
                    fs.writeFile(destFilePath, minifiedContent, (err) => {
                        if (err) throw err;
                    });
                });
            }
        });

        done();
    });
});


gulp.task('default', gulp.series('minify-css'));
