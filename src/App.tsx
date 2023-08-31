import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { Game } from './pages/Game';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/Game/:id" element={<Game />} />
    </Routes>
  );
}

export default App;
