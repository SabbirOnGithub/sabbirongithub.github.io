import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Portfolio from './pages/Portfolio'
import Learn from './pages/Learn'
import LabLogin from './pages/LabLogin'
import ProtectedRoute from './components/ProtectedRoute'
import './App.css'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Portfolio />} />
        <Route path="/lab/login" element={<LabLogin />} />
        <Route path="/lab" element={
          <ProtectedRoute>
            <Learn />
          </ProtectedRoute>
        } />
      </Routes>
    </BrowserRouter>
  )
}
