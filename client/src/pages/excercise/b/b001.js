import React, { useState } from 'react';
import NavBar from '../../NavBar';
import PythonTest from '../../pythonTest';

function B001() {
  const [result, setResult] = useState('');

  return (
    <div>
      
      <NavBar />
  
      <div className="container mt-4 letter">
        <div className='list'>
          <ul style={{ listStyleType: 'disc', marginLeft: '1.5rem', paddingLeft: '1rem' }}>
            <li style={{ marginTop: '0.5rem'}}>Create a variable called <span style={{ backgroundColor: 'gray' }}>age   </span> and set it to the number 13.</li>
            <li style={{ marginTop: '0.5rem' }}>Create a variable called <span style={{ backgroundColor: 'gray' }}> pi </span> and set it to the decimal number 3.14.</li>
            <li style={{ marginTop: '0.5rem' }}>Create a variable called <span style={{ backgroundColor: 'gray' }}> letter </span> and set it to the letter 'X'.</li>
            <li style={{ marginTop: '0.5rem' }}>Create a variable called  <span style={{ backgroundColor: 'gray' }}> isCSAwesome </span> and set it to the value "True" (meaning "yes" or "cool").</li>
          </ul>
        </div>

        
        <p>
          
          You don't need to print them. Don't worry, we'll help you along the way!
        </p>
  
        <PythonTest initialCode={'#Start coding here\n'} setResult={setResult} id='B001' />
      </div>
    </div>
  );
  
}

export default B001;
