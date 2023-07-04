import React from 'react';
import Exercise from './pages/Exercise';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/signup';
import AboutUs from "./pages/AboutUs";
import { UserProvider } from './context/Usercontext';
import Account from './pages/account';
import A001 from './pages/excercise/a/a001';
import A002 from './pages/excercise/a/a002';
import A003 from './pages/excercise/a/a003';

import B001 from './pages/excercise/b/b001';
import B002 from './pages/excercise/b/b002';

function App() {
  const currentPath = window.location.pathname;

  return (
    <UserProvider>

    <div className="App">
      {currentPath === '/' && <Home />}
      {currentPath === '/exercise' && <Exercise />}
      {currentPath === '/login' && <Login />}
      {currentPath === '/aboutUs' && <AboutUs />}
      {currentPath === '/signup' && <Signup />}
      {currentPath === '/account' && <Account />}
      {currentPath === '/a001' && <A001 />}
      {currentPath === '/a002' && <A002 />}
      {currentPath === '/a003' && <A003 />}

      {currentPath === '/b001' && <B001 />}
      {currentPath === '/b002' && <B002 />}


    </div>
    </UserProvider>

  );
}

export default App;
