import React from 'react';
import NavBar from '../../../components/NavBar';
import PythonTest from '../../../components/pythonTest';
import '../A001.css';

function B002() {
  const setResult = (result) => {
    // console.log(result);
  };

  return (
    <div>
      <NavBar />

      <div className="container mt-4 letter">
        <div className="question-text">
          <div className="list">
            <ul className="bullet-list">
              <li>Create a variable called <mark>username</mark> and set it to your preferred username.</li>
              <li>Create a variable called <mark>numOfFriends</mark> and set it to the number of friends you have on a social media platform.</li>
              <li>Create a variable called <mark>favoriteColor</mark> and set it to the color that brings you joy.</li>
              <li>Create a variable called <mark>isCodingFun</mark> and set it to a boolean value that represents whether you enjoy coding.</li>
            </ul>
          </div>

          <p>
            Take a moment to think about the values you want to assign to these variables. You don't need to print them. Enjoy exploring the world of variables!
          </p>

          <PythonTest setResult={setResult} id='B002' colorC={'?'} />
        </div>
      </div>
    </div>
  );
}

export default B002;
