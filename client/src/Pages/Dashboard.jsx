import DashboardItems from '../Components/DashboardItems.jsx';


function Dashboard() {
  return (
    <div className="Dashboard">
      <header>
        <h1>Dashboard</h1>
        <p>Welcome ! Here you can simpaly manage your employee details.</p>
      </header>

      <DashboardItems />
      
    </div>
  )
}

export default Dashboard
