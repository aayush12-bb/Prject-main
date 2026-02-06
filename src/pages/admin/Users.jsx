import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

const mockUsers = [
    { id: 1, name: 'Alice Johnson', email: 'alice@example.com', age: 28 },
    { id: 2, name: 'Bob Smith', email: 'bob@example.com', age: 34 },
    { id: 3, name: 'Carol Lee', email: 'carol@example.com', age: 22 },
    { id: 4, name: 'David Kim', email: 'david@example.com', age: 41 },
]

const BASE_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5174'

const Users = () => {
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        let mounted = true

            ; (async () => {
                try {
                    const token = localStorage.getItem('token')
                    const headers = token ? { Authorization: `Bearer ${token}` } : {}
                    const res = await axios.get(`${BASE_URL}/api/users`, { headers })
                    const data = res.data?.users || res.data || []
                    if (!mounted) return
                    setUsers(Array.isArray(data) ? data : [])
                } catch (e) {
                    // fallback to mock data if backend unavailable
                    // eslint-disable-next-line no-console
                    console.error('Failed to fetch users', e)
                    if (!mounted) return
                    setError('Failed to load users from backend — showing mock data')
                    setUsers(mockUsers)
                } finally {
                    if (!mounted) return
                    setLoading(false)
                }
            })()

        return () => {
            mounted = false
        }
    }, [])

    return (
        <div className="p-6 bg-gradient-to-b from-[#0f0f0f] to-[#121212] min-h-screen text-gray-100">
            <h2 className="text-2xl font-bold text-yellow-300 mb-4">Users</h2>

            {error && <div className="mb-4 text-sm text-yellow-300">{error}</div>}

            {loading ? (
                <div className="text-gray-300">Loading users...</div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {users.map((u) => (
                        <Link key={u.id} to={`/admin/users/${u.id}`} className="block">
                            <div className="bg-black/40 border border-white/5 p-4 rounded-lg hover:shadow-lg hover:scale-[1.01] transition-transform">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <div className="text-sm font-semibold text-white">{u.name}</div>
                                        <div className="text-xs text-gray-300">{u.email}</div>
                                    </div>
                                    <div className="text-yellow-300 font-bold text-xl">{u.age ?? '-'}</div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    )
}

export default Users
