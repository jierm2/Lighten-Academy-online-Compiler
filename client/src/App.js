import React from 'react';
import Exercise from './pages/Exercise';
import Home from './pages/Home';
import Account from './pages/account';
import Signup from './pages/signup';
import A001 from './pages/excercise/a001';
import AboutUs from "./pages/AboutUs";
function App() {
  const currentPath = window.location.pathname;

  return (
    <div className="App">
      {currentPath === '/' && <Home />}
      {currentPath === '/exercise' && <Exercise />}
      {currentPath === '/account' && <Account />}
      {currentPath === '/aboutUs' && <AboutUs />}
      {currentPath === '/signup' && <Signup />}

      {currentPath === '/a001' && <A001 />}

    </div>
  );
}

export default App;
