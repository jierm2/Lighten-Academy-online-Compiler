import React from 'react';
import NavBar from '../../../components/NavBar';
import PythonTest from '../../../components/pythonTest';
import ReactMarkdown from 'react-markdown';
import '../A001.css';

function C001() {
  const setResult = (result) => {
    // console.log(result);
  };

  const questionText = `is CS fun?`;

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

export default C001;
