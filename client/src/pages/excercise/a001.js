import React, { useState } from 'react';
import NavBar from '../NavBar';
import PythonTest from '../pythonTest';

function A001() {
  const [result, setResult] = useState('');

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

        <PythonTest initialCode={'print("Hello, World!")'} setResult={setResult} />

        {result && <p className="result">{result}</p>}
      </div>
    </div>
  );
}

export default A001;