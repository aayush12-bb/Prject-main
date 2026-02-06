import React, { useEffect, useState } from 'react'
import Banner from '../../component/Admin/banner'
import User from '../../component/Admin/user'
import mockProducts from '../../data/mockproducts'

const Dashboard = () => {
    const [counts, setCounts] = useState({ products: 0, categories: 0, users: 0, orders: 0 })
    const [recent, setRecent] = useState([])

    useEffect(() => {
        const data = mockProducts || []
        const categories = data.length
        const products = data.reduce((acc, cat) => acc + (cat.products ? cat.products.length : 0), 0)
        const users = 12
        const orders = 5
        const flattened = data.flatMap((c) => (c.products || []).map((p) => ({ ...p, category: c.category })))
        const recentFour = flattened.slice(0, 6)
        setCounts({ products, categories, users, orders })
        setRecent(recentFour)
    }, [])

    const adminUser = { name: 'Admin User', email: 'admin@example.com' }

    return (
        <div className="p-6 bg-gradient-to-b from-[#0f0f0f] to-[#121212] min-h-screen text-gray-100">
            <div className="flex items-center justify-between">
                <Banner title="Admin Dashboard" subtitle="Overview & controls" />
                <User {...adminUser} />
            </div>

            <div className="mt-6">
                <div className="flex flex-wrap gap-4 mb-6">
                    <div className="min-w-[120px] bg-black/40 border border-yellow-900/10 p-4 rounded-lg">
                        <div className="text-sm text-gray-300">Products</div>
                        <div className="text-yellow-300 text-xl font-bold mt-2">{counts.products}</div>
                    </div>

                    <div className="min-w-[120px] bg-black/40 border border-yellow-900/10 p-4 rounded-lg">
                        <div className="text-sm text-gray-300">Categories</div>
                        <div className="text-yellow-300 text-xl font-bold mt-2">{counts.categories}</div>
                    </div>

                    <div className="min-w-[120px] bg-black/40 border border-yellow-900/10 p-4 rounded-lg">
                        <div className="text-sm text-gray-300">Users</div>
                        <div className="text-yellow-300 text-xl font-bold mt-2">{counts.users}</div>
                    </div>

                    <div className="min-w-[120px] bg-black/40 border border-yellow-900/10 p-4 rounded-lg">
                        <div className="text-sm text-gray-300">Orders</div>
                        <div className="text-yellow-300 text-xl font-bold mt-2">{counts.orders}</div>
                    </div>
                </div>

                <h3 className="text-yellow-300 text-lg font-semibold mb-3">Recent Products</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {recent.map((p) => (
                        <article key={p._id} className="flex items-start gap-3 bg-black/40 border border-white/5 p-3 rounded-lg">
                            {p.image && <img src={p.image} alt={p.title} className="w-16 h-16 object-cover rounded-md flex-shrink-0" />}
                            <div className="min-w-0">
                                <div className="text-sm font-semibold text-white truncate">{p.title}</div>
                                <div className="text-xs text-gray-300">{p.brand} • ${p.finalPrice ?? p.price}</div>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Dashboard
