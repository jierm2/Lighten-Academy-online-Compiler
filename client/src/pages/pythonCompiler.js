import React, { useState, useEffect,useCallback } from 'react';
import AceEditor from 'react-ace';
import { Button, Spinner } from 'react-bootstrap';

import 'ace-builds/src-noconflict/mode-python';
import 'ace-builds/src-noconflict/theme-monokai';

function PythonCompiler() {
  const [code, setCode] = useState('');
  const [output, setOutput] = useState('');
  const [codeExecuted, setCodeExecuted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleCodeChange = (newCode) => {
    setCode(newCode);
  };
  
  const handleRunCode = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetch('https://pymeow.org/api/execute', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code }),
      });
  
      if (response.ok) {
        const result = await response.json();
  
        if (result.error) {
          setOutput('Error:\n' + result.error);
        } else {
          setCodeExecuted(true);
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
  }, [code]);
  
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
  }, [code,handleRunCode]); // Include code as a dependency in the useEffect hook

  return (
    <div className="container mt-4">
      <div className="input-container">
        <AceEditor
          mode="python"
          theme="monokai"
          fontSize={16}
          value={code}
          onChange={handleCodeChange}
          placeholder="Write your Python code here"
          style={{
            width: '100%',
            height: '470px',
            borderRadius: '10px',
            padding: '20px',
          }}
          showPrintMargin={false}
        />

        <Button
          onClick={handleRunCode}
          variant="success"
          disabled={!code || isLoading}
          className="run-button"
        >
          {isLoading ? (
            <>
              <Spinner as="span" animation="grow" size="sm" role="status" aria-hidden="true" /> 
            </>
          ) : (
            'Run'
          )}
        </Button>
      </div>

      <br />

      <div className="terminal">
        <div className="terminal-body" style={{ borderRadius: '10px' }}>
          <pre>
            {codeExecuted}
            {output} {output ? null : 'Press Control-Enter to run the code above'}
          </pre>
        </div>
      </div>
    </div>
  );
  
}

export default PythonCompiler;
