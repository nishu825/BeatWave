import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './context/AuthContext'
import Login from './pages/Login'
import Register from './pages/Register'
import Home from './pages/Home'
import Search from './pages/Search'
import Playlists from './pages/Playlists'
import Navbar from './components/Navbar'
import MusicPlayer from './components/MusicPlayer'

function App() {
  const { token } = useAuth()

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900">
        {token && <Navbar />}
        
        <div className={token ? 'pb-24' : ''}>
          <Routes>
            <Route path="/login" element={!token ? <Login /> : <Navigate to="/" />} />
            <Route path="/register" element={!token ? <Register /> : <Navigate to="/" />} />
            <Route path="/" element={token ? <Home /> : <Navigate to="/login" />} />
            <Route path="/search" element={token ? <Search /> : <Navigate to="/login" />} />
            <Route path="/playlists" element={token ? <Playlists /> : <Navigate to="/login" />} />
          </Routes>
        </div>

        {token && <MusicPlayer />}
      </div>
    </Router>
  )
}

export default App