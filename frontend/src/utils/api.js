import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Auth APIs
export const register = (userData) => api.post('/auth/register', userData)
export const login = (credentials) => api.post('/auth/login', credentials)

// Spotify APIs
export const searchSongs = (query) => api.get(`/spotify/search?q=${query}`)
export const getFeaturedSongs = () => api.get('/spotify/featured')
export const getRecommendations = (genres) => api.get(`/spotify/recommendations?genres=${genres}`)
export const getTrack = (id) => api.get(`/spotify/track/${id}`)

// Playlist APIs
export const createPlaylist = (data) => api.post('/playlists', data)
export const getUserPlaylists = () => api.get('/playlists')
export const getPlaylist = (id) => api.get(`/playlists/${id}`)
export const addSongToPlaylist = (playlistId, songData) => api.post(`/playlists/${playlistId}/songs`, songData)
export const removeSongFromPlaylist = (playlistId, songId) => api.delete(`/playlists/${playlistId}/songs/${songId}`)
export const deletePlaylist = (id) => api.delete(`/playlists/${id}`)

export default api