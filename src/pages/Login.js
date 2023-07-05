import '../App.css';
import NavBar from './NavBar';
import React, { useState } from 'react';
import GoogleButton from 'react-google-button'
import Button from 'react-bootstrap/Button';
import {auth,googleProvider} from '../config/firebase';
import {signInWithPopup,signInWithEmailAndPassword, signOut} from 'firebase/auth';
import {
  MDBContainer,
  MDBCol,
  MDBRow,
  MDBInput,
}
from 'mdb-react-ui-kit';

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    // console.log(auth.currentUser.email);
    const signIn = async (email, password) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Check if the email is verified
        if (!user.emailVerified) {
        // Sign out the user
        await signOut(auth);

        alert('Please verify your email before signing in.');
        return;
        }
        // User signed in successfully
        // Continue with your app's flow
        window.location.href = "/account";
    } catch (err) {
        console.error(err);
        alert(err.message);
    }
    };


    const signInwithGoogle = async () => {
        // console.log('button clicked');
        try {
            await signInWithPopup(auth, googleProvider);
            window.location.href = "/account";
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
      <img src={process.env.PUBLIC_URL + '/20944201.jpg'} className="img-fluid" alt="Phone" />
    </MDBCol>


        <MDBCol col='4' md='6'>

          <MDBInput wrapperClass='mb-4' placeholder='Email address' id='formControlLg' type='email' size="lg" onChange={(e)=> setEmail(e.target.value)}/>
          <MDBInput wrapperClass='mb-4' placeholder='Password' id='formControlLg' type='password' size="lg" onChange={(e)=>setPassword(e.target.value)}/>

          <div className="d-flex justify-content-between mx-4 mb-4">
            <a href="signup">Don't have an account?</a>
            <a href="!#">Forgot password?</a>

          </div>
          
          <Button className="mb-4 w-100" size="lg" variant="primary" onClick={() => signIn(email, password)}>Sign in</Button>{' '}

          <div className="divider d-flex align-items-center my-4">
            <p className="text-center fw-bold mx-3 mb-0">OR</p>
          </div>

          <GoogleButton
            onClick={signInwithGoogle}
            />

        </MDBCol>

      </MDBRow>

    </MDBContainer>
    </div>
  );
}

export default Login;
