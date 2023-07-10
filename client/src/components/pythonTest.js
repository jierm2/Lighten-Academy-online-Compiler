import React, { useState, useEffect, useCallback } from 'react';
import AceEditor from 'react-ace';
import { Spinner } from 'react-bootstrap';
import 'ace-builds/src-noconflict/mode-python';
import 'ace-builds/src-noconflict/theme-monokai';
import 'ace-builds/src-noconflict/ext-language_tools';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import SettingsIcon from '@mui/icons-material/Settings';
import Typography from '@mui/material/Typography';
import RedoIcon from '@mui/icons-material/Redo';
import UndoIcon from '@mui/icons-material/Undo';
import { Container, Grid } from '@mui/material';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db, auth } from '../config/firebase';
import { updateDoc } from 'firebase/firestore';

function PythonTest({ initialCode, setResult, id }) {
  const [code, setCode] = useState(initialCode);
  const [output, setOutput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  let editorRef; // reference to the AceEditor component

  const handleClear = () => {
    setIsLoading(false);
    setCode('');
    setOutput('');
  };

  const handleCodeChange = (newCode) => {
    setCode(newCode);
  };

  const handleUndo = () => {
    const { editor } = editorRef;
    editor.undo();
  };

  const handleRedo = () => {
    const { editor } = editorRef;
    editor.redo();
  };

  const handleRunCode = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetch('https://pymeow.org/api/execute', {
      // const response = await fetch('http://localhost:5000/execute', {

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
              const querySnapshot = await getDocs(q);

              if (!querySnapshot.empty) {
                const docSnapshot = querySnapshot.docs[0];

                try {
                  await updateDoc(docSnapshot.ref, {
                    completed: true,
                    completionDate: new Date(),
                  });
                } catch (error) {
                  console.error('An error occurred while updating the progress:', error);
                }
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
  }, [code, id, setResult]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if ((event.ctrlKey || event.metaKey) && (event.key === 'Enter' || event.key === 'Return')) {
        event.preventDefault();
        handleRunCode();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleRunCode]);

  return (
    <Container sx={{ paddingTop: '2rem'}}>
      <Grid container spacing={0}>
        <Grid item xs={12} md={8}>
          <div className="editor-container">
            <div className="controls">
              <Button
                startIcon={<SettingsIcon />}
                variant="contained"
                size="small"
                onClick={handleRunCode}
                disabled={!code || isLoading}
                color="success"
                sx={{
                  position: 'relative',
                  alignItems: 'center',
                  justifyContent: 'center',
                  display: 'flex',
                  '&.Mui-disabled': {
                    background: '#808080',
                    color: '#c0c0c0',
                  },
                }}
              >
                <Typography fontWeight="bold" fontSize={12} letterSpacing={1}>
                  Run
                </Typography>
                {isLoading && (
                  <Spinner
                    as="span"
                    animation="grow"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                    style={{
                      position: 'absolute',
                    }}
                  />
                )}
              </Button>

              <Button variant="contained" size="small" startIcon={<UndoIcon />} onClick={handleUndo}>
                <Typography fontWeight="bold" fontSize={12} letterSpacing={1}>
                  Undo
                </Typography>
              </Button>

              <Button variant="contained" size="small" startIcon={<RedoIcon />} onClick={handleRedo}>
                <Typography fontWeight="bold" fontSize={12} letterSpacing={1}>
                  Redo
                </Typography>
              </Button>

              <Button
                variant="contained"
                size="small"
                color="error"
                startIcon={<DeleteIcon />}
                onClick={handleClear}
              >
                <Typography fontWeight="bold" fontSize={12} letterSpacing={1}>
                  Delete
                </Typography>
              </Button>
            </div>
            <AceEditor
              mode="python"
              theme="monokai"
              fontSize={14}
              value={code}
              onChange={handleCodeChange}
              placeholder="Write your Python code here..."
              className="code-editor"
              showPrintMargin={false}
              width="100%"
              height="100%"
              setOptions={{
                enableBasicAutocompletion: true,
                enableLiveAutocompletion: true,
              }}
              editorProps={{ $blockScrolling: Infinity }}
              ref={(instance) => {
                editorRef = instance;
              }}
            />
          </div>
        </Grid>
        <Grid item xs={12} md={4} sx={{ height: '100%' }}>
          <div className="output-container">
            <div className="terminal-header">Console</div>
            <AceEditor
              mode="text"
              theme="monokai"
              fontSize={14}
              value={output}
              readOnly={true}
              className="terminal-body"
              showPrintMargin={false}
              width="100%"
              height="100%"
              setOptions={{
                wrap: true,
                showGutter: false,
                highlightActiveLine: false,
              }}
              editorProps={{ $blockScrolling: Infinity }}
            />
          </div>
        </Grid>
      </Grid>
    </Container>
  );
}

export default PythonTest;
