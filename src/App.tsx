import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './components/Layout/MainLayout';
import Dashboard from './pages/Dashboard';
import Fitness from './pages/Fitness';
import Schulung from './pages/Schulung';
import Todos from './pages/Todos';
import Journal from './pages/Journal';
import Dateien from './pages/Dateien';
import Schulden from './pages/Schulden';

function App() {
  // Überprüfen, ob der User ein Farbschema bevorzugt
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('darkMode');
      if (savedTheme !== null) {
        return savedTheme === 'true';
      }
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  useEffect(() => {
    // Theme anwenden und speichern
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('darkMode', darkMode.toString());
  }, [darkMode]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="fitness" element={<Fitness />} />
          <Route path="schulung" element={<Schulung />} />
          <Route path="todos" element={<Todos />} />
          <Route path="journal" element={<Journal />} />
          <Route path="dateien" element={<Dateien />} />
          <Route path="schulden" element={<Schulden />} />
          <Route path="*" element={<Navigate to="/\" replace />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;