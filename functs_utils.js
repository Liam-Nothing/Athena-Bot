const fs = require('fs');
const path = require('path');

function logText(text) {
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString().slice(0, 19).replace('T', ' ');
    const logMessage = `[${formattedDate}] ${text}`;

    // Log to console
    console.log(logMessage);

    // Log to file
    const logFilePath = path.join(__dirname, 'app.log'); // Define path to log file
    fs.appendFileSync(logFilePath, logMessage + '\n'); // Append the log message to the log file
}

module.exports.logText = logText;
