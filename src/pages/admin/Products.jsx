import React from 'react'
import mockProducts from '../../data/mockproducts'

const Products = () => {
    const flattened = mockProducts.flatMap((c) => (c.products || []).map((p) => ({ ...p, category: c.category })))

    return (
        <div className="p-6 bg-gradient-to-b from-[#0f0f0f] to-[#121212] min-h-screen text-gray-100">
            <h2 className="text-2xl font-bold text-yellow-300 mb-4">Products</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {flattened.map((p) => (
                    <div key={p._id} className="bg-black/40 border border-white/5 p-3 rounded-lg">
                        <div className="flex items-start gap-3">
                            {p.image && <img src={p.image} alt={p.title} className="w-20 h-20 object-cover rounded-md" />}
                            <div className="min-w-0">
                                <div className="text-sm font-semibold text-white truncate">{p.title}</div>
                                <div className="text-xs text-gray-300">{p.brand} • ${p.finalPrice ?? p.price}</div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Products
