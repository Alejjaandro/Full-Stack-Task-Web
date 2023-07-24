// We use react-router-dom to make the routes to navigate.
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// We import the pages
import Register from './pages/Register.jsx';
import Login from './pages/Login.jsx';
import Home from './pages/Home.jsx';
import Tasks from './pages/Tasks.jsx';
import TaskForm from './pages/TaskForm.jsx';
import Profile from './pages/Profile.jsx';
import Navbar from './components/Navbar.jsx';

import ProtectedRoutes from './ProtectedRoutes.jsx';

// We import Context providers.
import { AuthProvider } from './context/AuthContext.jsx';
import { TaskProvider } from './context/TaskContext.jsx';

export default function App() {
  return (
    // All components inside AuthProvider can access the context of "/context/auth.context.jsx".
    <AuthProvider>
      <TaskProvider>
        <BrowserRouter>

          <Navbar />
          
          <Routes>

            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Protected Routes */}
            <Route element={<ProtectedRoutes />} >

              <Route path="/tasks" element={<Tasks />} />
              <Route path="/add-task" element={<TaskForm />} />
              <Route path="/tasks/:id" element={<TaskForm />} />
              <Route path="/profile" element={<Profile />} />

            </Route>

          </Routes>
        </BrowserRouter>
      </TaskProvider>
    </AuthProvider>
  )
}
