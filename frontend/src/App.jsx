import './App.css'
import {
  BrowserRouter as Router,
  Route,
  Routes,
 
} from "react-router-dom";

import HomePage from './pages/HomePage';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import ConditionalHeader from './components/ConditionalHeader';
import Dashboard from './pages/Dashboard';
import Task from './pages/Task';

function App() {


  return (
    <>
      <Router>
        <ConditionalHeader />
        <div>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path='/tasks' element={<Task/>} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App
