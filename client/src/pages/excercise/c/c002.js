import React from 'react';
import NavBar from '../../../components/NavBar';
import PythonTest from '../../../components/pythonTest';
import ReactMarkdown from 'react-markdown';
import '../A001.css';

function C002() {
  const setResult = (result) => {
    // console.log(result);
  };

  const questionText = `Today, we're going try to use code to solve real world problems, a police department asks you to create a program for them to detect wether a car is speeding!"STOP SIGN"
  
  Given a variable **<current_speed>** (which means you don't have to declare that variable) and the current rode's speed limit is **40mph** if the driver is speeding, print "You are speeding! Pull over"`;

  return (
    <div>
      <NavBar />

      <div className="container mt-4 letter">
        <div className="question-text">
          <ReactMarkdown className="markdown" children={questionText} />
        </div>

        <PythonTest initialCode={'#current_speed = 40 (do not uncomment this)\n'} setResult={setResult} id="A001" />
      </div>
    </div>
  );
}

export default C002;
