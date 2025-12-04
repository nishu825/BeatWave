// ============================================
// FILE: frontend/src/components/MusicPlayer.jsx
// Bottom music player component
// ============================================

import { useState, useEffect } from 'react'
import { usePlayer } from '../context/PlayerContext'
import { Play, Pause, Volume2 } from 'lucide-react'

export default function MusicPlayer() {
  const { currentSong, isPlaying, togglePlay, audioRef } = usePlayer()
  const [progress, setProgress] = useState(0)
  const [volume, setVolume] = useState(100)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const updateProgress = () => {
      const percent = (audio.currentTime / audio.duration) * 100
      setProgress(percent || 0)
    }

    audio.addEventListener('timeupdate', updateProgress)
    return () => audio.removeEventListener('timeupdate', updateProgress)
  }, [audioRef])

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100
    }
  }, [volume, audioRef])

  if (!currentSong) return null

  const formatTime = (seconds) => {
    if (isNaN(seconds)) return '0:00'
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-purple-900/95 backdrop-blur-lg border-t border-purple-700/50 p-4 z-50">
      <div className="max-w-7xl mx-auto">
        {/* Progress Bar */}
        <div className="mb-3">
          <div className="h-1 bg-purple-700/30 rounded-full overflow-hidden">
            <div
              className="h-full bg-purple-500 transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div className="flex items-center justify-between gap-4">
          {/* Song Info */}
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <img
              src={currentSong.image || 'https://via.placeholder.com/50'}
              alt={currentSong.name}
              className="w-12 h-12 rounded object-cover"
            />
            <div className="min-w-0">
              <p className="text-white font-medium truncate">{currentSong.name}</p>
              <p className="text-purple-200 text-sm truncate">{currentSong.artist}</p>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-4">
            <span className="text-purple-200 text-sm">
              {audioRef.current ? formatTime(audioRef.current.currentTime) : '0:00'}
            </span>
            <button
              onClick={togglePlay}
              className="bg-purple-600 hover:bg-purple-700 p-3 rounded-full transition"
            >
              {isPlaying ? (
                <Pause className="text-white" size={24} fill="white" />
              ) : (
                <Play className="text-white" size={24} fill="white" />
              )}
            </button>
            <span className="text-purple-200 text-sm">
              {audioRef.current ? formatTime(audioRef.current.duration) : '0:30'}
            </span>
          </div>

          {/* Volume */}
          <div className="flex items-center gap-2 flex-1 justify-end">
            <Volume2 className="text-purple-300" size={20} />
            <input
              type="range"
              min="0"
              max="100"
              value={volume}
              onChange={(e) => setVolume(Number(e.target.value))}
              className="w-24 accent-purple-600"
            />
          </div>
        </div>
      </div>
    </div>
  )
}