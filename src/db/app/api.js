const express = require('express');
const bodyParser = require('body-parser');
const { generateContentFromPrompt, generateDocument } = require('./generateDocument');

const app = express();
app.use(bodyParser.json());

app.post('/generate', async (req, res) => {
    const { prompt, numSections, maxTokens, theme } = req.body;

    try {
        const generatedText = await generateContentFromPrompt(prompt, maxTokens);

        const sections = [];
        const paragraphs = generatedText.split('\n\n');
        const paragraphsPerSection = Math.floor(paragraphs.length / numSections);

        for (let i = 0; i < numSections; i++) {
            const start = i * paragraphsPerSection;
            const end = (i + 1) * paragraphsPerSection;
            sections.push({
                subtitle: `Section ${i + 1}`,
                paragraphs: paragraphs.slice(start, end)
            });
        }

        if (paragraphs.length % numSections !== 0) {
            sections[sections.length - 1].paragraphs.push(...paragraphs.slice(numSections * paragraphsPerSection));
        }

        const content = {
            title: 'Documento Gerado pelo GPT-4',
            sections: sections
        };

        const documentPath = await generateDocument(content, theme);
        res.json({ documentPath });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
