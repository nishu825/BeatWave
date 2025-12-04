import { useState } from 'react'
import { searchSongs } from '../utils/api'
import SongCard from '../components/SongCard'
import { Search as SearchIcon } from 'lucide-react'

export default function Search() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [searched, setSearched] = useState(false)

  const handleSearch = async (e) => {
    e.preventDefault()
    if (!query.trim()) return

    setLoading(true)
    setSearched(true)

    try {
      const response = await searchSongs(query)
      setResults(response.data.tracks)
    } catch (error) {
      console.error('Search error:', error)
      alert('Failed to search songs')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-4xl font-bold text-white mb-8">Search Music</h1>

      <form onSubmit={handleSearch} className="mb-8">
        <div className="flex gap-3">
          <div className="flex-1 relative">
            <SearchIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 text-purple-300" size={20} />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for songs, artists, albums..."
              className="w-full pl-12 pr-4 py-3 bg-white/10 border border-purple-300/30 rounded-lg text-white placeholder-purple-300/50 focus:outline-none focus:border-purple-400"
            />
          </div>
          <button
            type="submit"
            className="px-8 py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg transition"
          >
            Search
          </button>
        </div>
      </form>

      {loading && (
        <div className="text-center text-white text-xl">Searching...</div>
      )}

      {!loading && searched && results.length === 0 && (
        <div className="text-center text-purple-200 text-xl">
          No results found for "{query}"
        </div>
      )}

      {!loading && results.length > 0 && (
        <div>
          <p className="text-purple-200 mb-6">Found {results.length} results</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {results.map((song) => (
              <SongCard key={song.id} song={song} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}