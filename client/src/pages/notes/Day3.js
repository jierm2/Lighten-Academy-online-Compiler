import React from 'react';
import NavBar from '../../components/NavBar';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { TypeAnimation } from 'react-type-animation';
import { Container } from 'react-bootstrap';


const Day2 = () => {
  const pythonCode = `# ------------------------
  #boolean
  # True False
  
  # given a student's test grade
  # if the student's grade is above 60, print passed, inclusive
  #if the student's grade is below 60, print failed
  #-----------------------------
  
  
  # given a student's test grade
  # if the student's grade is above 90, thats an A, inclusive
  #if the student's grade is from 80 to 89, Thats a B
  #if <80 , failed
  #-----------------------------
  #if
  #else
  #elif
  
  x = True
  if (x == True):
      print('a')
  else:
      print('b')
  
  
  
  # x = 7
  # # x = x+1
  # x +=1
  # print(x)
  
  # x = 7
  
  
  # apple = 5
  # print(apple)
  # # print('apples')
  # print('Howdy', 'world')`;
  return (
    <div>
      <NavBar />
      <Container className="mt-4 letter">
        <div className="letter-header">
      <div
        style={{
          paddingTop: '64px', // Adjust the value to match the height of the NavBar
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          // minHeight: 'calc(100vh - 64px)', // Adjust for the height of the NavBar
          padding: '0 15%',

        }}
      >
        <div style={{ width: '70%' }}>
          <h1><TypeAnimation
                sequence={[
                  'Day 2',
                  1000,
                ]}
                wrapper="span"
                speed={300}
                repeat={Infinity}
              /></h1>
          <SyntaxHighlighter language="python" style={tomorrow}>
            {pythonCode}
          </SyntaxHighlighter>
        </div>
      </div>
      </div>
      </Container>
    </div>
  );
};

export default Day2;
