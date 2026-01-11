import React, {useEffect, useState} from 'react'
import Layout from '../components/Layout'
import api from '../api'
import Card from '../components/Card'

export default function Categories(){
  const [list,setList]=useState([])
  const [name,setName]=useState('')
  const [type,setType]=useState('EXPENSE')

  useEffect(()=>{ load() },[])
  async function load(){ const r=await api.get('/categories'); setList(r.data || []) }
  async function add(){ await api.post('/categories',{name,type}); setName(''); load() }
  async function remove(id){ await api.delete(`/categories/${id}`); load() }

  return (
    <Layout>
      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-1">
          <Card title="Add Category">
            <input className="w-full p-2 mb-2 border" placeholder="Name" value={name} onChange={e=>setName(e.target.value)} />
            <select className="w-full p-2 mb-2 border" value={type} onChange={e=>setType(e.target.value)}>
              <option value="EXPENSE">Expense</option>
              <option value="INCOME">Income</option>
            </select>
            <button className="w-full bg-accent text-white py-2 rounded" onClick={add}>Add</button>
          </Card>
        </div>
        <div className="col-span-2">
          <Card title="Categories">
            <ul>
              {list.map(c=> <li key={c.id} className="flex justify-between border-b py-2"><span>{c.name} <small className="text-gray-500">{c.type}</small></span><button className="text-red-600" onClick={()=>remove(c.id)}>Delete</button></li>)}
            </ul>
          </Card>
        </div>
      </div>
    </Layout>
  )
}
