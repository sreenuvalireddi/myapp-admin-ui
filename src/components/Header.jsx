import React from 'react'
import { Link } from 'react-router-dom'
import { useShops } from '../context/ShopsContext'

export default function Header() {
  const { cartItems } = useShops()

  return (
    <header className="site-header">
      <div className="container">
        <div className="brand">MyApp</div>
        <nav className="nav">
          <Link to="/home">Home</Link>
          <a href="#">About</a>
          <a href="#">Help</a>
          <Link to="/cart" style={{ position: 'relative', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
            🛒 Cart
            {cartItems.length > 0 && (
              <span style={{
                position: 'absolute',
                top: '-8px',
                right: '-8px',
                background: '#ef4444',
                color: '#fff',
                borderRadius: '50%',
                width: '20px',
                height: '20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '12px',
                fontWeight: 'bold',
              }}>
                {cartItems.length}
              </span>
            )}
          </Link>
        </nav>
      </div>
    </header>
  )
}
