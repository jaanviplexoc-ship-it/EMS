import Sidebar from './Components/Sidebar.jsx'
import AppRoutes from './Routes/AppRoutes.jsx'
import './App.css'

function App() {
  return (
    <div className='app-layout'>

      <Sidebar />

      <main className='main-content'>
        <AppRoutes />
      </main>
      
    </div>
  )
};

export default App
