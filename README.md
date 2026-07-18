# ChatGPT Data-Driven UI Automation Assignment


# Project Overview

This project automates the ChatGPT web application using **Playwright** and **JavaScript** following the **Page Object Model (POM)** design pattern.

The framework executes data-driven test cases stored in an Excel file, extracts ChatGPT responses, validates the generated answers using semantic comparison through ChatGPT itself, updates the Excel sheet with the results, and generates an HTML execution report.

---

# Technologies:

* Playwright
* JavaScript
* XLSX
* Dotenv
* Playwright HTML Reporter

---

# Framework Architecture
.
├── pages/
│   ├── BasePage.js
│   └── ChatgptPage.js
│
├── tests/
│   └── ChatGPT-Validation.spec.js
│
├── utils/
│   ├── ExcelUtil.js
│   ├── PromptBuilder.js
│   └── Logger.js
│
├── reporters/
│   └── EnvironmentReporter.js
│
├── test-data/
│   └── TestData.xlsx
│
├── reports/
│   └── execution.log
│
├── playwright-report/
│
├── .env
├── playwright.config.js
├── package.json
└── README.md

---------------------------------------------------------------------

###   Components   ### 

## BasePage
Provides common browser navigation functionality shared across page objects.

## ChatPage
Contains all ChatGPT UI interactions, including:
* Sending prompts
* Waiting for generated responses
* Extracting responses
* Starting new conversations

## Excel Utility
Responsible for:
* Reading test cases
* Updating the Actual Answer column
* Updating the Result column

## Prompt Builder
Generates:
* Question prompt
* Validation prompt

## Logger
Generates execution logs throughout the framework to simplify the debugging and execution tracking

## Environment Reporter
Logs execution environment information

---------------------------------------------------------------------

# Test Flow

For each test case:

1. Read test data from **TestData.xlsx**
2. Prepare the question prompt
3. Open ChatGPT.
4. Submit the prompt.
5. Wait for ChatGPT to generate the response.
6. Extract the response.
7. Update the **Actual Answer** column in Excel sheet.
8. Start a new chat in ChatGPT.
9. Prepare the validation prompt.
10. Submit the validation prompt.
11. Extract the validation result (**PASS** / **FAIL**).
12. Update the **Result** column in Excel.

---------------------------------------------------------------------

# Prerequisites

Make sure you have the following before running the project:
* Node.js
* Google Chrome
* Playwright

Install project dependencies:
```bash
npm install
```

Install Playwright browsers:
```bash
npx playwright install
```

---------------------------------------------------------------------

# Environment Configuration

Environment variables are managed using a **.env** file.

Example:
BASE_URL=https://chatgpt.com

The framework reads these variables during execution using **dotenv**.

---------------------------------------------------------------------

# Project Setup

Clone or download the project.
Install dependencies.
Ensure the `.env` file contains the correct configuration.
Verify that `TestData.xlsx` exists under the `test-data` directory.

---------------------------------------------------------------------

# Execution Steps

Execute all test cases:

```bash
npx playwright test
```

After execution, the framework automatically:

* Updates **TestData.xlsx**
* Generates the Playwright HTML report
* Generates the execution log
* Captures screenshots for *failed* tests
* Retains traces and videos for *failed* executions

---------------------------------------------------------------------

# Reporting

The framework generates the following execution artifacts.

### Playwright HTML Report
Contains:
* Total Test Cases
* Passed Test Cases
* Failed Test Cases
* Execution Time
* Screenshots for *failed* tests
* Videos for *failed* tests
* Trace files for *failed* tests

### Execution Log
The framework generates an execution log located at:

```text
reports/execution.log
```

The log records significant execution steps including:
* Reading test data
* Sending prompts
* Extracting responses
* Updating Excel
* Validation results

### Environment Information
The execution environment is logged before the test suite starts, including:
* Operating System
* Node.js Version
* Playwright Version
* Base URL
* Execution Mode

---------------------------------------------------------------------

# Assumptions
* Test cases execute sequentially (`workers = 1`) to prevent concurrent updates to the Excel file.
* The framework is designed to execute using **ChatGPT Guest Mode**.
* The validation prompt is designed to return **only** `PASS` or `FAIL`, enabling deterministic automation.
* The Playwright HTML report is used as the primary reporting solution.

---------------------------------------------------------------------

# Limitations
ChatGPT authentication currently requires email-based OTP verification and may trigger additional anti-bot verification when accessed through an automated browser.

Since authentication is outside the scope of the assignment, the framework executes using ChatGPT Guest Mode while fully demonstrating the required automation capabilities.

---------------------------------------------------------------------

# Deliverables

The project generates the following deliverables:
* Complete source code
* Updated `TestData.xlsx`
* Playwright HTML Report
* Execution Log
* README

---------------------------------------------------------------------
