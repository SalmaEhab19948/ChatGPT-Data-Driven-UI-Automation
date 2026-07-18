const { test } = require('@playwright/test');
const ChatgptPage = require('../pages/ChatgptPage');
const ExcelUtil = require('../utils/ExcelUtil');
const PromptBuilder = require('../utils/PromptBuilder');
const BasePage = require('../pages/BasePage');

test.beforeEach(async ({ page }) => {
    const basePage = new BasePage(page);
    await basePage.navigate('/');
});


test('Capital of Saudi Arabia @TC001', async ({ page }) => {
    const chatgptPage = new ChatgptPage(page);

    const testData = ExcelUtil.getTestCase('TC001');
    const prompt = PromptBuilder.buildQuestionPrompt(testData.question);
    await chatgptPage.sendPrompt(prompt);
    const actualAnswer = await chatgptPage.getResponse();

    ExcelUtil.updateActualAnswer(testData.testId, actualAnswer);

    await chatgptPage.startNewChat();
    const validationPrompt = PromptBuilder.buildValidationPrompt(
        testData.question,
        testData.expectedAnswer,actualAnswer
    );

    await chatgptPage.sendPrompt(validationPrompt);
    const validationResult = await chatgptPage.getResponse();
    ExcelUtil.updateResult(testData.testId, validationResult);
});


test('Capital of India @TC002', async ({ page }) => {
    const chatgptPage = new ChatgptPage(page);

    const testData = ExcelUtil.getTestCase('TC002');
    const prompt = PromptBuilder.buildQuestionPrompt(testData.question);
    await chatgptPage.sendPrompt(prompt);
    const actualAnswer = await chatgptPage.getResponse();

    ExcelUtil.updateActualAnswer(testData.testId, actualAnswer);

    await chatgptPage.startNewChat();
    const validationPrompt = PromptBuilder.buildValidationPrompt(
        testData.question,
        testData.expectedAnswer,actualAnswer
    );

    await chatgptPage.sendPrompt(validationPrompt);
    const validationResult = await chatgptPage.getResponse();
    ExcelUtil.updateResult(testData.testId, validationResult);
});


test('Submission process @TC003', async ({ page }) => {
    const chatgptPage = new ChatgptPage(page);

    const testData = ExcelUtil.getTestCase('TC003');
    const prompt = PromptBuilder.buildQuestionPrompt(testData.question);
    await chatgptPage.sendPrompt(prompt);
    const actualAnswer = await chatgptPage.getResponse();

    ExcelUtil.updateActualAnswer(testData.testId, actualAnswer);

    await chatgptPage.startNewChat();
    const validationPrompt = PromptBuilder.buildValidationPrompt(
        testData.question,
        testData.expectedAnswer,actualAnswer
    );

    await chatgptPage.sendPrompt(validationPrompt);
    const validationResult = await chatgptPage.getResponse();
    ExcelUtil.updateResult(testData.testId, validationResult);
});
