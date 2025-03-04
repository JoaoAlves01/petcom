import through from 'through2';
import log from 'fancy-log';

export function captureOriginalSize() {
    return through.obj(function(file, enc, cb) {
        if (file.isBuffer()) {
            file.originalSize = Buffer.byteLength(file.contents);
        }
        cb(null, file);
    });
}

export function logFileSize() {
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
