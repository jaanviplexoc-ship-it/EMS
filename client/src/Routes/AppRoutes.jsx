import { Routes, Route } from "react-router-dom";

import Dashboard from "../Pages/Dashboard.jsx";
import Employees from "../Pages/Employees.jsx";
import Departments from "../Pages/Departments.jsx"; 
import Attendance from "../Pages/Attendance.jsx";
import Leave from "../Pages/Leave.jsx";
import Reports from "../Pages/Reports.jsx";
import Performance from "../Pages/Performance.jsx";
import Payroll from "../Pages/Payroll.jsx";
import Settings from "../Pages/Settings.jsx";

function AppRoutes() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/employees" element={<Employees />} />
        <Route path="/departments" element={<Departments />} />
        <Route path="/attendance" element={<Attendance />} />
        <Route path="/leave" element={<Leave />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/performance" element={<Performance />} />
        <Route path="/payroll" element={<Payroll />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </div>
  )
}

export default AppRoutes
