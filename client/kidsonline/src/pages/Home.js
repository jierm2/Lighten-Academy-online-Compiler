import React, { useState, useEffect, useRef } from 'react';
import '../ResponsePage.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from './NavBar';
import AceEditor from 'react-ace';

import 'ace-builds/src-noconflict/mode-python';
import 'ace-builds/src-noconflict/theme-monokai';


function Home() {
  const [code, setCode] = useState('');
  const [output, setOutput] = useState('');
  const [codeExecuted, setCodeExecuted] = useState(false);

  const handleCodeChange = (newCode) => {
    setCode(newCode);

  };
  

  const handleRunCode = async () => {
    console.log('Running code:', code);

    try {
      const response = await fetch('http://127.0.0.1:5000/execute', {
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
          setCodeExecuted(true); // Set code execution flag to true even if an error occurs
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
        <div className="container mt-4">
          <h1>Python Playground</h1>
          {/* Code input text area */}
          <AceEditor
            mode="python"
            theme="monokai"
            fontSize={16}
            value={code}
            onChange={handleCodeChange}
            placeholder="Write your Python code here"
            style={{
              width: '100%',
              height: '670px',
              borderRadius: '10px',
              padding: '20px',
            }}
            showPrintMargin={false}
          />
  
          <br />
          {/* Run code button */}
          <button className="run-button" onClick={handleRunCode}>
          ▶️
          </button>
  
          {/* Output box */}
          <div className="terminal">
            <div className="terminal-body" style={{borderRadius: '10px',}}>
            <pre>
                {output} {codeExecuted ? null : 'Press Control-Enter to run the code above'}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  
}

export default Home;
