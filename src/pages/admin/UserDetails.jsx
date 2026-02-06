import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'

const BASE_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5174'

const UserDetails = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        let mounted = true

            ; (async () => {
                try {
                    const token = localStorage.getItem('token')
                    const headers = token ? { Authorization: `Bearer ${token}` } : {}
                    const res = await axios.get(`${BASE_URL}/api/users/${id}`, { headers })
                    const data = res.data?.user || res.data || null
                    if (!mounted) return
                    setUser(data)
                } catch (e) {
                    // eslint-disable-next-line no-console
                    console.error('Failed to fetch user', e)
                    if (!mounted) return
                    if (e.response?.status === 401) {
                        setError('Unauthorized. Please login again.')
                    } else {
                        setError('Failed to load user from backend')
                    }
                } finally {
                    if (!mounted) return
                    setLoading(false)
                }
            })()

        return () => {
            mounted = false
        }
    }, [id])

    if (loading) return <div className="p-6 text-gray-300">Loading user...</div>

    if (error)
        return (
            <div className="p-6 text-yellow-300">
                <div className="mb-4">{error}</div>
                <button className="px-3 py-2 bg-yellow-300 text-black rounded" onClick={() => navigate('/login')}>
                    Go to Login
                </button>
            </div>
        )

    if (!user) return <div className="p-6 text-gray-300">User not found</div>

    return (
        <div className="p-6 bg-gradient-to-b from-[#0f0f0f] to-[#121212] min-h-screen text-gray-100">
            <button className="mb-4 text-sm text-gray-300 underline" onClick={() => navigate(-1)}>
                ← Back
            </button>

            <div className="bg-black/40 border border-white/5 p-6 rounded-lg max-w-2xl">
                <h2 className="text-xl font-semibold text-white mb-2">{user.name}</h2>
                <div className="text-sm text-gray-300 mb-4">{user.email}</div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <div className="text-xs text-gray-400">Role</div>
                        <div className="text-sm text-white">{user.role ?? '-'}</div>
                    </div>
                    <div>
                        <div className="text-xs text-gray-400">Joined</div>
                        <div className="text-sm text-white">{user.createdAt ? new Date(user.createdAt).toLocaleString() : '-'}</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserDetails
