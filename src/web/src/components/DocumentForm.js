import React, { useState } from 'react';

function DocumentForm() {
    const [prompt, setPrompt] = useState('');
    const [numSections, setNumSections] = useState(1);
    const [maxTokens, setMaxTokens] = useState(1000);
    const [theme, setTheme] = useState('corporate');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch('http://localhost:5000/generate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ prompt, numSections, maxTokens, theme }),
        });
        const data = await response.json();
        // Lógica para lidar com o documento gerado
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Prompt:</label>
                <textarea value={prompt} onChange={(e) => setPrompt(e.target.value)} />
            </div>
            <div>
                <label>Número de Secções:</label>
                <input type="number" value={numSections} onChange={(e) => setNumSections(e.target.value)} />
            </div>
            <div>
                <label>Max Tokens:</label>
                <input type="number" value={maxTokens} onChange={(e) => setMaxTokens(e.target.value)} />
            </div>
            <div>
                <label>Tema:</label>
                <select value={theme} onChange={(e) => setTheme(e.target.value)}>
                    <option value="corporate">Corporate</option>
                    <option value="academic">Academic</option>
                </select>
            </div>
            <button type="submit">Generate Document</button>
        </form>
    );
}

export default DocumentForm;
