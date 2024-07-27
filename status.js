const http = require('http');
const pm2 = require('pm2');

const port = process.env.PORT || 3000;
const botName = 'discord-bot';

function checkBotStatus(callback) {
    pm2.connect((err) => {
        if (err) {
            console.error(err);
            callback(false);
            return;
        }

        pm2.describe(botName, (err, description) => {
            pm2.disconnect();

            if (err || !description || description.length === 0) {
                callback(false);
                return;
            }

            const botProcess = description[0];
            const isOnline = botProcess.pm2_env.status === 'online';

            callback(isOnline);
        });
    });
}

const server = http.createServer((req, res) => {
    if (req.method === 'GET' && req.url === '/status') {
        checkBotStatus((isOnline) => {
            if (isOnline) {
                res.writeHead(200, { 'Content-Type': 'text/plain' });
                res.end('Bot is running');
            } else {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Bot is not running');
            }
        });
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Not Found');
    }
});

server.listen(port, () => {
    console.log(`Status server running at http://localhost:${port}`);
});
