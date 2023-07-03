import React, { useState, useEffect } from 'react';
import AceEditor from 'react-ace';
import { Button, Spinner } from 'react-bootstrap';

import 'ace-builds/src-noconflict/mode-python';
import 'ace-builds/src-noconflict/theme-monokai';

function PythonTest() {
  const [code, setCode] = useState('');
  const [output, setOutput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleCodeChange = (newCode) => {
    setCode(newCode);
  };

  const handleRunCode = async () => {
    setIsLoading(true); // Start the loading animation

    try {
      const response = await fetch('http://127.0.0.1:5000/execute', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code, exercise_id: 'A001' }),
      });

      if (response.ok) {
        const result = await response.json();

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
    } finally {
      setIsLoading(false); // Stop the loading animation
    }
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      // Check if Ctrl key and Enter/Return key are pressed
      if (
        (event.ctrlKey || event.metaKey) &&
        (event.key === 'Enter' || event.key === 'Return')
      ) {
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
    <div className="container mt-4">
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

      <br />
      <div>
        <Button
          onClick={handleRunCode}
          variant="success"
          disabled={!code || isLoading} // Disable button if code is empty or when loading
        >
          {isLoading ? (
            <>
              <Spinner as="span" animation="grow" size="sm" role="status" aria-hidden="true" /> Loading...
            </>
          ) : (
            'Run Code'
          )}
        </Button>
      </div>

      <div className="terminal">
        <div className="terminal-body" style={{ borderRadius: '10px' }}>
          <pre>
            {output} {output ? null : 'Press Control-Enter to run the code above'}
          </pre>
        </div>
      </div>
    </div>
  );
}

export default PythonTest;
