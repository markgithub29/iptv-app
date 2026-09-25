import React, { useMemo, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { Play, Search, Settings, Tv, Heart, Clock3, ChevronRight, Volume2, Maximize, Radio } from 'lucide-react'
import './styles.css'

const channels = [
  { id: 1, name: 'Global News', category: 'News', logo: 'GN', color: '#ef4444', live: true },
  { id: 2, name: 'World Sports', category: 'Sports', logo: 'WS', color: '#3b82f6', live: true },
  { id: 3, name: 'Cinema One', category: 'Movies', logo: 'C1', color: '#a855f7', live: true },
  { id: 4, name: 'Nature Life', category: 'Documentary', logo: 'NL', color: '#10b981', live: true },
  { id: 5, name: 'Kids Planet', category: 'Kids', logo: 'KP', color: '#f59e0b', live: false },
  { id: 6, name: 'Music Box', category: 'Music', logo: 'MB', color: '#ec4899', live: false },
  { id: 7, name: 'Tech Daily', category: 'Technology', logo: 'TD', color: '#06b6d4', live: false },
  { id: 8, name: 'Travel HD', category: 'Travel', logo: 'TH', color: '#84cc16', live: false },
]

function App() {
  const [selected, setSelected] = useState(channels[0])
  const [category, setCategory] = useState('All')
  const [query, setQuery] = useState('')
  const [favorites, setFavorites] = useState([])
  const categories = ['All', ...new Set(channels.map((channel) => channel.category))]

  const filteredChannels = useMemo(() => channels.filter((channel) => {
    const matchesCategory = category === 'All' || channel.category === category
    const matchesQuery = channel.name.toLowerCase().includes(query.toLowerCase())
    return matchesCategory && matchesQuery
  }), [category, query])

  const toggleFavorite = (id) => setFavorites((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id])

  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="brand"><div className="brand-mark"><Tv size={22} /></div><span>Stream<span className="accent">Box</span></span></div>
        <nav><button className="nav-link active">Live TV</button><button className="nav-link">Guide</button><button className="nav-link">Favorites</button></nav>
        <div className="top-actions"><label className="search"><Search size={18} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search channels" /></label><button className="icon-button" aria-label="Settings"><Settings size={20} /></button></div>
      </header>

      <main>
        <section className="hero">
          <div className="video-frame">
            <div className="video-placeholder"><div className="pulse"><Play fill="currentColor" size={30} /></div><span>Now playing</span></div>
            <div className="video-overlay"><div><span className="live-badge"><span /> LIVE</span><h1>{selected.name}</h1><p>{selected.category} · HD</p></div><div className="video-controls"><Volume2 size={20} /><div className="progress"><span /></div><Maximize size={20} /></div></div>
          </div>
          <aside className="now-playing"><div className="eyebrow"><Radio size={15} /> ON AIR NOW</div><div className="selected-logo" style={{ background: selected.color }}>{selected.logo}</div><h2>{selected.name}</h2><p>Live programming is available now</p><button className="primary-button" onClick={() => toggleFavorite(selected.id)}><Heart size={17} fill={favorites.includes(selected.id) ? 'currentColor' : 'none'} />{favorites.includes(selected.id) ? 'Saved to favorites' : 'Add to favorites'}</button><div className="program"><span>Next up</span><strong>Evening Highlights</strong><small>Today · 8:30 PM</small></div></aside>
        </section>

        <section className="channel-section"><div className="section-heading"><div><h2>Live channels</h2><p>Choose something to watch</p></div><button className="see-all">View guide <ChevronRight size={17} /></button></div><div className="categories">{categories.map((item) => <button key={item} className={category === item ? 'category active' : 'category'} onClick={() => setCategory(item)}>{item}</button>)}</div><div className="channel-grid">{filteredChannels.map((channel) => <article className={selected.id === channel.id ? 'channel-card selected' : 'channel-card'} key={channel.id} onClick={() => setSelected(channel)}><div className="card-top"><div className="channel-logo" style={{ background: channel.color }}>{channel.logo}</div><button className="favorite-button" onClick={(event) => { event.stopPropagation(); toggleFavorite(channel.id) }}><Heart size={17} fill={favorites.includes(channel.id) ? 'currentColor' : 'none'} /></button></div><h3>{channel.name}</h3><div className="card-meta"><span>{channel.category}</span>{channel.live && <span className="live-text"><span /> Live</span>}</div></article>)}</div></section>
        <section className="continue"><div className="section-heading"><div><h2>Recently watched</h2><p>Pick up where you left off</p></div></div><div className="recent-row"><div className="recent-card"><div className="recent-art"><Clock3 size={28} /></div><div><strong>Morning Briefing</strong><span>Global News · 42 min left</span></div><Play size={18} /></div><div className="recent-card"><div className="recent-art blue"><Clock3 size={28} /></div><div><strong>Championship Live</strong><span>World Sports · 18 min left</span></div><Play size={18} /></div></div></section>
      </main>
      <footer><span>StreamBox IPTV</span><span>Use arrow keys to navigate · Enter to select</span><span>© 2024</span></footer>
    </div>
  )
}

createRoot(document.getElementById('root')).render(<React.StrictMode><App /></React.StrictMode>)
