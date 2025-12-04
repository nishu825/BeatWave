import { useState } from 'react'
import { getPlaylist, removeSongFromPlaylist } from '../utils/api'
import { usePlayer } from '../context/PlayerContext'
import { Music, Trash2, Play } from 'lucide-react'

export default function PlaylistCard({ playlist, onDelete }) {
  const [showModal, setShowModal] = useState(false)
  const [playlistDetails, setPlaylistDetails] = useState(null)
  const { playSong } = usePlayer()

  const handleViewPlaylist = async () => {
    try {
      const response = await getPlaylist(playlist._id)
      setPlaylistDetails(response.data.playlist)
      setShowModal(true)
    } catch (error) {
      console.error('Error fetching playlist:', error)
    }
  }

  const handleRemoveSong = async (songId) => {
    try {
      await removeSongFromPlaylist(playlist._id, songId)
      const response = await getPlaylist(playlist._id)
      setPlaylistDetails(response.data.playlist)
    } catch (error) {
      alert('Failed to remove song')
    }
  }

  return (
    <>
      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 hover:bg-white/20 transition">
        <div className="flex items-center justify-center mb-4 h-32 bg-purple-600/30 rounded-lg">
          <Music size={48} className="text-purple-300" />
        </div>
        <h3 className="text-white font-semibold text-lg truncate">{playlist.name}</h3>
        <p className="text-purple-200 text-sm mt-1">{playlist.songs.length} songs</p>
        <div className="flex gap-2 mt-4">
          <button
            onClick={handleViewPlaylist}
            className="flex-1 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition text-sm"
          >
            View
          </button>
          <button
            onClick={() => onDelete(playlist._id)}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>

      {showModal && playlistDetails && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className="bg-purple-900 rounded-2xl p-6 w-full max-w-2xl my-8">
            <h2 className="text-2xl font-bold text-white mb-2">{playlistDetails.name}</h2>
            {playlistDetails.description && (
              <p className="text-purple-200 mb-4">{playlistDetails.description}</p>
            )}
            <p className="text-purple-300 text-sm mb-6">{playlistDetails.songs.length} songs</p>

            {playlistDetails.songs.length === 0 ? (
              <p className="text-purple-200 text-center py-8">No songs in this playlist yet</p>
            ) : (
              <div className="space-y-2 max-h-96 overflow-y-auto mb-4">
                {playlistDetails.songs.map((song, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 p-3 bg-white/10 hover:bg-white/20 rounded-lg"
                  >
                    <img
                      src={song.image || 'https://via.placeholder.com/50'}
                      alt={song.songName}
                      className="w-12 h-12 rounded object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-white font-medium truncate">{song.songName}</p>
                      <p className="text-purple-200 text-sm truncate">{song.artist}</p>
                    </div>
                    <button
                      onClick={() => playSong({
                        id: song.songId,
                        name: song.songName,
                        artist: song.artist,
                        preview_url: song.preview_url,
                        image: song.image
                      })}
                      className="p-2 bg-purple-600 hover:bg-purple-700 rounded-lg transition"
                    >
                      <Play size={16} className="text-white" fill="white" />
                    </button>
                    <button
                      onClick={() => handleRemoveSong(song.songId)}
                      className="p-2 bg-red-600 hover:bg-red-700 rounded-lg transition"
                    >
                      <Trash2 size={16} className="text-white" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            <button
              onClick={() => setShowModal(false)}
              className="w-full px-4 py-3 bg-white/10 hover:bg-white/20 text-white rounded-lg transition"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  )
}