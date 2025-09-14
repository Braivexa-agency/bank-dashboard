import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Settings from './pages/Settings';
import WorkCertificate from './pages/WorkCertificate';
import DairaInvestigation from './pages/DairaInvestigation';
import WilayaInvestigation from './pages/WilayaInvestigation';

function App(): React.JSX.Element {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<WorkCertificate />} />
          <Route path="work-certificate" element={<WorkCertificate />} />
          <Route path="daira-investigation" element={<DairaInvestigation />} />
          <Route path="wilaya-investigation" element={<WilayaInvestigation />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App
