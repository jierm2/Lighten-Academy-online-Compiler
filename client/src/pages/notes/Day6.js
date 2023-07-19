import React from 'react';
import NavBar from '../../components/NavBar';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { TypeAnimation } from 'react-type-animation';
import { Container } from 'react-bootstrap';


const Day6 = () => {
  const pythonCode = `#!=: not
  #==
  #<
  #>
  #<=
  #>=
  # |
  # &
  wallet = 500
  membership_card =True
  #xbox costing 300
  #if u have membership card and u have enough money, u can get a new xbox
  #if u dont have a membership but u have enough money, join the membership
  #if u have a membership card but dont have enough money, too bad
  
  # #to check 300+ and if u have a membership_card
  # if ((wallet >= 300) & (membership_card== True)):
  #     print('u got a new xbox')
  # # if u dont have a membership_card and u have enough money
  # elif ((wallet >=300) & (membership_card ==False)):
  #     print('u dont have a membership_card')
  # else:
  #     print('u dont have enough money or u dont have a membership_card')
  # print('i have', apple, 'apples')
  # print('i have $',wallet, 'in my wallet')
  
  
  
  
  
  # create a new variable named : banana
  #set it to 5
  
  # banana = 5
  # # u have <<banana>> bananas
  # #u have #bananas
  
  # print('i have $',banana, ' bananas')
  # print('howdy world')
  # print('howdy','world')
  
  
  
  arr = ['a','b','c','d','e']
  arr.append('f')
  #arr = ['a','b','c','d','e','f']
  
  print(arr[-1])
  # #index
  # print(arr[100])
  # # banana = 10
  # # print(type(arr))
  
  
  
  # arr = []
  # arr.append(1)
  
  
  #first question
  # create a new empty list
  # add 1, 2,3,4
  #(int)
  
  arr=[]
  arr.append(1)
  arr.append(2)
  arr.append(3)
  arr.append(4)
  print (arr)`;
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
          padding: '0 10%',

        }}
      >
        <div style={{ width: '100%' }}>
          <h1><TypeAnimation
                sequence={[
                  'Day 6',
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

export default Day6;
