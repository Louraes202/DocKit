import React, { useState } from "react";
import axios from 'axios';
import download from 'downloadjs';
import "./App.css";

function App() {
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("http://localhost:5000/process", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ key: "value" }),
    })
      .then((response) => response.json())
      .then((data) => {
        setMessage(`Response from Flask: ${JSON.stringify(data)}`);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const downloadDocument = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/generate-document', {
        content: {
          title: 'Exemplo de Documento',
          sections: [
            {
              subtitle: 'Seção 1',
              paragraphs: [
                { text: 'Este é um parágrafo de exemplo.' }
              ],
              tables: [
                {
                  headers: ['Cabeçalho 1', 'Cabeçalho 2'],
                  rows: [
                    ['Dado 1', 'Dado 2'],
                    ['Dado 3', 'Dado 4']
                  ]
                }
              ],
              lists: [
                {
                  items: ['Item 1', 'Item 2', 'Item 3'],
                  type: 'bullet'
                }
              ],
              subsections: []
            }
          ]
        }
      }, {
        responseType: 'blob' // Importante para Axios lidar com blobs
      });
      const blob = new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });
      download(blob, 'documento.docx');
    } catch (error) {
      console.error('Erro ao baixar o documento:', error);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Dockit prototype test</h1>
        <form onSubmit={downloadDocument}>
          <button type="submit">Download Document</button>
        </form>
        <p>{message}</p>
      </header>
    </div>
  );
}

export default App;
