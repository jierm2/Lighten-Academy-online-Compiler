import React from 'react';
import '../ResponsePage.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from '../components/NavBar';
import PythonCompiler from '../components/pythonCompiler';
import { Box } from '@mui/material';

function Playground() {
  return (
    <div>
    <NavBar />

      {/* Navigation bar */}

      <Box sx={{ padding: '0', margin: '0',maxWidth: '100%' }}>
      <PythonCompiler />
    </Box>
    </div>
  );
}

export default Playground;
