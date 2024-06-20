import React, { useState } from 'react';

function App() {
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch('http://localhost:5000/process', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ key: 'value' })
    })
    .then(response => response.json())
    .then(data => {
      setMessage(`Response from Flask: ${JSON.stringify(data)}`);
    })
    .catch(error => {
      console.error('Error:', error);
    });
  };

  return (
    <div className="App">
      <header className="App-header">
        <form onSubmit={handleSubmit}>
          <button type="submit">Send POST Request</button>
        </form>
        <p>{message}</p>
      </header>
    </div>
  );
}

export default App;
