import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Subscribe from './pages/Subscribe'
import Dashboard from './pages/Dashboard'
import Charities from './pages/Charities'
import Draw from './pages/Draw'
import Admin from './pages/Admin'
import Login from './pages/Login'

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="layout-wrapper" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          <Navbar />
          <div style={{ flex: 1 }}>
            <Routes>
              <Route path="/"           element={<Home />} />
              <Route path="/login"      element={<Login />} />
              <Route path="/subscribe"  element={<Subscribe />} />
              <Route path="/dashboard"  element={<Dashboard />} />
              <Route path="/charities"  element={<Charities />} />
              <Route path="/draw"       element={<Draw />} />
              <Route path="/admin"      element={<Admin />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App