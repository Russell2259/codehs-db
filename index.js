import CodeHS_DB from './lib/index.js'
import http from 'node:http';

const server = http.createServer();

server.on('request', (req, res) => {
    res.writeHead(403);
    res.end('Forbidden');
});

const DB = new CodeHS_DB('codehsdb', 'new_project');

DB.on('ready', async () => {
    DB.set('a87wydahaiwudhj');

    console.log(await DB.get());
})

server.listen(4000);