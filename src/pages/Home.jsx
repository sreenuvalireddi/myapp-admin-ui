import React, { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { useShops } from '../context/ShopsContext'
import { fetchShops } from '../api'

export default function Home() {
  const { setCurrentShop } = useShops()
  const navigate = useNavigate()

  const [shops, setShops] = useState([])
  const [selectedShops, setSelectedShops] = useState([])
  const [query, setQuery] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    let mounted = true
    setLoading(true)
    fetchShops()
      .then((data) => {
        if (!mounted) return
        // map external shape to app shape
        const mapped = data.map((s) => ({ shopId: s.id, shopName: s.name, shopLocation: s.location || s.address || '' }))
        setShops(mapped)
      })
      .catch((err) => {
        console.error('Failed to load shops', err)
        if (mounted) setError(err.message || 'Failed to load shops')
      })
      .finally(() => mounted && setLoading(false))
    return () => {
      mounted = false
    }
  }, [])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return shops
    return shops.filter((shop) => shop.shopName.toLowerCase().includes(q) || shop.shopLocation.toLowerCase().includes(q))
  }, [query, shops])

  return (
    <div className="home-root">
      <Header />

      <main className="home-main">
        <section className="hero">
          <h2>Welcome to MyApp</h2>
          <p className="lead">Browse and select shops</p>

          <div className="home-controls">
            <input
              className="search"
              placeholder="Search shops..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              aria-label="Search shops"
            />
          </div>
        </section>

        <section className="content-cards">
          <h3 style={{ gridColumn: '1 / -1', marginBottom: 10 }}>
            {query ? 'Search results' : 'Available shops'}
          </h3>

          {loading && <div style={{ gridColumn: '1 / -1' }}>Loading shops…</div>}
          {error && <div style={{ gridColumn: '1 / -1', color: 'red' }}>{error}</div>}

          {filtered.map((shop) => (
            <div
              key={shop.shopId}
              className="card"
              style={{ cursor: 'pointer' }}
              onClick={() => {
                setSelectedShops((s) => [...s, shop])
              }}
            >
              <strong>{shop.shopName}</strong>
              <div style={{ marginTop: 8, fontSize: '14px', color: '#6b7280' }}>{shop.shopLocation}</div>
              <div style={{ marginTop: 8 }}>
                <button
                  onClick={(e) => {
                    // prevent card onClick from also firing
                    e.stopPropagation()
                    setCurrentShop(shop)
                    navigate('/items')
                  }}
                  style={{
                    padding: '6px 10px',
                    background: '#2563eb',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontSize: '13px'
                  }}
                >
                  View items
                </button>
              </div>
            </div>
          ))}

          {selectedShops.length > 0 && (
            <>
              <h3 style={{ gridColumn: '1 / -1', marginTop: 20, marginBottom: 10 }}>
                Selected shops ({selectedShops.length})
              </h3>
              {selectedShops.map((shop) => (
                <div key={shop.shopId} className="card">
                  <strong>{shop.shopName}</strong>
                  <div style={{ marginTop: 8, fontSize: '14px', color: '#6b7280' }}>{shop.shopLocation}</div>
                  <button
                    onClick={() => setSelectedShops((s) => s.filter((x) => x.shopId !== shop.shopId))}
                    style={{
                      marginTop: 8,
                      padding: '4px 8px',
                      background: '#ef4444',
                      color: '#fff',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      fontSize: '12px',
                    }}
                  >
                    Remove
                  </button>
                </div>
              ))}
            </>
          )}
        </section>
      </main>

      <Footer />
    </div>
  )
}
