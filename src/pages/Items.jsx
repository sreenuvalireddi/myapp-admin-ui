import React, { useMemo, useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { useShops } from '../context/ShopsContext'

export default function Items() {
  const { currentShop, cartItems, setCartItems } = useShops()
  const [itemQuantities, setItemQuantities] = useState({})
  const masterItems = [
    { itemId: 1, itemName: 'Apples', itemCategory: 'Fruits', price: 3.99, quantity: 10, image: 'https://images.unsplash.com/photo-1560806887-1295a3f48caf?w=300&q=80' },
    { itemId: 2, itemName: 'Bananas', itemCategory: 'Fruits', price: 2.49, quantity: 15, image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=300&q=80' },
    { itemId: 3, itemName: 'Carrots', itemCategory: 'Vegetables', price: 1.99, quantity: 20, image: 'https://images.unsplash.com/photo-1584270354949-c1db897371f5?w=300&q=80' },
    { itemId: 4, itemName: 'Broccoli', itemCategory: 'Vegetables', price: 2.99, quantity: 12, image: 'https://images.unsplash.com/photo-1591614689519-30aa1d1a23d8?w=300&q=80' },
    { itemId: 5, itemName: 'Milk', itemCategory: 'Dairy', price: 3.49, quantity: 8, image: 'https://images.unsplash.com/photo-1563056169-519f756eea0d?w=300&q=80' },
    { itemId: 6, itemName: 'Cheese', itemCategory: 'Dairy', price: 5.99, quantity: 6, image: 'https://images.unsplash.com/photo-1577003833154-a82a3a92f657?w=300&q=80' },
    { itemId: 7, itemName: 'Bread', itemCategory: 'Bakery', price: 2.29, quantity: 14, image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=300&q=80' },
    { itemId: 8, itemName: 'Pasta', itemCategory: 'Grains', price: 1.49, quantity: 25, image: 'https://images.unsplash.com/photo-1612874742237-6526221fcf2a?w=300&q=80' },
    { itemId: 9, itemName: 'Rice', itemCategory: 'Grains', price: 4.99, quantity: 18, image: 'https://images.unsplash.com/photo-1584868910620-b0b10f8e9e99?w=300&q=80' },
    { itemId: 10, itemName: 'Chicken Breast', itemCategory: 'Meat', price: 8.99, quantity: 5, image: 'https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=300&q=80' },
    { itemId: 11, itemName: 'Ground Beef', itemCategory: 'Meat', price: 7.99, quantity: 7, image: 'https://images.unsplash.com/photo-1555939594-58d7cb561839?w=300&q=80' },
    { itemId: 12, itemName: 'Salmon', itemCategory: 'Seafood', price: 12.99, quantity: 4, image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=300&q=80' },
    { itemId: 13, itemName: 'Shrimp', itemCategory: 'Seafood', price: 9.99, quantity: 3, image: 'https://images.unsplash.com/photo-1599599810694-b5ac4dd64asda?w=300&q=80' },
    { itemId: 14, itemName: 'Olive Oil', itemCategory: 'Oils', price: 6.99, quantity: 9, image: 'https://images.unsplash.com/photo-1474518285347-538f71f1e0d7?w=300&q=80' },
    { itemId: 15, itemName: 'Salt', itemCategory: 'Seasonings', price: 0.99, quantity: 30, image: 'https://images.unsplash.com/photo-1599599810694-b5ac4dd64asda?w=300&q=80' },
    { itemId: 16, itemName: 'Black Pepper', itemCategory: 'Seasonings', price: 1.99, quantity: 20, image: 'https://images.unsplash.com/photo-1596040995905-e1f7fe0a4a6a?w=300&q=80' },
    { itemId: 17, itemName: 'Tomato Sauce', itemCategory: 'Condiments', price: 2.49, quantity: 22, image: 'https://images.unsplash.com/photo-1599599810694-b5ac4dd64asda?w=300&q=80' },
    { itemId: 18, itemName: 'Yogurt', itemCategory: 'Dairy', price: 1.99, quantity: 16, image: 'https://images.unsplash.com/photo-1488477181946-6428a0291840?w=300&q=80' },
    { itemId: 19, itemName: 'Orange Juice', itemCategory: 'Beverages', price: 3.99, quantity: 11, image: 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=300&q=80' },
    { itemId: 20, itemName: 'Coffee', itemCategory: 'Beverages', price: 7.49, quantity: 13, image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b3f7?w=300&q=80' },
  ]

  const [query, setQuery] = useState('')

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return masterItems
    return masterItems.filter(
      (item) => item.itemName.toLowerCase().includes(q) || item.itemCategory.toLowerCase().includes(q)
    )
  }, [query])

  return (
    <div className="home-root">
      <Header />

      <main className="home-main">
        <section className="hero">
          <h2>{currentShop ? currentShop.shopName : 'Items'}</h2>
          <p className="lead">Browse and select items</p>

          <div className="home-controls">
            <input
              className="search"
              placeholder="Search items..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              aria-label="Search items"
            />
          </div>
        </section>

        <section className="content-cards">
          <h3 style={{ gridColumn: '1 / -1', marginBottom: 10 }}>
            {query ? 'Search results' : 'Available items'}
          </h3>
          {filtered.map((item) => (
            <div
              key={item.itemId}
              className="card"
            >
              <img 
                src={item.image} 
                alt={item.itemName} 
                style={{ width: '100%', height: '150px', objectFit: 'cover', borderRadius: '4px' }}
              />
              <strong style={{ marginTop: 10, display: 'block' }}>{item.itemName}</strong>
              <div style={{ marginTop: 8, fontSize: '14px', color: '#6b7280' }}>{item.itemCategory}</div>
              <div style={{ marginTop: 8, display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
                <span>Price: ${item.price.toFixed(2)}</span>
                <span>Qty: {item.quantity}</span>
              </div>
              {itemQuantities[item.itemId] ? (
                <div style={{
                  marginTop: 8,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  padding: '6px',
                  background: '#f3f4f6',
                  borderRadius: '4px'
                }}>
                  <button
                    onClick={() => {
                      const newQty = itemQuantities[item.itemId] - 1
                      if (newQty === 0) {
                        const newQuantities = { ...itemQuantities }
                        delete newQuantities[item.itemId]
                        setItemQuantities(newQuantities)
                        setCartItems((s) => s.filter(cartItem => cartItem.itemId !== item.itemId))
                      } else {
                        setItemQuantities((prev) => ({ ...prev, [item.itemId]: newQty }))
                        setCartItems((s) => s.map(cartItem => 
                          cartItem.itemId === item.itemId 
                            ? { ...cartItem, cartQuantity: newQty }
                            : cartItem
                        ))
                      }
                    }}
                    style={{
                      padding: '4px 8px',
                      background: '#ef4444',
                      color: '#fff',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      fontSize: '14px',
                      fontWeight: 'bold',
                      width: '32px',
                      height: '32px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    −
                  </button>
                  <span style={{ fontSize: '16px', fontWeight: 'bold', minWidth: '30px', textAlign: 'center' }}>
                    {itemQuantities[item.itemId]}
                  </span>
                  <button
                    onClick={() => {
                      const newQty = (itemQuantities[item.itemId] || 0) + 1
                      setItemQuantities((prev) => ({ ...prev, [item.itemId]: newQty }))
                      setCartItems((s) => s.map(cartItem => 
                        cartItem.itemId === item.itemId 
                          ? { ...cartItem, cartQuantity: newQty }
                          : cartItem
                      ))
                    }}
                    style={{
                      padding: '4px 8px',
                      background: '#10b981',
                      color: '#fff',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      fontSize: '14px',
                      fontWeight: 'bold',
                      width: '32px',
                      height: '32px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    +
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => {
                    setItemQuantities((prev) => ({ ...prev, [item.itemId]: 1 }))
                    setCartItems((s) => [...s, { ...item, cartQuantity: 1 }])
                  }}
                  style={{
                    marginTop: 8,
                    padding: '6px 12px',
                    background: '#2563eb',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontSize: '13px',
                    fontWeight: '500',
                    width: '100%',
                  }}
                >
                  Add to Cart
                </button>
              )}
            </div>
          ))}
        </section>
      </main>

      <Footer />
    </div>
  )
}
