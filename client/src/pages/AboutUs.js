import React from 'react';
import { Container } from 'react-bootstrap';
import NavBar from '../components/NavBar';
import '../AboutUs.css';

function AboutUs() {
  return (
    <div>
      <NavBar />

      <Container className="mt-4 letter">
        <div className="letter-header">
          <h1>Welcome to Pymeow!</h1>
        </div>

        <div className="letter-body">
          <p>
            Hey there! I'm Jimmy Miao, and I'm super excited to welcome you to a grand adventure in the land of computer programming. On this website, we'll turn your dreams into digital magic!
          </p>
          <p>
            Coding might seem like a tough mountain to climb at first, but remember, it's all about practicing and having fun. Computers are like our personal magic wands, and once you learn the magic spells (code), you can make them do just about anything!
          </p>
          <p>
            Computers are super powerful tools, and by learning to code, you're becoming a superhero who can change the world. You'll learn to create smart answers to tricky problems, which we call 'algorithms'. You'll then use your superpowers to build and share cool stuff with kids all over the world!
          </p>
          <p>
            Remember, computer science is not just about coding; it's about mixing brainy puzzles with creative adventures. It's a fun journey that has an impact everywhere in the world, and I'm stoked to be your tour guide on this wild ride.
          </p>
          <p>
            So, buckle up and get ready to explore the dazzling world of Python for Kids! We'll play, learn, and let our imaginations fly together.
          </p>
        </div>

        <div className="letter-signature">
          <p>
            Jimmy Miao
            <br />
            A college student studying Statistics&Computer Science at the &nbsp;
            <span className="school-name"> 
              University of Illinois Urbana-Champaign
            </span>
            <a href="https://cs.illinois.edu/" target="_blank" rel="noopener noreferrer" className="school-link">
              <img src="https://cdn.vox-cdn.com/uploads/chorus_image/image/56187477/DHNkdRfXoAEp2VD.0.jpg" alt="UIUC Logo" className="school-logo" />
            </a>
          </p>
        </div>
      </Container>
    </div>
  );
}

export default AboutUs;
