import React, { useEffect, useState } from 'react';
import NavBar from './NavBar';
import Button from 'react-bootstrap/Button';
import { auth, db } from '../config/firebase';
import { getDocs, collection, query, where, getDoc, updateDoc } from 'firebase/firestore';
import Confetti from 'react-confetti';
import {onSnapshot } from 'firebase/firestore';

import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBBtn,
  MDBProgress,
  MDBProgressBar,
} from 'mdb-react-ui-kit';

function Account() {
  const [userEmail, setUserEmail] = useState('');
  const [userName, setUserName] = useState('');
  const [progressData, setProgressData] = useState({});

  const fetchProgressData = () => {
    try {
      const userId = auth.currentUser?.uid;
      if (userId) {
        const q = query(collection(db, 'Progress'), where('userID', '==', userId));
        const unsubscribe = onSnapshot(q, (snapshot) => {
          const completionStatus = {};
          snapshot.docs.forEach((doc) => {
            const data = doc.data();
            const taskId = data.taskID.taskID;
            const isCompleted = data.completed;
            completionStatus[taskId] = isCompleted;
          });
          setProgressData(completionStatus);
        });
        return unsubscribe;
      }
    } catch (error) {
      console.error('Error fetching progress data:', error);
    }
  };
  
  console.log('progress',progressData)

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUserEmail(user.email);
        setUserName(user.displayName);
        const unsubscribeProgress = fetchProgressData();
        return () => {
          unsubscribeProgress();
        };
      }
    });
  
    return () => unsubscribe();
  }, []);
  

  const logOut = async () => {
    console.log('button clicked');
    try {
      await auth.signOut();
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <section style={{ backgroundColor: '#eee' }}>
      <NavBar />

      <MDBContainer className="py-5">
        <MDBRow>
          <MDBCol lg="4">
            <MDBCard className="mb-4">
              <MDBCardBody className="text-center">
                <MDBCardImage
                  src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
                  alt="avatar"
                  className="rounded-circle"
                  style={{ width: '150px' }}
                  fluid
                />
                <p></p>
                <div className="d-flex justify-content-center mb-2">
                  <Button onClick={logOut}>Change profile picture</Button>
                  <Button onClick={logOut} href="/login" className="ms-1">
                    LOG OUT
                  </Button>
                </div>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
          <MDBCol lg="8">
            <MDBCard className="mb-4">
              <MDBCardBody>
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Full Name</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">{userName}</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Email</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">{userEmail}</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
              </MDBCardBody>
            </MDBCard>

            <MDBRow>
              <MDBCol md="6">
                <MDBCard className="mb-4 mb-md-0">
                  <MDBCardBody>
                    <MDBCardText className="mb-4">
                      <span className="text-primary font-italic me-1">assignment</span> Howdy, Wolrd!
                    </MDBCardText>
                    <MDBCardText className="mb-1" style={{ fontSize: '.77rem' }}>
                      Howdy, world!
                    </MDBCardText>
                    <MDBProgress className="rounded">
                      <MDBProgressBar width={progressData['a001'] ? 100 : 0} valuemin={0} valuemax={100} />
                    </MDBProgress>

                    <MDBCardText className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>
                      One sample math question?
                    </MDBCardText>
                    <MDBProgress className="rounded">
                      <MDBProgressBar width={progressData['a002'] ? 100 : 0} valuemin={0} valuemax={100} />
                    </MDBProgress>

                    <MDBCardText className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>
                      The Most Beautiful Equation in Math
                    </MDBCardText>
                    <MDBProgress className="rounded">
                      <MDBProgressBar width={progressData['a003'] ? 100 : 0} valuemin={0} valuemax={100} />
                    </MDBProgress>
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>

              <MDBCol md="6">
                <MDBCard className="mb-4 mb-md-0">
                  <MDBCardBody>
                    <MDBCardText className="mb-4">
                      <span className="text-primary font-italic me-1">assignment</span> Variables and Types
                    </MDBCardText>

                    <MDBCardText className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>
                      Variables in Python practice 1
                    </MDBCardText>
                    <MDBProgress className="rounded">
                      <MDBProgressBar width={progressData['b001'] ? 100 : 0} valuemin={0} valuemax={100} />
                    </MDBProgress>

                    <MDBCardText className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>
                      Variables in Python practice 2
                    </MDBCardText>
                    <MDBProgress className="rounded">
                      <MDBProgressBar width={progressData['b002'] ? 100 : 0} valuemin={0} valuemax={100} />
                    </MDBProgress>
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>
            </MDBRow>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </section>
  );
}

export default Account;
