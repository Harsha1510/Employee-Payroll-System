import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login';
import Dashboard from './pages/Dashboard';
import AdminDashBoard from './components/AdminDashboard'
import AttendanceDetails from './components/AttendanceDetails';
import EmployeeForm from './components/EmployeeForm';
import EmployeeList from './components/EmployeeList'
import Payslip from './components/Payslip';
import NavigationBar from './components/NavigationBar';
import TakeLeave from '../TakeLeave';
import Leave from './components/LeaveRequests';
import TakeAttendance from './components/TakeAttendence';
import LeaveAvail from './components/LeaveAvail';

const App = () => {
  return (
    
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/employee"
          element={
            <>
              <NavigationBar />
              <Dashboard />
            </>
          }
        />
        <Route
          path="/attendance"
          element={
            <>
              <NavigationBar />
              <AttendanceDetails />
            </>
          }
        />
        <Route
          path="/payslip-tax-report"
          element={
            <>
              <NavigationBar />
              <Payslip />
            </>
          }
        />
        <Route path="/admin" element={
            <>
                <AdminDashBoard />
            </>
        } />
        <Route path="/view-employee" element={
            <>
                <EmployeeList/>
            </>
        } />
        <Route path="/add-employee" element={
            <>
                <EmployeeForm/>
            </>
        } />
        <Route path="/take-leave" element={
            <>
                <NavigationBar/>
                <TakeLeave />
            </>
        } />
        <Route path="/approve-leave" element={
            <>
                <Leave />
            </>
        } />
        <Route path="/leave-avail" element={
            <>
                <NavigationBar />
                <LeaveAvail />
            </>
        } />
        <Route path="/take-attendance" element={
            <>
                <TakeAttendance />
            </>
        } />
      </Routes>
    </Router>
  );
};

export default App;
