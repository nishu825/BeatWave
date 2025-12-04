import { useState, useEffect } from 'react'
import { getFeaturedSongs, getRecommendations } from '../utils/api'
import SongCard from '../components/SongCard'
import { TrendingUp, Sparkles } from 'lucide-react'

export default function Home() {
  const [featuredSongs, setFeaturedSongs] = useState([])
  const [recommendations, setRecommendations] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchSongs()
  }, [])

  const fetchSongs = async () => {
    try {
      const [featured, recommended] = await Promise.all([
        getFeaturedSongs(),
        getRecommendations('pop,rock,indie')
      ])
      setFeaturedSongs(featured.data.tracks)
      setRecommendations(recommended.data.tracks)
    } catch (error) {
      console.error('Error fetching songs:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-white text-xl">Loading songs...</div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-4xl font-bold text-white mb-8">Discover Music</h1>

      {/* Featured Songs */}
      <section className="mb-12">
        <div className="flex items-center gap-2 mb-6">
          <TrendingUp className="text-purple-400" size={24} />
          <h2 className="text-2xl font-bold text-white">Trending Now</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {featuredSongs.map((song) => (
            <SongCard key={song.id} song={song} />
          ))}
        </div>
      </section>

      {/* Recommendations */}
      <section>
        <div className="flex items-center gap-2 mb-6">
          <Sparkles className="text-purple-400" size={24} />
          <h2 className="text-2xl font-bold text-white">Recommended for You</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {recommendations.map((song) => (
            <SongCard key={song.id} song={song} />
          ))}
        </div>
      </section>
    </div>
  )
}