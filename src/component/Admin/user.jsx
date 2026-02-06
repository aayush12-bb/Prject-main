import React from 'react'

const User = ({ name = 'Unknown', email, avatar }) => {
    const initials = name
        .split(' ')
        .map((n) => n[0])
        .slice(0, 2)
        .join('')

    return (
        <div className="flex items-center">
            <div className="w-11 h-11 rounded-full bg-yellow-400 text-black font-bold flex items-center justify-center overflow-hidden">
                {avatar ? <img src={avatar} alt={name} className="w-full h-full object-cover" /> : <span>{initials}</span>}
            </div>

            <div className="ml-3">
                <div className="text-sm font-semibold text-white">{name}</div>
                {email && <div className="text-xs text-gray-300">{email}</div>}
            </div>
        </div>
    )
}

export default User
