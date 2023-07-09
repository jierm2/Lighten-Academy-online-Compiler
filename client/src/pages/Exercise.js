import React from 'react';
import '../ResponsePage.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from '../components/NavBar';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';


// exercises.js

import { addDoc, collection } from "@firebase/firestore";
import { db } from '../config/firebase'; // make sure you export your firestore instance from this file



const exercisesA = [
  { id: 'a001', title: 'Howdy, world!', description: 'Your first coding ever!', type: 'A', imageUrl: 'https://w0.peakpx.com/wallpaper/31/78/HD-wallpaper-3d-robot-creative-cartoon-robot-orange-background-hello-world-funny-robot-robot.jpg' },
  { id: 'a002', title: 'One sample math question?', description: 'Use python as a calculator', type: 'A', imageUrl: 'https://cdn.pixabay.com/photo/2018/11/02/01/48/chalk-3789462_1280.jpg' },
  { id: 'a003', title: 'The Most Beautiful Equation in Math', description: 'CS is a subfield of mathematics', type: 'A', imageUrl: 'https://cdn.pixabay.com/photo/2019/09/25/10/29/color-4503279_1280.jpg' },
  // { id: 'a004', title: 'Variables in Python practice 1', description: 'CS is a subfield of mathematics', type: 'A', imageUrl: 'https://files.realpython.com/media/Variables-in-Python_Watermarked.3868fbf92e1d.jpg' },
];
const exercisesB = [
  { id: 'b001', title: 'Variables in Python practice 1', description: 'Python does not require explicit declaration of variable types before their usage!', type: 'B', imageUrl: 'https://img.freepik.com/free-vector/cartoon-style-nerd-character-design_52683-81718.jpg?w=1060&t=st=1688407628~exp=1688408228~hmac=5dd55fcf5ec31a6747618eedfa746fb667ea47b1cee9e9e409cb33151aeb37f5' },
  { id: 'b002', title: 'Variables in Python practice 2', description: 'One more practice', type: 'B', imageUrl: 'https://img.freepik.com/free-vector/cartoon-style-nerd-character-design_52683-81717.jpg?w=1060&t=st=1688408352~exp=1688408952~hmac=74ad9fc9ae0906ee365462d9452a964ed52d4044e75898f022022affd43c47a0' },
  // { id: 'a002', title: 'One sample math question?', description: 'Use python as a calculator', type: 'A', imageUrl: 'https://cdn.pixabay.com/photo/2018/11/02/01/48/chalk-3789462_1280.jpg' },
  // { id: 'a003', title: 'The Most Beautiful Equation in Math', description: 'CS is a subfield of mathematics', type: 'A', imageUrl: 'https://cdn.pixabay.com/photo/2019/09/25/10/29/color-4503279_1280.jpg' },
  // { id: 'a004', title: 'Variables in Python practice 1', description: 'CS is a subfield of mathematics', type: 'A', imageUrl: 'https://files.realpython.com/media/Variables-in-Python_Watermarked.3868fbf92e1d.jpg' },
];





const addTask = async (task) => {
  try {
    await addDoc(collection(db, "Tasks"), {
      taskDescription: task.description,
      taskID: task.id,
      taskName: task.title,
      taskType: task.type,
    });
  } catch (e) {
    console.error("Error adding task: ", e);
  }
};

export const addAllExercisesToFirebase = () => {
  const allExercises = [...exercisesA, ...exercisesB];
  allExercises.forEach(exercise => addTask(exercise));
};



function Exercise() {

  
  return (
    <div>
      {/* Navigation bar */}
      <NavBar />
      <div className="container mt-4">
        <h1>Hello, World!</h1>
        <Row xs={1} md={3} className="g-4">
          {exercisesA.map((exercise, index) => (
            <Col key={exercise.id}>
              <a href={`/${exercise.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <Card>
                  <Card.Img variant="top" src={exercise.imageUrl} />
                  <Card.Body>
                    <Card.Title>{exercise.title}</Card.Title>
                    <Card.Text>
                      {exercise.description}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </a>
            </Col>
          ))}
        </Row>
      </div>
      <div className="container mt-4">
        <h1>Variables and Types</h1>
        <Row xs={1} md={3} className="g-4">
          {exercisesB.map((exercise, index) => (
            <Col key={exercise.id}>
              <a href={`/${exercise.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <Card>
                  <Card.Img variant="top" src={exercise.imageUrl} />
                  <Card.Body>
                    <Card.Title>{exercise.title}</Card.Title>
                    <Card.Text>
                      {exercise.description}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </a>
            </Col>
          ))}
        </Row>
      </div>
      <div>
      {/* ... */}
      {/* <button onClick={addAllExercisesToFirebase}>Add Exercises to Firebase</button> */}
      {/* ... */}
    </div>
    </div>
  );
}

export default Exercise;
