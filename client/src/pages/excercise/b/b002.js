import React, { useState } from 'react';
import NavBar from '../../NavBar';
import PythonTest from '../../pythonTest';

function B002() {
  const [result, setResult] = useState('');

  return (
    <div>
      
      <NavBar />

  <div className="container mt-4 letter">
    <div className='list'>
      <ul style={{ listStyleType: 'disc', marginLeft: '1.5rem', paddingLeft: '1rem' }}>
        <li style={{ marginTop: '0.5rem'}}>Create a variable called <span style={{ backgroundColor: 'gray' }}>username</span> and set it to your preferred username.</li>
        <li style={{ marginTop: '0.5rem' }}>Create a variable called <span style={{ backgroundColor: 'gray' }}>numOfFriends</span> and set it to the number of friends you have on a social media platform.</li>
        <li style={{ marginTop: '0.5rem' }}>Create a variable called <span style={{ backgroundColor: 'gray' }}>favoriteColor</span> and set it to the color that brings you joy.</li>
        <li style={{ marginTop: '0.5rem' }}>Create a variable called  <span style={{ backgroundColor: 'gray' }}>isCodingFun</span> and set it to a boolean value that represents whether you enjoy coding.</li>
      </ul>
    </div>

    
    <p>
      Take a moment to think about the values you want to assign to these variables. You don't need to print them. Enjoy exploring the world of variables!
    </p>

    <PythonTest initialCode={'#Start coding here\n'} setResult={setResult} id='B002' colorC={'?'}/>
  </div>
</div>


  );
  
}

export default B002;