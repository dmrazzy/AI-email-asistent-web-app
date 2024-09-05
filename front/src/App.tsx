import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import LandingPage from './components/LandingPage';
import Dashboard from './components/Dashboard';
import PricingPage from './components/PricingPage';
import { ThemeProvider } from './components/ThemeContext';
import Usluge from './components/Usluge';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<LandingPage />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="usluge" element={<Usluge />} />
            <Route path="pricing" element={<PricingPage />} />

          </Route>
        </Routes>
      </Router>

    </ThemeProvider>

  );
}

export default App;