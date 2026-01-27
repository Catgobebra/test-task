import * as React from 'react';
import {BrowserRouter, Routes, Route } from 'react-router-dom';
import {EmployeeDetailPage} from '../pages/EmployeeListPage'
import {EmployeeListPage} from '../pages/EmployeeListPage'
import {NotFound} from '../pages/NotFound'

function App() {
  return (
   <BrowserRouter>
      <Routes>
        <Route path="/employees" element={<EmployeeDetailPage />} />
        <Route path="/employees/:id" element={<EmployeeListPage />}  />
      </Routes>
      <Route path="*" element={<NotFound />} />
    </BrowserRouter>
  );
}

export default App;