const http = require('http');
const url = require('url');
const pm2 = require('pm2');
const { exec } = require('child_process');
require('dotenv').config();

const port = process.env.PORT || 3000;
const botName = 'discord-bot';
const apiKey = process.env.API_KEY;

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
    const queryObject = url.parse(req.url, true).query;
    
    if (queryObject.key !== apiKey) {
        res.writeHead(403, { 'Content-Type': 'text/plain' });
        res.end('Forbidden: Invalid API Key');
        return;
    }

    if (req.method === 'GET') {
        if (req.url.startsWith('/status')) {
            checkBotStatus((status) => {
                res.writeHead(200, { 'Content-Type': 'text/plain' });
                res.end(`Bot status: ${status}`);
            });
        } else if (req.url.startsWith('/start')) {
            executeCommand('npm run start', res);
        } else if (req.url.startsWith('/stop')) {
            executeCommand(`npm run stop`, res);
        } else if (req.url.startsWith('/restart')) {
            executeCommand(`npm run stop && npm run start`, res);
        } else if (req.url.startsWith('/delete')) {
            executeCommand(`npm run delete`, res);
        } else if (req.url.startsWith('/list')) {
            executeCommand(`npm run listing`, res);
        } else if (req.url.startsWith('/pull')) {
            executeCommand(`npm run pull`, res);
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
