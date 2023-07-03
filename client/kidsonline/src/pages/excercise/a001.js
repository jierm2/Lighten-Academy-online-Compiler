import React, { useState } from 'react';
import NavBar from '../NavBar';
import PythonCompiler from '../pythonCompiler';

function A001() {
  const [result, setResult] = useState('');

  const handleRunCode = async (code) => {
    // Execute the code
    const response = await fetch('http://127.0.0.1:5000/execute', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ code, exercise_id: 'A001' }),
    });
  
    if (response.ok) {
      const result = await response.json();
      console.log('Execution result:', result);
  
      let codeCorrect = true;
      result.test_results.forEach((testResult) => {
        if (!testResult.test_passed) {
          codeCorrect = false;
        }
      });
  
      // Check if the code is correct
      if (codeCorrect) {
        setResult('Congratulations! Your code is correct. 🎉🥳');
        // Trigger a cool animation here
        // E.g., add CSS classes or use a library like react-particles-js
      } else {
        setResult('Oops! Your code is incorrect. Please review your code and try again.');
      }
    } else {
      console.error('Code execution failed');
      setResult('Code execution failed');
    }
  };

  return (
    <div>
      <NavBar />

      <div className="container mt-4 letter">
        <h1>Hi there, young coder!</h1>
        <p>
          Today, we're going to write a special message using code. Your task is to modify the code so that it prints the message "Howdy, World!" on the screen.
        </p>
        <p>
          You need to find the correct place in the code and change it to make it work. Don't worry, we'll help you along the way!
        </p>

        <PythonCompiler
          onRunCode={handleRunCode}
          initialCode={'print("Hello, World!")'}
        />

        {result && <p className="result">{result}</p>}
      </div>
    </div>
  );
}

export default A001;
