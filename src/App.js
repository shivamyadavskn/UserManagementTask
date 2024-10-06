import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import UserDetailPage from './pages/UserDetailPage';

function App() {
  return (
    <Router>
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold my-4">User Management App</h1>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/user/:id" element={<UserDetailPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;