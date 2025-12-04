import { useState } from 'react'
import { usePlayer } from '../context/PlayerContext'
import { getUserPlaylists, addSongToPlaylist } from '../utils/api'
import { Play, Plus } from 'lucide-react'

export default function SongCard({ song }) {
  const { playSong } = usePlayer()
  const [showPlaylistModal, setShowPlaylistModal] = useState(false)
  const [playlists, setPlaylists] = useState([])

  const formatDuration = (ms) => {
    const minutes = Math.floor(ms / 60000)
    const seconds = ((ms % 60000) / 1000).toFixed(0)
    return `${minutes}:${seconds.padStart(2, '0')}`
  }

  const handleAddToPlaylist = async () => {
    try {
      const response = await getUserPlaylists()
      setPlaylists(response.data.playlists)
      setShowPlaylistModal(true)
    } catch (error) {
      console.error('Error fetching playlists:', error)
    }
  }

  const addToPlaylist = async (playlistId) => {
    try {
      await addSongToPlaylist(playlistId, {
        songId: song.id,
        songName: song.name,
        artist: song.artist,
        album: song.album,
        duration_ms: song.duration_ms,
        preview_url: song.preview_url,
        image: song.image
      })
      alert('Song added to playlist!')
      setShowPlaylistModal(false)
    } catch (error) {
      alert(error.response?.data?.error || 'Failed to add song')
    }
  }

  return (
    <>
      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 hover:bg-white/20 transition group">
        <div className="relative mb-4">
          <img
            src={song.image || 'https://via.placeholder.com/300'}
            alt={song.name}
            className="w-full h-48 object-cover rounded-lg"
          />
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center gap-3">
            <button
              onClick={() => playSong(song)}
              className="bg-purple-600 hover:bg-purple-700 p-3 rounded-full transition"
            >
              <Play className="text-white" size={24} fill="white" />
            </button>
            <button
              onClick={handleAddToPlaylist}
              className="bg-white/20 hover:bg-white/30 p-3 rounded-full transition"
            >
              <Plus className="text-white" size={24} />
            </button>
          </div>
        </div>
        <h3 className="text-white font-semibold truncate">{song.name}</h3>
        <p className="text-purple-200 text-sm truncate">{song.artist}</p>
        <p className="text-purple-300 text-xs mt-1">{formatDuration(song.duration_ms)}</p>
      </div>

      {showPlaylistModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-purple-900 rounded-2xl p-6 w-full max-w-md">
            <h3 className="text-xl font-bold text-white mb-4">Add to Playlist</h3>
            {playlists.length === 0 ? (
              <p className="text-purple-200">No playlists yet. Create one first!</p>
            ) : (
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {playlists.map((playlist) => (
                  <button
                    key={playlist._id}
                    onClick={() => addToPlaylist(playlist._id)}
                    className="w-full text-left px-4 py-3 bg-white/10 hover:bg-white/20 rounded-lg text-white transition"
                  >
                    {playlist.name}
                  </button>
                ))}
              </div>
            )}
            <button
              onClick={() => setShowPlaylistModal(false)}
              className="w-full mt-4 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </>
  )
}