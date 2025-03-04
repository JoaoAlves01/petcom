import gulp from 'gulp';
import javascriptObfuscator from 'gulp-javascript-obfuscator';

export function obfuscateJs() {
    return gulp.src('./assets/dist/*.js')
        .pipe(javascriptObfuscator({
            compact: true,
            controlFlowFlattening: true,
            deadCodeInjection: true,
            debugProtection: false,
            disableConsoleOutput: true,
            log: false,
            mangle: true,
            renameGlobals: false,
            rotateStringArray: true,
            selfDefending: true,
            stringArray: true,
            stringArrayEncoding: ['base64'],
            stringArrayThreshold: 0.75,
            unicodeEscapeSequence: false
        }))
        .pipe(gulp.dest('./assets/dist/'));
}
