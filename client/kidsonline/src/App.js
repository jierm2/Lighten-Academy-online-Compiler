import React from 'react';
import Exercise from './pages/exercise';
import Home from './pages/home';
import Account from './pages/account';
import AboutUs from "./pages/aboutUs";
function App() {
  const currentPath = window.location.pathname;

  return (
    <div className="App">
      {currentPath === '/' && <Home />}
      {currentPath === '/exercise' && <Exercise />}
      {currentPath === '/account' && <Account />}
      {currentPath === '/aboutUs' && <AboutUs />}

    </div>
  );
}

export default App;
