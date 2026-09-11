import {Users, UserCheck,Building2,CelendarOff} from 'lucide-react'
import './DashboardItems.css'

function DashboardItems() {
  return (  
    <div className="summary-cards">
      <div className="summary-card">
        <span><Users /> Total Employee</span> 
        <h2>248</h2>
      </div>   

      <div className="summary-card">
        <span><UserCheck /> Present Today</span>  
        <h2>215</h2>
      </div>   

      <div className="summary-card">
        <span><CelendarOff /> On Leave</span>
        <h2>12</h2>
      </div>  

      <div className="summary-card">
        <span>Departments</span>
        <h2>8</h2>
      </div>

    </div>
  )
}

export default DashboardItems