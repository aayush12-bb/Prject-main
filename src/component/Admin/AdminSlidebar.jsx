import React, { useEffect, useState } from 'react'
import Banner from './banner'
import Sidebar from './sidebar'
import User from './user'
import mockProducts from '../../data/mockproducts'

const AdminSlidebar = () => {
  const [counts, setCounts] = useState({ products: 0, categories: 0, users: 0, orders: 0 })
  const [recent, setRecent] = useState([])

  useEffect(() => {
    try {
      const data = mockProducts || []
      const categories = data.length
      const products = data.reduce((acc, cat) => acc + (cat.products ? cat.products.length : 0), 0)
      // demo users/orders
      const users = 12
      const orders = 5

      const flattened = data.flatMap((c) => (c.products || []).map((p) => ({ ...p, category: c.category })))
      const recentFour = flattened.slice(0, 6)

      setCounts({ products, categories, users, orders })
      setRecent(recentFour)
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error('Failed to load mock products', e)
    }
  }, [])

  const adminUser = { name: 'Admin User', email: 'admin@example.com' }

  return (
    <div className="fixed inset-0 flex bg-[#0b0b0b] z-50">
      <Sidebar />

      <main className="flex-1 bg-gradient-to-b from-[#0f0f0f] to-[#121212] text-gray-100 p-7 min-w-0 overflow-auto">
        <div className="flex items-center justify-between">
          <Banner title="Admin Dashboard" subtitle="Overview & controls" />

          <div className="ml-4">
            <User {...adminUser} />
          </div>
        </div>

        <section className="mt-6">
          <div className="flex flex-wrap gap-4 mb-4">
            <div className="min-w-[120px] bg-gradient-to-b from-yellow-900/10 to-transparent border border-yellow-900/10 p-4 rounded-lg">
              <div className="text-sm text-gray-300">Products</div>
              <div className="text-yellow-300 text-xl font-bold mt-2">{counts.products}</div>
            </div>

            <div className="min-w-[120px] bg-gradient-to-b from-yellow-900/10 to-transparent border border-yellow-900/10 p-4 rounded-lg">
              <div className="text-sm text-gray-300">Categories</div>
              <div className="text-yellow-300 text-xl font-bold mt-2">{counts.categories}</div>
            </div>

            <div className="min-w-[120px] bg-gradient-to-b from-yellow-900/10 to-transparent border border-yellow-900/10 p-4 rounded-lg">
              <div className="text-sm text-gray-300">Users</div>
              <div className="text-yellow-300 text-xl font-bold mt-2">{counts.users}</div>
            </div>

            <div className="min-w-[120px] bg-gradient-to-b from-yellow-900/10 to-transparent border border-yellow-900/10 p-4 rounded-lg">
              <div className="text-sm text-gray-300">Orders</div>
              <div className="text-yellow-300 text-xl font-bold mt-2">{counts.orders}</div>
            </div>
          </div>

          <h3 className="text-yellow-300 text-lg font-semibold mb-3">Recent Products</h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-full">
            {recent.map((p) => (
              <article
                key={p._id}
                className="flex items-start gap-3 bg-black/40 border border-white/5 p-3 rounded-lg max-w-full"
              >
                {p.image && (
                  <img src={p.image} alt={p.title} className="w-16 h-16 object-cover rounded-md flex-shrink-0" />
                )}
                <div className="min-w-0">
                  <div className="text-sm font-semibold text-white max-w-[180px] truncate">{p.title}</div>
                  <div className="text-xs text-gray-300">{p.brand} • ${p.finalPrice ?? p.price}</div>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}

export default AdminSlidebar
