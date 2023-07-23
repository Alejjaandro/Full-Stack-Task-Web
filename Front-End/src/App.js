// We use react-router-dom to make the routes to navigate.
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// We import the pages
import Register from './pages/Register.jsx';
import Login from './pages/Login.jsx';

// We import AuthProvider
import { AuthProvider } from './context/auth.context.jsx';

export default function App() {
  return (
    // All components inside AuthProvider can access the context of "/context/auth.context.jsx".
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<h1> Home Page </h1>} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/tasks" element={<h1> All Tasks </h1>} />
          <Route path="/add-task" element={<h1> Add Task </h1>} />
          <Route path="/tasks/:id" element={<h1> Task </h1>} />
          <Route path="/profile" element={<h1> Profile </h1>} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}
