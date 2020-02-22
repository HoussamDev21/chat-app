import React, { useState } from 'react'

export default function Login () {
    const [username, setUsername] = useState('')

    const login = () => {
        localStorage.setItem('user', JSON.stringify({
            username
        }))
        window.location = ''
    }

    return <div className="container mx-auto py-5 h-screen">
        <div className="flex justify-center">
            <form
                className="w-1/4 mt-24"
                onSubmit={(e) => {
                    e.preventDefault()
                    login()
                }}
            >
                <div className="mb-5 font-semibold leading-none text-xl text-primary-500 text-center">Login</div>
                <input 
                    className="mb-3 px-3 py-2 leading-none bg-white rounded-lg w-full border border-primary-200 focus:border-primary-400" 
                    placeholder="Username"
                    value={username}
                    onChange={({ target }) => setUsername(target.value)}
                />
                <button 
                    className="mb-3 px-3 py-2 leading-none bg-primary-500 hover:bg-primary-600 text-white font-semibold rounded-lg w-full uppercase"
                >next</button>
            </form>
        </div>
    </div>
}