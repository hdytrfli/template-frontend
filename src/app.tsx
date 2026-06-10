import { BrowserRouter, Routes, Route, Navigate } from 'react-router';

import { Toaster } from '@/components/toaster';
import { AuthLayout } from '@/layouts/auth-layout';
import { DashboardLayout } from '@/layouts/dashboard-layout';
import { ProtectedRoute } from '@/layouts/protected-route';
import { CompanyCreate } from '@/pages/companies/create';
import { CompanyEdit } from '@/pages/companies/edit';
import { CompanyList } from '@/pages/companies/list';
import { Dashboard } from '@/pages/dashboard';
import { Login } from '@/pages/login';
import { Register } from '@/pages/register';
import { UserCreate } from '@/pages/users/create';
import { UserEdit } from '@/pages/users/edit';
import { UserList } from '@/pages/users/list';

function App() {
  return (
    <BrowserRouter>
      <Toaster />
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route element={<DashboardLayout />}>
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='/users' element={<UserList />} />
            <Route path='/users/create' element={<UserCreate />} />
            <Route path='/users/:id/edit' element={<UserEdit />} />
            <Route path='/companies' element={<CompanyList />} />
            <Route path='/companies/create' element={<CompanyCreate />} />
            <Route path='/companies/:id/edit' element={<CompanyEdit />} />
          </Route>
        </Route>

        <Route path='*' element={<Navigate to='/login' replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
