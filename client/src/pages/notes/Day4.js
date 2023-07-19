import React from 'react';
import NavBar from '../../components/NavBar';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { TypeAnimation } from 'react-type-animation';
import { Container } from 'react-bootstrap';


const Day4 = () => {
  const pythonCode = `# apple  = 25
  # if apple >10:
  #     print('apple is greater than 10')
  # else:
  #     print('apple is less or equals...')
  # print('howdy world')
  # print(2+1)
  # print('2+1')
  # print(9)
  # print('9')
  # print(9.9)
  # print(True)
  
  #if 
  #else
  #elif
  # apple = 5
  
  # if apple ==5:
  #     print('first')
  # if apple >4:
  #     print('second')
  
  # print('--------')
  # banana = 1
  # if banana>4:
  #     print('first')
  # elif banana ==5:
  #     print('second')
  # else:
  #     print('banana')
      
  #given a test grade
  # grade = 89
  #if the grade is above 90, thats an A
  #if the grade is above 80 , thats an B
  #else, thats an F
  
  
  #and   a and b
  
  #or  a or b
  
  # find range 1-10, inclusive
  
  # 0 <= x <=10
  #9, print(true)
  #15, print(false)
  #range 1-10
  # print hello if the number is 16 or 17, else print no
  #or |
  #and &
  
  number = -15
  #range 1-10
  if ((number >=1) & (number <=10)):
      print('hello')
  `;
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

export default Day4;
