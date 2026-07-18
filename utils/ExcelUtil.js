const XLSX = require('xlsx');
const path = require('path');
const { log } = require('./logger');


class ExcelUtil {

    static filePath = path.join(__dirname, '../test-data/TestData.xlsx');


    // Loads the Excel file and returns the workbook, sheet name, and data as an array of objects
    static loadingExcelFile() {
        const workbook = XLSX.readFile(this.filePath);
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const data = XLSX.utils.sheet_to_json(worksheet);
        return { workbook, sheetName, data };
    }


    // Retrieves a specific test case from the Excel file based on the provided test case ID
    static getTestCase(testCaseId) {
    const { data } = this.loadingExcelFile();
    const row = data.find(r => r['Test ID'] === testCaseId);
    if (!row) {
        throw new Error(`Test case '${testCaseId}' was not found in TestData.xlsx`);
    }
    log(`Reading test case '${testCaseId}: ${row['Question']}' from Excel.`);
    return {
        testId: row['Test ID'],
        question: row['Question'],
        expectedAnswer: row['Expected Answer'],
        actualAnswer: row['Actual Answer'] || '',
        result: row['Result'] || ''
    };
    }


    // Updates a specific cell in the Excel file for a given test case ID and column name
    //Called by functions updateActualAnswer and updateResult
    static updateCell(testCaseId, columnName, value) {

        const { workbook, sheetName, data } = this.loadingExcelFile();
        const row = data.find(r => r['Test ID'] === testCaseId);

        if (!row) {
            throw new Error(`Test case '${testCaseId}' not found.`);
        }

        row[columnName] = value;
        workbook.Sheets[sheetName] = XLSX.utils.json_to_sheet(data);
        XLSX.writeFile(workbook, this.filePath);
    }


    // Updates the ACTUAL ANSWER for a specific test case in the Excel file based on the Prompt output in ChatGPT
    static updateActualAnswer(testCaseId, actualAnswer) {
        log(`Updating actual answer for '${testCaseId}' to '${actualAnswer}'.`);
        this.updateCell(testCaseId, 'Actual Answer', actualAnswer);
    }


    // Updates the RESULT (PASS/FAIL) for a specific test case in the Excel file based on the Prompt output in ChatGPT
    static updateResult(testCaseId, result) {
        log(`Updating test result for '${testCaseId}' to '${result}'.`);
        this.updateCell(testCaseId, 'Result', result);
    }


}

module.exports = ExcelUtil;