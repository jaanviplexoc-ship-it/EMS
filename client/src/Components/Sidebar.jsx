import {NavLink} from "react-router-dom"
import {
  UsersRound,Home,Users,Building2,CalendarDays,Plane,Database,BarChart3,FileText,Settings,Sparkles} from "lucide-react"
import './Sidebar.css';

function Sidebar() {

  const activeItem = ({isActive}) => {
    return isActive ? "menu-items active" : "menu-items"
  }
  return (
    
    // logo

    <div className="sidebar">
      <div className="sidebar-logo">
        <div className="logo-icon">
          <UsersRound />
        </div>

        <div className="logo-text">
          <h2>EMS</h2>
          <span>Employeee Management System</span>
        </div>
      </div>

    {/* Nvaigation */}

    <div className="sidebar-menu">
        <NavLink to="/" className={activeItem}>
        <Home />
        <span>Dashboard</span>
        </NavLink>

        <NavLink to="/employees" className={activeItem}>
          <Users />
          <span>Employees</span>
        </NavLink>

        <NavLink to="/departments" className={activeItem}>
          <Building2 />
          <span>Departments</span>
        </NavLink>

        <NavLink to="/attendance" className={activeItem}>
          <CalendarDays />
          <span>Attendance</span>
        </NavLink>

        <NavLink to="/leave" className={activeItem}>
          <Plane />
          <span>Leave</span>
        </NavLink>

        <NavLink to="/payroll" className={activeItem}>
          <Database />
          <span>Payroll</span>
        </NavLink>

        <NavLink to="/performance" className={activeItem}>
          <BarChart3 />
          <span>Performance</span>
        </NavLink>

        <NavLink to="/reports" className={activeItem}>
          <FileText />
          <span>Reports</span>
        </NavLink>

        <NavLink to="/settings" className={activeItem}>
          <Settings />
          <span>Settings</span>
        </NavLink>
    </div>

    {/* bottom-card */}

    <div className="sidebar-bottom">
      <Sparkles />
      <span>Great teams build great companies.</span>
    </div>

  </div>
  )
};

export default Sidebar
