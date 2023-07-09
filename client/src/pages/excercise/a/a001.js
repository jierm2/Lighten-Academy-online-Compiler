import React from 'react';
import NavBar from '../../../components/NavBar';
import PythonTest from '../../../components/pythonTest';
import ReactMarkdown from 'react-markdown';
import '../A001.css';

function A001() {
  const setResult = (result) => {
    // console.log(result);
  };

  const questionText = `Today, we're going to write a special message using code. Your task is to modify the code so that it prints the message **Howdy, world!** on the screen.

You need to find the correct place in the code and change it to make it work. Don't worry, we'll help you along the way!`;

  return (
    <div>
      <NavBar />

      <div className="container mt-4 letter">
        <div className="question-text">
          <ReactMarkdown className="markdown" children={questionText} />
        </div>

        <PythonTest initialCode={'print("Want to learn some programming?")'} setResult={setResult} id="A001" />
      </div>
    </div>
  );
}

export default A001;
