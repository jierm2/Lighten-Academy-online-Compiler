import React, { useState, useEffect } from 'react';
import '../ResponsePage.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from './NavBar';


function Home() {
  const [code, setCode] = useState('');
  const [output, setOutput] = useState('');

  const handleCodeChange = (event) => {
    setCode(event.target.value);
  };

  const handleRunCode = async () => {
    console.log('Running code:', code);

    try {
      const response = await fetch('http://127.0.0.1:34000/execute', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code }),
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Execution result:', result);

        if (result.error) {
          setOutput('Error:\n' + result.error);
        } else {
          setOutput(result.output);
        }
      } else {
        console.error('Code execution failed');
        setOutput('Code execution failed');
      }
    } catch (error) {
      console.error('An error occurred while executing the code:', error);
      setOutput('An error occurred while executing the code');
    }
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      // Check if Ctrl key and Enter/Return key are pressed
      if ((event.ctrlKey || event.metaKey) && (event.key === 'Enter' || event.key === 'Return')) {
        event.preventDefault(); // Prevent default behavior
        handleRunCode(); // Call handleRunCode immediately with the current code value
      }
    };

    // Add event listener for keydown event
    document.addEventListener('keydown', handleKeyDown);

    // Clean up the event listener on component unmount
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [code]); // Include code as a dependency in the useEffect hook

  return (
<div>
    {/* Navigation bar */}
    <NavBar />

    <div className="container">

      {/* Content */}
      <div className="content">
        <h1>Python Playground</h1>
        {/* Code input text area */}
        <textarea
          rows={10}
          className="code-input"
          value={code}
          onChange={handleCodeChange}
          placeholder="Write your Python code here"
        />
        <br />
        {/* Run code button */}
        <button className="run-button" onClick={handleRunCode}>
          Run Code
        </button>
        {/* Output box */}
        <div className="output-box">
          <h2>Output:</h2>
          <pre>{output}</pre>
        </div>
      </div>
    </div>
    </div>
  );
}

export default Home;
