import React, { useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { useShops } from '../context/ShopsContext'

export default function Home() {
  const { setCurrentShop } = useShops()
  const navigate = useNavigate()
  const masterShops = [
    { shopId: 1, shopName: 'Fresh Mart', shopLocation: '123 Main St, Downtown' },
    { shopId: 2, shopName: 'QuickStop', shopLocation: '456 Oak Ave, Midtown' },
    { shopId: 3, shopName: 'Gourmet Groceries', shopLocation: '789 Pine Rd, Uptown' },
    { shopId: 4, shopName: 'Corner Store', shopLocation: '321 Elm St, Eastside' },
    { shopId: 5, shopName: 'Budget Bazaar', shopLocation: '654 Maple Dr, Westside' },
    { shopId: 6, shopName: 'Local Market', shopLocation: '987 Cedar Ln, Suburbs' },
    { shopId: 7, shopName: 'Premium Plus', shopLocation: '147 Birch Ct, Downtown' },
    { shopId: 8, shopName: 'Value Shop', shopLocation: '258 Willow Way, Midtown' },
    { shopId: 9, shopName: 'Express Mart', shopLocation: '369 Ash Blvd, Uptown' },
    { shopId: 10, shopName: 'Super Save', shopLocation: '741 Spruce Pl, Harbor' },
  ]

  const [selectedShops, setSelectedShops] = useState([])
  const [query, setQuery] = useState('')

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return masterShops
    return masterShops.filter(
      (shop) => shop.shopName.toLowerCase().includes(q) || shop.shopLocation.toLowerCase().includes(q)
    )
  }, [query])



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
              aria-label="Search items"
            />
          </div>
        </section>

        <section className="content-cards">
          <h3 style={{ gridColumn: '1 / -1', marginBottom: 10 }}>
            {query ? 'Search results' : 'Available shops'}
          </h3>
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
