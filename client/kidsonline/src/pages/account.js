import '../App.css';
import NavBar from './NavBar';
import React, { useState } from 'react';
import GoogleButton from 'react-google-button'
import Button from 'react-bootstrap/Button';
import {auth,googleProvider} from '../config/firebase';
import {createUserWithEmailAndPassword,signInWithPopup,signInWithEmailAndPassword, signOut} from 'firebase/auth';
import {
  MDBContainer,
  MDBCol,
  MDBRow,
  MDBBtn,
  MDBInput,
  MDBCheckbox
}
from 'mdb-react-ui-kit';
import { async } from '@firebase/util';

function Account() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const signIn = async () => {
  try {
    const credential = await signInWithEmailAndPassword(auth, email, password);
    if (credential && credential.user) {
      if (!credential.user.emailVerified) {
        alert('Please verify your email first');
        signOut(auth); // sign out the user immediately
      } else {
        // Navigate to profile page
        // history.push("/profile");
      }
    }
  } catch (err) {
    alert(err.message);
  }
}

    console.log(auth?.currentUser?.photoURL);
    const signInwithGoogle = async () => {
        console.log('button clicked');
        try {
            await signInWithPopup (auth, googleProvider);
        } catch (err) {
            alert(err.message);
        }
    }

    const logOut = async () => {
        console.log('button clicked');
        try {
            await signOut(auth);
        } catch (err) {
            alert(err.message);
        }
    }
  return (
    <div>
    <NavBar />
      {/* <login/> */}

    <MDBContainer fluid className="p-3 my-5">

      <MDBRow>

        <MDBCol col='10' md='6'>
          <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg" className="img-fluid" alt="Phone image" />
        </MDBCol>

        <MDBCol col='4' md='6'>

          <MDBInput wrapperClass='mb-4' placeholder='Email address' id='formControlLg' type='email' size="lg" onChange={(e)=> setEmail(e.target.value)}/>
          <MDBInput wrapperClass='mb-4' placeholder='Password' id='formControlLg' type='password' size="lg" onChange={(e)=>setPassword(e.target.value)}/>

          <div className="d-flex justify-content-between mx-4 mb-4">
            <a href="signup">Don't have an account?</a>
            <a href="!#">Forgot password?</a>

          </div>
          
          <Button className="mb-4 w-100" size="lg" variant="primary" onClick={signIn}>Sign in</Button>{' '}

          <div className="divider d-flex align-items-center my-4">
            <p className="text-center fw-bold mx-3 mb-0">OR</p>
          </div>

          <GoogleButton
            onClick={signInwithGoogle}
            />
            <Button onClick={logOut}> LOG OUT</Button>

        </MDBCol>

      </MDBRow>

    </MDBContainer>
    </div>
  );
}

export default Account;
