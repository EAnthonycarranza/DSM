// src/App.js
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './components/Login';
import PersonalInfoForm from './components/PersonalInfoForm';
import Register from './components/Register';
import AdminLogin from './components/AdminLogin';
import AdminDashboard from './components/AdminDashboard';
import Contacts from './components/Contacts';
import Calendar from './components/Calendar';
import Insights from './components/Insights';
import UserDetails from './components/UserDetails';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/personalinfo" element={<PersonalInfoForm />} />
        <Route path='/register' element={<Register/>}/>
        <Route path='/adminlogin' element={<AdminLogin/>}/>
        <Route path='/admindashboard' element={<AdminDashboard/>}/>
        <Route path="/admindashboard/:id" element={<UserDetails />} />
        <Route path="/admindashboard/contacts" element={<Contacts />} />
        <Route path="/admindashboard/calendar" element={<Calendar />} />
        <Route path="/admindashboard/insights" element={<Insights />} />
      </Routes>
    </Router>
  );
}

export default App;
