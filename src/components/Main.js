import React, { useState, useEffect } from 'react'
import Menu from './Menu'
import MenuHeader from './MenuHeader'
import Users from './Users'
import SearchInput from './SearchInput'
import CurrentConversation from './CurrentConversation'
import Login from './Login'
import MyEvent from '../Services/MyEvent'

let user = JSON.parse(localStorage.getItem('user'))

export default function Main () {
    const [theme, setTheme] = useState(localStorage.getItem('theme'))
    const [mode, setMode] = useState(localStorage.getItem('mode'))

    if (!theme) {
        localStorage.setItem('theme', 'blue')
        setTheme(localStorage.getItem('theme'))
    }
    
    if (!mode) {
        localStorage.setItem('mode', 'light')
        setMode(localStorage.getItem('mode'))
    }

    useEffect(() => {
        MyEvent.listen('change-theme', (val) => {
            setTheme(val)
        })
        MyEvent.listen('change-mode', (val) => {
            setMode(val)
        })
    }, [])

    if (!user) return <div className={`theme-${theme} ${mode} text-gray-700`}><Login /></div>

    else return <div className={`theme-${theme} ${mode} bg-primary-100 text-gray-700`}>
        <div className="mx-auto container py-5 px-2 h-screen select-none" style={{ minWidth: '1000px' }}>
            <div className="h-full flex -mx-2">
                <div className="px-2 w-4/12">
                    <div className="rounded-lg border border-primary-200 h-full overflow-y-auto bg-white relative">
                        <div className="p-3 border-b-2 border-primary-100 sticky top-0 bg-white">
                            <div className="mb-3">
                                <MenuHeader />
                            </div>
                            <SearchInput />
                        </div>
                        <Users />
                        <Menu />
                    </div>
                </div>
                <div className="px-2 w-8/12">
                    <CurrentConversation />
                </div>
            </div>
        </div>
    </div>
}