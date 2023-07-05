import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Exercise from './pages/Exercise';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/signup';
import AboutUs from './pages/AboutUs';
import { UserProvider } from './context/Usercontext';
import Account from './pages/account';
import A001 from './pages/excercise/a/a001';
import A002 from './pages/excercise/a/a002';
import A003 from './pages/excercise/a/a003';
import B001 from './pages/excercise/b/b001';
import B002 from './pages/excercise/b/b002';
import AuthWrapper from './context/AuthWrapper';

function App() {
  return (
    <UserProvider>

    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/exercise" element={<Exercise />} />
          <Route path="/login" element={<AuthWrapper nonAuthenticated={true}><Login /></AuthWrapper>} />
          <Route path="/signup" element={<AuthWrapper nonAuthenticated={true}><Signup /></AuthWrapper>} />
          <Route path="/aboutUs" element={<AboutUs />} />
          <Route path="/account" element={<AuthWrapper><Account /></AuthWrapper>} />
          <Route path="/a001" element={<A001 />} />
          <Route path="/a002" element={<A002 />} />
          <Route path="/a003" element={<A003 />} />
          <Route path="/b001" element={<B001 />} />
          <Route path="/b002" element={<B002 />} />
        </Routes>
      </div>
    </Router>
    </UserProvider>

  );
}

export default App;


