import { BrowserRouter, Routes, Route } from 'react-router-dom';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={ <h1> Home Page </h1> } />
        <Route path="/login" element={ <h1> Login </h1> } />
        <Route path="/register" element={ <h1> Register </h1> } />
        <Route path="/tasks" element={ <h1> All Tasks </h1> } />
        <Route path="/add-task" element={ <h1> Add Task </h1> } />
        <Route path="/tasks/:id" element={ <h1> Task </h1> } />
        <Route path="/profile" element={ <h1> Profile </h1> } />
      </Routes>    
    </BrowserRouter>
  )
}
