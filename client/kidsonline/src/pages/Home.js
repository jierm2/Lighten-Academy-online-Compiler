import React from 'react';
import '../ResponsePage.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from './NavBar';
import PythonCompiler from './pythonCompiler';

function Home() {
  return (
    <div>
      {/* Navigation bar */}
      <NavBar />

      <div className="container">
        {/* Content */}
        <div className="container mt-4">
          <h1>Python Playground</h1>
          {/* Code input text area */}
          <PythonCompiler />
        </div>
      </div>
    </div>
  );
}

export default Home;
