import React, { useState } from 'react';
import NavBar from '../../NavBar';
import PythonTest from '../../pythonTest';

function A003() {
  const [setResult] = useState('');

  return (
    <div>
      <NavBar />

      <div className="container mt-4 letter">
        <p>
          We all know what <mark>e^(πi) + 1</mark> equals to (I hope so 🤔), if not, try to solve it using Python!
        </p>
        <p>
          Don't worry, we'll help you along the way 😀
        </p>

        <PythonTest initialCode={"import cmath\n#don't know how to do e^ (Euler's number) in python? Google it!\n#hint1: <https://www.w3schools.com/python/module_cmath.asp>\n#hint2: i (√-1) in python would be <1j>\n"} setResult={setResult} id="A003" />
      </div>
    </div>
  );
}

export default A003;
