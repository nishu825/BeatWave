import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { Home, Search, ListMusic, LogOut, Music } from 'lucide-react'

export default function Navbar() {
  const { user, logout } = useAuth()
  const location = useLocation()

  const navLinks = [
    { path: '/', icon: Home, label: 'Home' },
    { path: '/search', icon: Search, label: 'Search' },
    { path: '/playlists', icon: ListMusic, label: 'Playlists' }
  ]

  return (
    <nav className="bg-purple-900/50 backdrop-blur-lg border-b border-purple-700/50 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="bg-purple-600 p-2 rounded-lg">
              <Music size={24} className="text-white" />
            </div>
            <span className="text-2xl font-bold text-white">BeatWave</span>
          </Link>

          <div className="flex items-center gap-6">
            {navLinks.map(({ path, icon: Icon, label }) => (
              <Link
                key={path}
                to={path}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${
                  location.pathname === path
                    ? 'bg-purple-600 text-white'
                    : 'text-purple-200 hover:bg-purple-800/50'
                }`}
              >
                <Icon size={20} />
                <span className="hidden md:inline">{label}</span>
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <span className="text-purple-200 hidden sm:inline">{user?.username}</span>
            <button
              onClick={logout}
              className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition"
            >
              <LogOut size={20} />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}