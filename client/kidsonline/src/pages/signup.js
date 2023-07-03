import React, { useState } from 'react';
import '../App.css';
import NavBar from './NavBar';
import GoogleButton from 'react-google-button'
import Button from 'react-bootstrap/Button';
import {createUserWithEmailAndPassword,signInWithPopup,signInWithEmailAndPassword, sendEmailVerification, signOut} from 'firebase/auth';
import {auth,googleProvider} from '../config/firebase';

import {
  MDBContainer,
  MDBCol,
  MDBRow,
  MDBInput,
  MDBCheckbox
}
from 'mdb-react-ui-kit';

function Signup() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // let history = useHistory();

  const signUp = async () => {
    try {
      const credential = await createUserWithEmailAndPassword(auth, email, password);
      if (credential && credential.user) {
        await sendEmailVerification(credential.user);
        alert('Please verify your email, then log in');
      }
    } catch (err) {
      alert(err.message);
    }
  }

  return (
    <div>
      <NavBar />
      <MDBContainer fluid className="p-3 my-5">
        <MDBRow>
          <MDBCol col='10' md='6'>
            <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg" className="img-fluid" alt="Phone image" />
          </MDBCol>

          <MDBCol col='4' md='6'>
            <MDBRow>
              <MDBCol col='6'>
                <MDBInput wrapperClass='mb-4' placeholder='First name' id='form1' type='text' size = "lg" onChange={(e) => setFirstName(e.target.value)}/>
              </MDBCol>

              <MDBCol col='6'>
                <MDBInput wrapperClass='mb-4' placeholder='Last name' id='form1' type='text' size = "lg" onChange={(e) => setLastName(e.target.value)}/>
              </MDBCol>
            </MDBRow>
            <MDBInput wrapperClass='mb-4' placeholder='Email address' id='formControlLg' type='email' size="lg" onChange={(e) => setEmail(e.target.value)}/>
            <MDBInput wrapperClass='mb-4' placeholder='Password' id='formControlLg' type='password' size="lg" onChange={(e) => setPassword(e.target.value)}/>

            <Button className="mb-4 w-100" size="lg" variant="danger" onClick={signUp}>Sign up</Button>{' '}
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </div>
  );
}

export default Signup;
