import { createContext, useContext, useState, useRef } from 'react'

const PlayerContext = createContext()

export const usePlayer = () => {
  const context = useContext(PlayerContext)
  if (!context) {
    throw new Error('usePlayer must be used within PlayerProvider')
  }
  return context
}

export const PlayerProvider = ({ children }) => {
  const [currentSong, setCurrentSong] = useState(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef(null)

  const playSong = (song) => {
    if (!song.preview_url) {
      alert('Preview not available for this song')
      return
    }
    
    setCurrentSong(song)
    setIsPlaying(true)
    
    if (audioRef.current) {
      audioRef.current.src = song.preview_url
      audioRef.current.play()
    }
  }

  const pauseSong = () => {
    setIsPlaying(false)
    if (audioRef.current) {
      audioRef.current.pause()
    }
  }

  const resumeSong = () => {
    setIsPlaying(true)
    if (audioRef.current) {
      audioRef.current.play()
    }
  }

  const togglePlay = () => {
    if (isPlaying) {
      pauseSong()
    } else {
      resumeSong()
    }
  }

  return (
    <PlayerContext.Provider value={{
      currentSong,
      isPlaying,
      playSong,
      pauseSong,
      resumeSong,
      togglePlay,
      audioRef
    }}>
      {children}
      <audio ref={audioRef} />
    </PlayerContext.Provider>
  )
}