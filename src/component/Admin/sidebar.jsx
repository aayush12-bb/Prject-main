import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const Sidebar = () => {
    const [counts, setCounts] = useState({ products: 0, users: 0, orders: 0 })

    useEffect(() => {
        let mounted = true

            ; (async () => {
                try {
                    const mod = await import('../../data/mockproducts')
                    const data = mod.default || []
                    const productCount = data.reduce((acc, cat) => acc + (cat.products ? cat.products.length : 0), 0)
                    if (!mounted) return
                    setCounts({ products: productCount, users: 12, orders: 5 })
                } catch (e) {
                    if (!mounted) return
                    setCounts({ products: 0, users: 0, orders: 0 })
                    // eslint-disable-next-line no-console
                    console.error('Failed loading mock products', e)
                }
            })()

        return () => {
            mounted = false
        }
    }, [])

    const items = [
        { label: 'Dashboard', to: '/admin' },
        { label: 'Users', to: '/admin/users', count: counts.users },
        { label: 'Banners', to: '/admin/banners' },
        { label: 'Products', to: '/admin/products', count: counts.products },
        { label: 'Orders', to: '/admin/orders', count: counts.orders },
    ]

    return (
        <aside className="w-56 bg-black/95 text-yellow-400 p-5 shadow-lg flex-shrink-0">
            <div className="text-yellow-300 font-bold text-xl pb-3 border-b border-yellow-900/20">S-Admin</div>

            <nav className="mt-4">
                <ul className="space-y-2">
                    {items.map((item) => (
                        <li key={item.to || item.label}>
                            <Link
                                to={item.to || '#'}
                                className="flex items-center justify-between text-yellow-300 px-3 py-2 rounded hover:bg-yellow-500/5 hover:text-white transition"
                            >
                                <span>{item.label}</span>
                                {typeof item.count === 'number' && (
                                    <span className="bg-yellow-400 text-black px-2 py-0.5 rounded-full text-sm font-semibold">{item.count}</span>
                                )}
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
        </aside>
    )
}

export default Sidebar
