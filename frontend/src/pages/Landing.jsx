import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { CreditCard, TrendingUp, Users, Shield, Play, ChevronRight } from 'lucide-react'
import Modal from '../components/Modal'

export default function Landing(){
  const [isDemoOpen, setIsDemoOpen] = React.useState(false)
  const navigate = useNavigate()

  React.useEffect(() => {
    if (localStorage.getItem('token')) navigate('/dashboard')
  }, [navigate])

  return (
    <div className="landing-root">
      <header className="lp-nav">
        <div className="container-landing">
          <div className="lp-nav-inner">
            <div className="lp-logo">MoneyManager</div>

            <nav className="lp-links">
              <a href="#features">Features</a>
              <a href="#pricing">Pricing</a>
              <a href="#partners">Partners</a>
              <a href="#about">About</a>
              <a href="#contact">Contact</a>
            </nav>

            <div className="lp-actions">
              <Link to="/login" className="btn btn-outline-dark">Login</Link>
              <Link to="/register" className="btn btn-primary">Get Started</Link>
            </div>
          </div>
        </div>
      </header>

      <main>
        <section className="hero">
          <div className="container-landing">
            <div className="hero-inner">
              <div className="hero-left">
                <div className="eyebrow">Trusted Finance • Premium Insights</div>
                <h1 className="hero-head">THE BEST SOLUTION FOR YOUR BUSINESS FINANCE</h1>
                <p className="hero-sub">Manage income, expenses and budgets with ease — beautiful analytics, simple automation, and real-time reporting for teams and founders.</p>

                <div className="hero-cta">
                  <Link to="/register" className="btn btn-primary btn-lg">Create Account</Link>
                  <button onClick={()=>setIsDemoOpen(true)} className="btn btn-outline-light btn-lg" style={{display:'inline-flex',alignItems:'center',gap:8}}>
                    <Play size={16}/> Watch Demo
                  </button>
                </div>

                <div className="partners" id="partners">
                  <div className="muted">Trusted by leading companies</div>
                  <div className="partner-logos">
                    <div className="partner">Acme</div>
                    <div className="partner">FinCo</div>
                    <div className="partner">Ledger</div>
                    <div className="partner">Orbit</div>
                  </div>
                </div>
              </div>

              <aside className="hero-right" aria-hidden={true}>
                <div className="preview-card">
                  <div className="preview-header">
                    <div>
                      <div className="preview-muted">Overview</div>
                      <div className="preview-title">Business Dashboard</div>
                    </div>
                    <div className="preview-muted">Month</div>
                  </div>

                  <div className="preview-body">
                    <div className="mini-cards">
                      <div className="mini card">
                        <div className="preview-muted">Income</div>
                        <div className="mini-metric income">$12,450</div>
                      </div>

                      <div className="mini card">
                        <div className="preview-muted">Expense</div>
                        <div className="mini-metric expense">$4,210</div>
                      </div>

                      <div className="mini card">
                        <div className="preview-muted">Balance</div>
                        <div className="mini-metric">$8,240</div>
                      </div>
                    </div>

                    <div className="preview-chart">
                      <div style={{height:140,display:'flex',alignItems:'center',justifyContent:'center',color:'#93C5FD',fontSize:12}}>Chart preview</div>
                    </div>

                    <div className="preview-features">
                      <div><Shield size={14}/> Secure data</div>
                      <div><Users size={14}/> Team-ready</div>
                      <div><TrendingUp size={14}/> Real-time reports</div>
                    </div>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </section>

        <section className="features" id="features">
          <div className="container-landing">
            <div className="section-header">
              <h2>Powerful Features</h2>
              <p>Everything you need to manage your finances effectively</p>
            </div>
            <div className="features-grid">
              <div className="feature-card card">
                <div className="feature-icon">
                  <CreditCard size={24}/>
                </div>
                <h3 className="feature-title">Intuitive Ledger</h3>
                <p className="feature-desc">Track income & expenses with easy categorization and receipts.</p>
              </div>

              <div className="feature-card card">
                <div className="feature-icon">
                  <TrendingUp size={24}/>
                </div>
                <h3 className="feature-title">Insights & Reports</h3>
                <p className="feature-desc">Beautiful charts and exportable reports for stakeholders.</p>
              </div>

              <div className="feature-card card">
                <div className="feature-icon">
                  <Users size={24}/>
                </div>
                <h3 className="feature-title">Team Access</h3>
                <p className="feature-desc">Invite team members and control permissions for financial roles.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="cta-dark" id="pricing">
          <div className="container-landing">
            <div className="cta-inner">
              <div className="cta-content">
                <h2 className="cta-title">Ready to simplify your finances?</h2>
                <p className="cta-subtitle">Start a free trial — no credit card required. Get instant access to all features.</p>
              </div>
              <div className="cta-action">
                <Link to="/register" className="btn btn-primary btn-lg" style={{display:'inline-flex',alignItems:'center',gap:8}}>
                  Start Free
                  <ChevronRight size={18}/>
                </Link>
              </div>
            </div>
          </div>
        </section>

        <Modal isOpen={isDemoOpen} onClose={()=>setIsDemoOpen(false)} title="Watch demo">
          <div style={{width:'100%',height:300,display:'flex',alignItems:'center',justifyContent:'center',background:'#0f172a',color:'#fff',borderRadius:8}}>
            <div>
              <div style={{fontWeight:800,fontSize:20,marginBottom:8}}>Live demo</div>
              <div className="muted" style={{color:'#d1fae5'}}>This is a short preview of the dashboard UI.</div>
            </div>
          </div>
        </Modal>
      </main>

      <footer className="lp-footer">
        <div className="container-landing">
          <div className="footer-content">
            <div className="muted">© {new Date().getFullYear()} MoneyManager. All rights reserved.</div>
            <div className="muted">Made with ♥ by the MoneyManager team</div>
          </div>
        </div>
      </footer>
    </div>
  )
}
