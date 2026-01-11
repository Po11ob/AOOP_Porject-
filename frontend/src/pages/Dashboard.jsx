import React, {useEffect, useState} from 'react'
import Layout from '../components/Layout'
import Card from '../components/Card'
import Modal from '../components/Modal'
import api from '../api'
import toast from 'react-hot-toast'
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts'

const COLORS = ['#2563EB','#FB7185','#10B981','#F59E0B']

export default function Dashboard(){
  const [summary,setSummary]=useState({income:0,expense:0,balance:0})
  const [categories,setCategories]=useState([])
  const [categoryList,setCategoryList]=useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(()=>{
    async function load(){
      try{
        const tx = await api.get('/transactions')
        const data = tx.data || []
        const income = data.filter(d=>d.type==='INCOME').reduce((s,v)=>s+v.amount,0)
        const expense = data.filter(d=>d.type==='EXPENSE').reduce((s,v)=>s+v.amount,0)
        const byCat = {}
        data.forEach(d=>{ const name = d.category?.name || 'Uncategorized'; byCat[name]=(byCat[name]||0)+d.amount })
        const cats = Object.entries(byCat).map(([name,value])=>({name,value})).sort((a,b)=>b.value-a.value)
        setCategories(cats)
        // fetch full category list for modal
        const cRes = await api.get('/categories')
        setCategoryList(cRes.data || [])
        setSummary({income,expense,balance:income-expense})
      }catch(e){ }
    }
    load()
  },[])

  return (
    <>
    <Layout>
      <div className="container">
        <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:14}}>
          <div style={{display:'flex',alignItems:'center',gap:12}}>
            <h2 style={{margin:0}}>Overview</h2>
            <div className="muted">monthly summary</div>
          </div>
          <div>
            <button className="btn btn-primary" onClick={()=>setIsModalOpen(true)}>Add Transaction</button>
          </div>
        </div>
        <div className="summary-row">
          <div className="summary-card card">
            <div className="card-title">Total Income</div>
            <div className="metric income">${summary.income.toFixed(2)}</div>
            <div className="muted">This month</div>
          </div>

          <div className="summary-card card">
            <div className="card-title">Total Expense</div>
            <div className="metric expense">${summary.expense.toFixed(2)}</div>
            <div className="muted">This month</div>
          </div>

          <div className="summary-card card">
            <div className="card-title">Current Balance</div>
            <div className="metric">${summary.balance.toFixed(2)}</div>
            <div className="muted">Available</div>
          </div>
        </div>

        <div className="charts-row">
          <div className="card chart-card">
            <div className="card-title">Income vs Expense</div>
            <div style={{height:260}}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={[{name:'Income',value:summary.income},{name:'Expense',value:summary.expense}]}> 
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#2563EB" isAnimationActive={true} animationDuration={800} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="card chart-card">
            <div className="card-title">Category Breakdown</div>
            <div style={{display:'flex',gap:12}}>
              <div style={{flex:1, height:260}}>
                <ResponsiveContainer>
                  <PieChart>
                    <Pie data={categories} dataKey="value" nameKey="name" outerRadius={90} innerRadius={40} paddingAngle={4} isAnimationActive={true} animationDuration={900}>
                      {categories.map((entry, idx) => (
                        <Cell key={`cell-${idx}`} fill={COLORS[idx % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value)=>`$${(value||0).toFixed(2)}`} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div style={{width:220}}>
                <h4 className="muted" style={{marginBottom:8}}>Top Categories</h4>
                {(() => {
                  const total = categories.reduce((s,c)=>s+(c.value||0),0) || 1
                  return categories.slice(0,5).map((c,i)=>{
                    const pct = ((c.value/total)*100).toFixed(1)
                    return (
                      <div key={c.name} style={{display:'flex',alignItems:'center',gap:8,marginBottom:8}}>
                        <span className="legend-swatch" style={{background:COLORS[i%COLORS.length]}} />
                        <div style={{flex:1}}>
                          <div style={{fontWeight:600}}>{c.name}</div>
                          <div className="muted">{pct}% • ${c.value?.toFixed(2) || '0.00'}</div>
                        </div>
                      </div>
                    )
                  })
                })()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
      <Modal isOpen={isModalOpen} onClose={()=>setIsModalOpen(false)} title="Add Transaction">
        <form onSubmit={async e=>{
            e.preventDefault();
            const fd = new FormData(e.target);
            const payload = {
              amount: parseFloat(fd.get('amount')) || 0,
              description: fd.get('description') || '',
              date: fd.get('date') || new Date().toISOString().slice(0,10),
              type: fd.get('type') || 'EXPENSE',
              category: fd.get('category') ? { id: parseInt(fd.get('category')) } : null
            }
            try{
              await api.post('/transactions', payload)
              toast.success('Transaction created')
              setIsModalOpen(false)
              // reload dashboard data
              const tx = await api.get('/transactions')
              const data = tx.data || []
              const income = data.filter(d=>d.type==='INCOME').reduce((s,v)=>s+v.amount,0)
              const expense = data.filter(d=>d.type==='EXPENSE').reduce((s,v)=>s+v.amount,0)
              const byCat = {}
              data.forEach(d=>{ const name = d.category?.name || 'Uncategorized'; byCat[name]=(byCat[name]||0)+d.amount })
              setCategories(Object.entries(byCat).map(([name,value])=>({name,value})).sort((a,b)=>b.value-a.value))
              setSummary({income,expense,balance:income-expense})
            }catch(err){
              console.error(err)
              toast.error('Failed to create transaction')
            }
          }}>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:8}}>
            <input name="amount" placeholder="Amount" required />
            <select name="type">
              <option value="INCOME">Income</option>
              <option value="EXPENSE">Expense</option>
            </select>
            <select name="category">
              <option value="">Uncategorized</option>
              {categoryList.map(c=>(<option key={c.id} value={c.id}>{c.name}</option>))}
            </select>
            <input name="date" type="date" />
            <input name="description" placeholder="Description" />
          </div>
          <div style={{marginTop:12,display:'flex',justifyContent:'flex-end',gap:8}}>
            <button type="button" onClick={()=>setIsModalOpen(false)}>Cancel</button>
            <button className="btn btn-primary" type="submit">Save</button>
          </div>
        </form>
      </Modal>
    </>
  )
}
