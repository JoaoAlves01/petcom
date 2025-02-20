const gulp = require('gulp');
const fs = require('fs');
const path = require('path');

// Minify CSS
function minifyCss(content) {
    return content.replace(/\s+/g, ' ')
    .replace(/\/\*.*?\*\//g, '');
}

// Minify JS
function minifyJs(content) {
    return content.replace(/\s+/g, ' ')
        .replace(/\/\*.*?\*\//g, '')
        .replace(/\/\/.*(?=\n)/g, '');
}



gulp.task('minify-css', function(done) {

    const sourcePath = path.join(__dirname, 'assets/css');
    const destPath = path.join(__dirname, 'assets/css');

    fs.readdir(sourcePath, (err, files) => {
        if (err) throw err;

        files.forEach(file => {
            const filePath = path.join(sourcePath, file);
            const fileExt = path.extname(file);
            const fileName = path.basename(file, fileExt);

            if (fileExt === '.css') {
                fs.readFile(filePath, 'utf8', (err, data) => {
                    if (err) throw err;

                    const minifiedContent = minifyCss(data);
                    const destFilePath = path.join(destPath, `${fileName}-min${fileExt}`);
                    
                    fs.writeFile(destFilePath, minifiedContent, (err) => {
                        if (err) throw err;
                    });
                });
            }
        });

        done();
    });
});

gulp.task('minify-js', function(done) {

    const sourcePath = path.join(__dirname, 'assets/js');
    const destPath = path.join(__dirname, 'assets/js');

    fs.readdir(sourcePath, (err, files) => {
        if (err) throw err;

        files.forEach(file => {
            const filePath = path.join(sourcePath, file);
            const fileExt = path.extname(file);
            const fileName = path.basename(file, fileExt);

            if (fileExt === '.js') {
                fs.readFile(filePath, 'utf8', (err, data) => {
                    if (err) throw err;

                    const minifiedContent = minifyJs(data);
                    const destFilePath = path.join(destPath, `${fileName}-min${fileExt}`);

                    fs.writeFile(destFilePath, minifiedContent, (err) => {
                        if (err) throw err;
                    });
                });
            }
        });

        done();
    });
});


gulp.task('default', gulp.series('minify-css', 'minify-js'));
