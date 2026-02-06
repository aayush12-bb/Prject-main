import React from 'react'

const Banner = ({ title = 'Dashboard', subtitle, image }) => {
    return (
        <div className="flex items-center gap-4">
            <div>
                <h1 className="text-2xl font-bold text-yellow-300">{title}</h1>
                {subtitle && <p className="text-sm text-gray-300">{subtitle}</p>}
            </div>

            {image && (
                <div>
                    <img src={image} alt={title} className="w-16 h-16 object-cover rounded-md border border-yellow-900/10" />
                </div>
            )}
        </div>
    )
}

export default Banner
