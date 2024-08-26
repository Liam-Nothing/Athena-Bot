const http = require('http');
const pm2 = require('pm2');
const { exec } = require('child_process');

const port = process.env.PORT || 3000;
const botName = 'discord-bot';

function checkBotStatus(callback) {
    pm2.connect((err) => {
        if (err) {
            console.error(err);
            callback('error');
            return;
        }

        pm2.describe(botName, (err, description) => {
            pm2.disconnect();

            if (err || !description || description.length === 0) {
                callback('not found');
                return;
            }

            const botProcess = description[0];
            const status = botProcess.pm2_env.status;

            callback(status);
        });
    });
}

function executeCommand(command, res) {
    exec(command, (err, stdout, stderr) => {
        if (err) {
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end(`Error: ${stderr}`);
            return;
        }
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end(stdout);
    });
}

const server = http.createServer((req, res) => {
    if (req.method === 'GET') {
        if (req.url === '/status') {
            checkBotStatus((status) => {
                res.writeHead(200, { 'Content-Type': 'text/plain' });
                res.end(`Bot status: ${status}`);
            });
        } else if (req.url === '/start') {
            executeCommand('npm run start', res);
        } else if (req.url === '/stop') {
            executeCommand(`npm run stop`, res);
        } else if (req.url === '/restart') {
            executeCommand(`npm run stop && npm run start`, res);
        } else if (req.url === '/delete') {
            executeCommand(`npm run delete`, res);
        } else if (req.url === '/list') {
            executeCommand(`npm run listing`, res);
        } else {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('Not Found');
        }
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Not Found');
    }
});

server.listen(port, () => {
    console.log(`Status server running at http://localhost:${port}`);
});
