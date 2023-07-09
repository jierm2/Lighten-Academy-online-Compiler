import React from 'react';
import NavBar from '../../../components/NavBar';
import PythonTest from '../../../components/pythonTest';
import '../A001.css';

function B001() {
  const setResult = (result) => {
    // console.log(result);
  };

  return (
    <div>
      <NavBar />

      <div className="container mt-4 letter">
        <div className="question-text">
          <div className="list">
            <ul style={{ listStyleType: 'disc', marginLeft: '1.5rem', paddingLeft: '1rem' }}>
              <li style={{ marginTop: '0.5rem' }}>Create a variable called <mark>age</mark> and set it to the number 13.</li>
              <li style={{ marginTop: '0.5rem' }}>Create a variable called <mark>pi</mark> and set it to the decimal number 3.14.</li>
              <li style={{ marginTop: '0.5rem' }}>Create a variable called <mark>letter</mark> and set it to the letter 'X'.</li>
              <li style={{ marginTop: '0.5rem' }}>Create a variable called <mark>isCSAwesome</mark> and set it to the value "True" (meaning "yes" or "cool").</li>
            </ul>
          </div>

          <p>
            You don't need to print them. Don't worry, we'll help you along the way!
          </p>
        </div>

        <PythonTest initialCode={'#Start coding here\n'} setResult={setResult} id="B001" />
      </div>
    </div>
  );
}

export default B001;
