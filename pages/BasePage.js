// BasePage.js
// This is the class that provides common functionality for all page objects in the application

class BasePage {

    constructor(page) {
        this.page = page;
    }


    async navigate(path) {
            await this.page.goto(path);
    }

}

module.exports = BasePage;