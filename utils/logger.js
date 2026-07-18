const fs = require('fs');
const path = require('path');

const logFile = path.join('reports', 'execution.log');


// Logs a message to the console and appends it to the execution log file
function log(message) {
    fs.mkdirSync('reports', { recursive: true });

    const logMessage = `[${new Date().toLocaleTimeString()}] ${message}`;

    console.log(logMessage);
    fs.appendFileSync(logFile, logMessage + '\n');
}

module.exports = { log };