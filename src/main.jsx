import { BrowserRouter as Router } from 'react-router-dom'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <Router>
    <AuthProvider>
      <App />
    </AuthProvider>
  </Router>,
)
