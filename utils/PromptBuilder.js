const { log } = require('./logger');

class PromptBuilder {

//Builds the prompt which is used to ask ChatGPT the original question
static buildQuestionPrompt(question) {
        return `You are answering factual questions.

                Provide only the final answer.

                Question:
                ${question}

                Do not explain.
                Do not use bullet points.
                Do not add any extra text.`;
    }


//Builds the prompt used which is used to validate the actual answer against the expected answer
static buildValidationPrompt(question, expectedAnswer, actualAnswer) {

        log(`Setting validating question: ${question}, Expected Answer: ${expectedAnswer}, Actual Answer: ${actualAnswer}`);
        
        return `You are evaluating whether two answers are semantically equivalent.

                Question:
                ${question}

                Expected Answer:
                ${expectedAnswer}

                Actual Answer:
                ${actualAnswer}

                Rules:
                - Ignore differences in capitalization.
                - Ignore punctuation.
                - Ignore additional explanatory text if the core answer is correct.
                - Consider synonyms and equivalent wording as correct.
                - If the actual answer correctly answers the question and is semantically equivalent to the expected answer, respond with PASS.
                - Otherwise, respond with FAIL.

                Respond with exactly one word:
                PASS
                or
                FAIL`;
    }

}

module.exports = PromptBuilder;