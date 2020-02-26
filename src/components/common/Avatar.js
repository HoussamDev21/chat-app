import React from 'react'

export default function Avatar (props) {
    const {
        className = 'w-10 h-10',
        user = {}
    } = props


    return <div className={`rounded-full overflow-hidden ${className}`}>
        {!!user.photo
            ? <img className="w-full h-full object-cover" src={user.photo} alt={user.username} />
            : <div className="w-full h-full bg-primary-500 flex items-center justify-center text-white leading-none uppercase font-semibold">
                {(user.username || '')[0]}
            </div>
        }
    </div>
}