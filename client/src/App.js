import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Exercise from './pages/Exercise';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/signup';
import Playground from './pages/Playground';
import Notes from './pages/Notes';
import AboutUs from './pages/AboutUs';


import Day1 from './pages/notes/Day1';
import Day2 from './pages/notes/Day2';
import Day3 from './pages/notes/Day3';
import Day4 from './pages/notes/Day4';
import Day5 from './pages/notes/Day6';


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
          <Route path="/playground" element={<Playground />} />
          <Route path="/notes" element={<Notes />} />
          <Route path="/notes/day1" element={<Day1 />} />
          <Route path="/notes/day2" element={<Day2 />} />
          <Route path="/notes/day3" element={<Day3 />} />
          <Route path="/notes/day4" element={<Day4 />} />
          <Route path="/notes/day5" element={<Day5 />} />

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


