import React from 'react';
import '../ResponsePage.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from './NavBar';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

function Exercise() {
  const exercises = [
    { id: 'a001', title: 'Hi Computer Scientist!', description: 'Your first coding ever!', imageUrl: 'https://cdn.pixabay.com/photo/2016/11/19/14/00/code-1839406_1280.jpg' },
    // { id: 'a002', title: 'Exercise 2', description: 'This is Exercise 2', imageUrl: 'http://path-to-image-2' },
    // { id: 'a003', title: 'Exercise 3', description: 'This is Exercise 3', imageUrl: 'http://path-to-image-3' },
  ];

  return (
    <div>
      {/* Navigation bar */}
      <NavBar />
      <div className="container mt-4">
        <h1>Howdy, world!</h1>
        <Row xs={1} md={3} className="g-4">
          {exercises.map((exercise, index) => (
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
    </div>
  );
}

export default Exercise;
