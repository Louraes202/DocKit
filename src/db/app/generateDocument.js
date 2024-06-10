const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');
const openai = require('openai');

openai.apiKey = process.env.OPENAI_API_KEY;

const generateContentFromPrompt = async (prompt, maxTokens) => {
    const response = await openai.Completion.create({
        model: "text-davinci-002",
        prompt: prompt,
        max_tokens: maxTokens
    });
    return response.choices[0].text.trim();
};

const generateDocument = (content, theme) => {
    return new Promise((resolve, reject) => {
        const contentJson = JSON.stringify({ content, theme });
        fs.writeFileSync('content.json', contentJson);

        exec('python /app/generate_document.py', (error, stdout, stderr) => {
            if (error) {
                reject(`exec error: ${error}`);
                return;
            }
            resolve('output.docx');
        });
    });
};

module.exports = {
    generateContentFromPrompt,
    generateDocument
};
