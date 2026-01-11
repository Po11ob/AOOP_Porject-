import React from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'

export default function Layout({children}){
  const navigate = useNavigate()
  const loc = useLocation()
  const logout = ()=>{ localStorage.removeItem('token'); navigate('/login') }
  return (
    <div className="layout-root">
      <aside className="sidebar">
        <div className="brand">MoneyManager</div>
        <nav>
          <Link to="/" className={loc.pathname === '/' ? 'active' : ''}>Dashboard</Link>
          <Link to="/transactions" className={loc.pathname.startsWith('/transactions') ? 'active' : ''}>Transactions</Link>
          <Link to="/categories" className={loc.pathname.startsWith('/categories') ? 'active' : ''}>Categories</Link>
          <Link to="/profile" style={{marginTop:12,display:'block'}}>Profile</Link>
        </nav>
        <div style={{marginTop:20}}>
          <button className="btn btn-outline" onClick={logout}>Logout</button>
        </div>
      </aside>

      <div style={{flex:1,display:'flex',flexDirection:'column'}}>
        <div className="topbar">
          <div style={{display:'flex',alignItems:'center',gap:12}}>
            <div style={{fontWeight:800}}>MoneyManager</div>
          </div>
          <div style={{marginLeft:'auto',display:'flex',alignItems:'center',gap:12}}>
            <div className="muted">hello@example.com</div>
          </div>
        </div>

        <div className="content-area">
          {children}
        </div>
      </div>
    </div>
  )
}
