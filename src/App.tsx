import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout'
import Login from './components/Login'
import Dashboard from './components/Dashboard'
import InformActVerification from './components/InformActVerification'
import './App.css'

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/inform-act-verification" element={<InformActVerification />} />
          <Route path="/" element={<Navigate to="/login" />} />
        </Routes>
      </Layout>
    </Router>
  )
}

export default App