const os = require('os');
const { version } = require('@playwright/test/package.json');

class EnvironmentReporter {

    onBegin(config, suite) {

        console.log('\n====================================================');
        console.log('Environment Information');
        console.log('====================================================');

        console.log(`OS             : ${os.type()} ${os.release()}`);
        console.log(`Node.js        : ${process.version}`);
        console.log(`Playwright     : ${version}`);
        console.log(`Base URL       : ${process.env.BASE_URL}`);
        console.log(`Execution Mode : ${process.env.EXECUTION_MODE}`);
        console.log(`Start Time     : ${new Date().toLocaleString()}`);

        console.log('====================================================\n');

    }

}

module.exports = EnvironmentReporter;