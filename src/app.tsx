import { BrowserRouter, Routes, Route, Navigate } from 'react-router';

import { Toaster } from '@/components/toaster';
import { AuthLayout } from '@/layouts/auth-layout';
import { DashboardLayout } from '@/layouts/dashboard-layout';
import { ProtectedRoute } from '@/layouts/protected-route';
import { Dashboard } from '@/pages/dashboard';
import { Login } from '@/pages/login';
import { Register } from '@/pages/register';

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
          </Route>
        </Route>

        <Route path='*' element={<Navigate to='/login' replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
