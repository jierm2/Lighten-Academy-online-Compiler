import '../App.css';
import NavBar from '../components/NavBar';
import React, { useState } from 'react';
import GoogleButton from 'react-google-button';
import Button from 'react-bootstrap/Button';
import { auth, googleProvider, db } from '../config/firebase';
import { signInWithPopup, signInWithEmailAndPassword, signOut, updateProfile } from 'firebase/auth';
import { getDocs, collection } from 'firebase/firestore';
import {
  MDBContainer,
  MDBCol,
  MDBRow,
  MDBInput,
} from 'mdb-react-ui-kit';
import { addUser, addProgressForTasks } from '../components/userUtils';

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
      try {
          const result = await signInWithPopup(auth, googleProvider);
          const user = result.user;
  
          if (user) {
              // Check if the user already exists in the Users collection
              const userSnapshot = await getDocs(collection(db, 'Users'));
              const users = userSnapshot.docs.map(doc => doc.data());
  
              // Check if the user exists in your users collection
              const userExists = users.some(u => u.userID === user.uid);
  
              if (!userExists) {
                  // User does not exist, so create user
                  const newUser = {
                      email: user.email,
                      fullName: user.displayName,
                      userID: user.uid,
                      vip: false,
                  };
  
                  // Add the user to the Users collection
                  await addUser(newUser);
  
                  // Add progress for tasks for the user
                  await addProgressForTasks(user.uid);
  
                  // Update the display name for the user
                  await updateProfile(auth.currentUser, {
                      displayName: user.displayName,
                  });
              }
          }
  
          // Continue with your app's flow
          window.location.href = "/account";
      } catch (err) {
          alert(err.message);
      }
  };
  


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
            <a href="!#" className='strike-through'>Forgot password?</a>

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
