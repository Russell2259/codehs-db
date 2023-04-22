import CodeHS_DB from 'codehs-db';
import http from 'node:http';

const server = http.createServer();

server.on('request', (req, res) => {
    res.writeHead(403);
    res.end('Forbidden');
});

const DB = await CodeHS_DB.init('codehsdb', 'new_database');

DB.on('ready', async () => {
    DB.set('Hello World');

    console.log(await DB.get());
})

server.listen(4000);