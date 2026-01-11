import React, {useState} from 'react'
import api from '../api'
import toast, { Toaster } from 'react-hot-toast'
import {useNavigate, Link} from 'react-router-dom'

export default function Login(){
  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')
  const navigate = useNavigate()

  async function submit(){
    try{
      const res = await api.post('/auth/login',{email,password})
      localStorage.setItem('token', res.data.token)
      toast.success('Logged in')
      navigate('/')
    }catch(e){ toast.error('Login failed') }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Toaster />
      <div className="w-full max-w-md bg-white p-8 rounded shadow">
        <h2 className="text-2xl mb-4">Sign in</h2>
        <label className="block mb-2 text-sm">Email</label>
        <input className="w-full p-2 mb-4 border rounded" value={email} onChange={e=>setEmail(e.target.value)} />
        <label className="block mb-2 text-sm">Password</label>
        <input type="password" className="w-full p-2 mb-4 border rounded" value={password} onChange={e=>setPassword(e.target.value)} />
        <button onClick={submit} className="w-full bg-accent text-white py-2 rounded">Sign in</button>
        <div className="mt-4 text-sm text-gray-500">Don't have an account? <Link to="/register" className="text-blue-600">Register</Link></div>
      </div>
    </div>
  )
}
