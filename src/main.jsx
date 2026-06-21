import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './styles/global.css'
import { AuthProvider } from './context/AuthContext'
import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'
import HomePage from './pages/HomePage'
import AuthCallback from './pages/AuthCallback.jsx'
import { GooeyToaster } from './components/ui/goey-toaster'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <GooeyToaster position="top-right" theme="dark" showProgress closeButton="top-right" />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/auth/callback" element={<AuthCallback />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)
