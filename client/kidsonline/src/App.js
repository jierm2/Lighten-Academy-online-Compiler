import React from 'react';
import Exercise from './pages/Exercise';
import Home from './pages/Home';
import AboutUs from "./pages/AboutUs";
function App() {
  const currentPath = window.location.pathname;

  return (
    <div className="App">
      {currentPath === '/' && <Home />}
      {currentPath === '/exercise' && <Exercise />}
      {currentPath === '/AboutUs' && <AboutUs />}

    </div>
  );
}

export default App;
