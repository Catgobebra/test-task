import * as React from 'react';
import {BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import EmployeeListPage from '../pages/EmployeeListPage/components/EmployeeListPage/EmployeeListPage'
import EmployeeDetailPage from '../pages/EmployeeDetailPage/components/EmployeeDetailPage/EmployeeDetailPage'
import './App.css'
import NotFound from '../pages/NotFound/components/NotFound/NotFound';

function App() {
  return (
   <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/employees" replace />} />
        <Route path="/employees" element={<EmployeeListPage />} /> 
        <Route path="/employees/:id" element={<EmployeeDetailPage />}/> 
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;