import React, { useState } from 'react';
import '../App.css';
import NavBar from './NavBar';
import Button from 'react-bootstrap/Button';
import { createUserWithEmailAndPassword, sendEmailVerification,updateProfile } from 'firebase/auth';
import { auth } from '../config/firebase';
import { addUser, addProgressForTasks } from '../components/userUtils';

import {
  MDBContainer,
  MDBCol,
  MDBRow,
  MDBInput
}
from 'mdb-react-ui-kit';



function Signup() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signUp = async () => {
    try {
      // console.log('button clicked');
      const credential = await createUserWithEmailAndPassword(auth, email, password);
      if (credential && credential.user) {
        await sendEmailVerification(credential.user);
        alert('Please verify your email, then log in');
  
        const user = {
          email,
          fullName: `${firstName} ${lastName}`,
          userID: credential.user.uid,
          vip: false,
        };
  
        await addUser(user);
        await addProgressForTasks(user.userID);
  
        // Update the display name for the user
        await updateProfile(auth.currentUser, {
          displayName: user.fullName,
        });
  
        // console.log('redirect to login page');
      }
    } catch (err) {
      alert(err.message);
    }
  };
  
  
  

  return (
    <div>
      <NavBar />
      <MDBContainer fluid className="p-3 my-5">
        <MDBRow>
          <MDBCol col='10' md='6'>
          <img src={process.env.PUBLIC_URL + '/20944201.jpg'} className="img-fluid" alt="Phone" />
          </MDBCol>

          <MDBCol col='4' md='6'>
            <MDBRow>
              <MDBCol col='6'>
                <MDBInput wrapperClass='mb-4' placeholder='First name' id='form1' type='text' size="lg" onChange={(e) => setFirstName(e.target.value)} />
              </MDBCol>

              <MDBCol col='6'>
                <MDBInput wrapperClass='mb-4' placeholder='Last name' id='form1' type='text' size="lg" onChange={(e) => setLastName(e.target.value)} />
              </MDBCol>
            </MDBRow>
            <MDBInput wrapperClass='mb-4' placeholder='Email address' id='formControlLg' type='email' size="lg" onChange={(e) => setEmail(e.target.value)} />
            <MDBInput wrapperClass='mb-4' placeholder='Password' id='formControlLg' type='password' size="lg" onChange={(e) => setPassword(e.target.value)} />
            <Button className="mb-4 w-100" size="lg" variant="danger" onClick={signUp}>Sign up</Button>{' '}
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </div>
  );
}

export default Signup;
