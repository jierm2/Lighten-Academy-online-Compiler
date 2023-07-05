import React, { useState } from 'react';
import NavBar from '../../NavBar';
import PythonTest from '../../pythonTest';

function A001() {
  const [setResult] = useState('');

  return (
    <div>
      <NavBar />

      <div className="container mt-4 letter">
        <p>
          Today, we're going to write a special message using code. Your task is to modify the code so that it prints the message "<mark>Howdy, world!</mark>" on the screen.
        </p>
        <p>
          You need to find the correct place in the code and change it to make it work. Don't worry, we'll help you along the way!
        </p>

        <PythonTest initialCode={'print("Want to learn some programming?")'} setResult={setResult} id="A001" />
      </div>
    </div>
  );
}

export default A001;
