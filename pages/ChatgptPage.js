const { log } = require('../utils/logger');

class ChatgptPage {
    constructor(page) {
        this.page = page;

        this.promptTextArea = page.locator('#prompt-textarea');
        this.promptAnswer = page.locator('//section[contains(@data-testid, "conversation-turn")]//p');
        this.stopGeneratingButton = page.getByTestId('stop-button');
        this.newChatButton = page.getByTestId('create-new-chat-button').first();
        this.clearChatButton = page.getByRole('button', { name: /clear chat/i }).first();
    }


    async waitForPromptReady(timeout = 40000) {
    await this.page.waitForSelector('#prompt-textarea:not([disabled])', 
        {state: 'visible',timeout});
    }

    async sendPrompt(prompt) {
    await this.waitForPromptReady();
    await this.promptTextArea.fill(prompt);
    await this.promptTextArea.press('Enter');
    log(`Sending prompt`);

    }

    async waitForResponseToComplete() {
    // await this.stopGeneratingButton.waitFor({ state: 'visible' });
    await this.stopGeneratingButton.waitFor({ state: 'hidden' });
    }

    async getResponse() {  
    log(`Getting response from ChatGPT`);
    await this.waitForResponseToComplete();
    return await this.promptAnswer.last().innerText();
    }

    async startNewChat() {
    log(`Starting new chat`);
    await this.newChatButton.click({ force: true });
    if (await this.clearChatButton.isVisible({ timeout: 4000 })) {
        await this.clearChatButton.click();
    }
    log(`New chat started`);
    await this.waitForPromptReady();
}


};

module.exports = ChatgptPage;