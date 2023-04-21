import http from 'node:http';
import https from 'node:https';

const decompress = (res, data) => {
    switch (res.headers['content-encoding']) {
        case 'gzip': {
            return zlib.gunzipSync(Buffer.concat(data));
        }
        case 'deflate': {
            return zlib.inflateSync(Buffer.concat(data));
        }
        case 'br': {
            return zlib.brotliCompressSync(Buffer.concat(data));
        }
        default: {
            return Buffer.concat(data);
        }
    }
}

const request = (url, options) => {
    return new Promise((resolve, reject) => {
        try {
            const req = eval(new URL(url).protocol.slice(0, -1)).request(new URL(url), {
                method: options.method,
                headers: options.headers,
                rawHeaders: []
            }, res => {
                const chunks = [];

                res.on('data', chunk => chunks.push(chunk)).on('end', () => {
                    const data = decompress(res, chunks);

                    resolve({
                        data: data,
                        headers: res.headers,
                        status: res.statusCode
                    });
                });
            }).on('error', (e) => {
                reject(e);
            });

            if (options.body) {
                req.write(options.body);
            }

            req.end();
        } catch (e) {
            reject(e);
        }
    });
}

export default request;