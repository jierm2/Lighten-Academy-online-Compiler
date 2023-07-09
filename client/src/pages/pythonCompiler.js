import React, { useState, useEffect, useCallback } from 'react';
import AceEditor from 'react-ace';
import {Spinner } from 'react-bootstrap';
import 'ace-builds/src-noconflict/mode-python';
import 'ace-builds/src-noconflict/theme-monokai';
import 'ace-builds/src-noconflict/ext-language_tools';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import SettingsIcon from '@mui/icons-material/Settings';
import Typography from '@mui/material/Typography';
import RedoIcon from '@mui/icons-material/Redo';
import UndoIcon from '@mui/icons-material/Undo';

function PythonCompiler() {
  const [code, setCode] = useState('');
  const [output, setOutput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [history,setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(0);
  const handleClear = () => {
    setIsLoading(false);
    setCode('');
    setOutput('');
  };
  let editorRef; // reference to the AceEditor component

  const handleCodeChange = (newCode) => {
    setHistory((prevHistory) => {
      const newHistory = [...prevHistory];
      newHistory.splice(historyIndex + 1, newHistory.length, newCode);
      return newHistory;
    });
    setHistoryIndex((prevHistoryIndex) => prevHistoryIndex + 1);
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
      const response = await fetch('http://localhost:5000/execute', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code }),
      });

      if (response.ok) {
        const result = await response.json();
        if (result.error) {
          setOutput('Error:\n' + result.error);
        } else {
          setOutput(result.output);
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
  }, [code]);

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
    
    <div className="compiler">
      <div className="editor-container">
        
        <div className="controls">
        <Button
          startIcon={<SettingsIcon/>}
          variant="contained"
          size="small"
          onClick={handleRunCode}
          disabled={!code || isLoading}
          color={"success"}
          sx={{
            position: 'relative',
            display: isLoading ? 'none' : 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            "&.Mui-disabled": {
              background: "#1976d2",
              color: "#c0c0c0"
            }
          }}
        >

          <Typography fontWeight="bold" fontSize={12} letterSpacing={1}> Run </Typography>
        </Button>

        <Button
          variant="contained"
          size="small"
          color={"success"}
          sx={{
            position: 'relative',
            display: isLoading ? 'flex' : 'none',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Spinner as="span" animation="grow" size="sm" role="status" aria-hidden="true" />
        </Button>



          <Button variant="contained" size="small" startIcon={<UndoIcon />} onClick={handleUndo}>
            <Typography fontWeight="bold" fontSize={12} letterSpacing={1}> Undo  </Typography>
          </Button>

          <Button variant="contained" size="small"  startIcon={<RedoIcon />} onClick={handleRedo}>
            <Typography fontWeight="bold" fontSize={12} letterSpacing={1}> Redo </Typography>
          </Button>

          <Button variant="contained" size="small" color="error" startIcon={<DeleteIcon />} onClick={handleClear}>
            <Typography fontWeight="bold" fontSize={12} letterSpacing={1}> Delete </Typography>
          </Button>
        </div>
        <AceEditor
          mode="python"
          theme="monokai"
          fontSize={15}
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
          ref={(instance) => { editorRef = instance; }} // get the reference to the AceEditor instance
        />
      </div>
 
      <div className="output-container">
        
        <div className="terminal-header">Console</div>
        
        <AceEditor
          mode="text"
          theme="monokai"
          fontSize={15}
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
    </div>
  );
}

export default PythonCompiler;
