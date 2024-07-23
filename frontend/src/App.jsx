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
import ForgetPassword from './pages/ForgetPassword';
import ResetPassword from './pages/ResetPassword';

function App() {


  return (
    <>
      <Router>
        
        <div>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/task/:taskId" element={<Task />} />
            <Route path="/forgetpassword" element={<ForgetPassword />} />
            <Route path="/resetpassword/:token" element={<ResetPassword />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App
