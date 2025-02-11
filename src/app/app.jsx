import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './page';
import SingleUsersComponents from './SingleUsersComponents';

const App = () => {
  return (
    <Router>
      <nav>
        {/* Navbar yoki Link lar qo‘shish */}
      </nav>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/users/:id' element={<SingleUsersComponents />} />
      </Routes>
    </Router>
  );
};

export default App;
