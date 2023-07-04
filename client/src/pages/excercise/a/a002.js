import React, { useState } from 'react';
import NavBar from '../../NavBar';
import PythonTest from '../../pythonTest';

function A002() {
  const [result, setResult] = useState('');

  return (
    <div>
      <NavBar />

      <div className="container mt-4 letter">
        <p>
          Having problem to solve <span style={{ backgroundColor: 'gray'  }}>3 + 4</span>, help me please.
        </p>
        <p>
          Don't worry, we'll help you along the way!
        </p>

        <PythonTest initialCode={'print("3 + 4")'} setResult={setResult} id = 'A002' />
      </div>
    </div>
  );
}

export default A002;
