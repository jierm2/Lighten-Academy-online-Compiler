import React from 'react';
import NavBar from '../../../components/NavBar';
import PythonTest from '../../../components/pythonTest';
import '../A001.css';

function A002() {
  const setResult = (result) => {
    // console.log(result);
  };

  return (
    <div>
      <NavBar />

      <div className="container mt-4 letter">
        <div className="question-text">
          <p>
            Having a problem to solve <mark>3 + 4</mark>, help me please.
          </p>
          <p>
            Don't worry, we'll help you along the way!
          </p>
        </div>

        <PythonTest initialCode={'print("3 + 4")'} setResult={setResult} id="A002" />
      </div>
    </div>
  );
}

export default A002;
