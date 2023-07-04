import React, { useState, useEffect } from 'react';
import '../App.css';
import NavBar from './NavBar';
import GoogleButton from 'react-google-button';
import Button from 'react-bootstrap/Button';
import { createUserWithEmailAndPassword, sendEmailVerification,updateProfile } from 'firebase/auth';
import { addDoc, collection, Timestamp, getDocs } from 'firebase/firestore'; 
import { auth,db } from '../config/firebase';

import {
  MDBContainer,
  MDBCol,
  MDBRow,
  MDBInput
}
from 'mdb-react-ui-kit';

const addUser = async (user) => {
  try {
    console.log('begin add user');
    const docRef = await addDoc(collection(db, "Users"), {
      email: user.email,
      fullName: user.fullName,
      joinDate: Timestamp.fromDate(new Date()), // current date
      userID: user.userID,
      vip: false,
    });
    console.log("User added with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding user: ", e);
  }
};

const addProgressForTasks = async (userID) => {
  try {
    // Step 1: Retrieve task IDs from the 'task' entity
    const taskSnapshot = await getDocs(collection(db, 'Tasks'));
    const taskIds = taskSnapshot.docs.map((doc) => {
      const data = doc.data(); // Access the data of each document
      const taskId = doc.id; // Access the document ID
      return { taskId, ...data };
    });

    console.log('Task IDs:', taskIds);

    console.log('printing',taskSnapshot)

    // Step 2: Create progress records based on the task IDs
    const progressPromises = taskIds.map(async (taskId) => {
      console.log('task idddd is',userID,'taskid',taskId)

      await addDoc(collection(db, 'Progress'), {
        userID,
        taskID: taskId,
        completed: false,
        completionDate: null,
      });
    });

    // Step 3: Wait for all progress records to be created
    await Promise.all(progressPromises);
    console.log(progressPromises)
    console.log("Progress records created for tasks.");
  } catch (e) {
    console.error("Error adding progress records: ", e);
  }
};

function Signup() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signUp = async () => {
    try {
      console.log('button clicked');
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
  
        console.log('redirect to login page');
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
            <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg" className="img-fluid" alt="Phone image" />
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
