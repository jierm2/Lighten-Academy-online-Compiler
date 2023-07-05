import React, { useState, useEffect } from 'react';
import AceEditor from 'react-ace';
import { Button, Spinner } from 'react-bootstrap';
import Confetti from 'react-confetti'
import {updateDoc } from 'firebase/firestore';
import { db, auth } from '../config/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';

import 'ace-builds/src-noconflict/mode-python';
import 'ace-builds/src-noconflict/theme-monokai';

function PythonTest({ initialCode, setResult, id }) {
  const [code, setCode] = useState(initialCode);
  const [output, setOutput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleCodeChange = (newCode) => {
    setCode(newCode);
  };

  const handleRunCode = async () => {
    setIsLoading(true);

    try {
      const response = await fetch('http://127.0.0.1:5000/execute', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code, exercise_id: id }),
      });

      if (response.ok) {
        const result = await response.json();

        if (result.error) {
          setOutput('Error:\n' + result.error);
        } else {
          setOutput(result.output);
          setResult(result.output);

          if (result.ok) {
            const taskId = id;
            const user = auth.currentUser;

            if (user) {
              const userId = user.uid;
              const temp = taskId.toLowerCase();
              const q = query(collection(db, 'Progress'), where('userID', '==', userId), where('taskID.taskID', '==', temp));
              // console.log('userid and taskid',userId,taskId)
              const querySnapshot = await getDocs(q);

              if (!querySnapshot.empty) {
                const docSnapshot = querySnapshot.docs[0];

                try {
                  await updateDoc(docSnapshot.ref, {
                    completed: true,
                    completionDate: new Date(),
                  });

                  // console.log('Progress marked as completed');

                  // Trigger the callback function to fetch the updated progress data
                } catch (error) {
                  console.error('An error occurred while updating the progress:', error);
                }
              } else {
                // console.log('No document to update');
              }
            }
          }
        }
      } else {
        console.error('Code execution failed');
        setOutput('Code execution failed');
      }
    } catch (error) {
      console.error('An error occurred while executing the code:', error);
      setOutput('An error occurred while executing the code');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (
        (event.ctrlKey || event.metaKey) &&
        (event.key === 'Enter' || event.key === 'Return')
      ) {
        event.preventDefault();
        handleRunCode();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [code]);

  return (
    <div className="container mt-4">
      <div className="input-container">
        <AceEditor
          mode="python"
          theme="monokai"
          fontSize={16}
          value={code}
          onChange={handleCodeChange}
          placeholder="Write your Python code here"
          style={{
            width: '100%',
            height: '470px',
            borderRadius: '10px',
            padding: '20px',
          }}
          showPrintMargin={false}
        />

        <Button
          onClick={handleRunCode}
          variant="success"
          disabled={!code || isLoading}
          className="run-button"
        >
          {isLoading ? (
            <>
              <Spinner as="span" animation="grow" size="sm" role="status" aria-hidden="true" /> 
            </>
          ) : (
            'Run'
          )}
        </Button>
      </div>

      <br />

      <div className="terminal">
        <div className="terminal-body" style={{ borderRadius: '10px' }}>
          <pre>
            {output.includes("Congrats!! ALL TESTS PASSED!!🎉") && (
              <Confetti width={3000} height={450} />
            )}
            {output} {output ? null : 'Press Control-Enter to run the code above'}
          </pre>
        </div>
      </div>
    </div>
  );
}

export default PythonTest;
