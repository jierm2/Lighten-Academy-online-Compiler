import React from 'react';
import NavBar from '../../components/NavBar';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { TypeAnimation } from 'react-type-animation';
import { Container } from 'react-bootstrap';


const Day2 = () => {
  const pythonCode = `# ------------------------
# apple = 10
# # print(apple + 1)
# apple = apple + 5

# print('apple', apple)
# banana = 10
# banana += 5
# print('banana', banana)

# print(10 + 3)
# print(10 - 3)
# print(10 * 3)
# print(10 / 3)
# print(10 // 3)

money = 0
# i give u $100
# ur friend gives you 20$
# ur mom takes 50$ away
# ?

# boolean

# isCSfun = False

# # print(isCSfun)

# if isCSfun == True:
#     print('CS is FUN!')
# else:
#     print('CS is not FUN :(')

# speed 50 mph
# speed limit is 30mph
# if you are speeding, print ur speeding, <speed>
# if not, print ur not speeding

# if speeding:
# print???
# else :
# print ???

# speed = 50
# speed_limit = 30
# if speed > speed_limit:
#     print('ur speeding')
# else:
#     print('ur not speeding')`;
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
