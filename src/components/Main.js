import React, { useState, useEffect } from 'react'
import Menu from './Menu'
import MenuHeader from './MenuHeader'
import Users from './Users'
import SearchInput from './SearchInput'
import CurrentConversation from './CurrentConversation'
import Login from './Login'
import MyEvent from '../services/MyEvent'
import colorVariants from '../helpers/colorVariants'
import colors from '../constants/colors'

let user = JSON.parse(localStorage.getItem('user'))

if (!localStorage.getItem('themeColor')) {
    localStorage.setItem('themeColor', colors.hues[0])
}

if (!localStorage.getItem('themeMode')) {
    localStorage.setItem('themeMode', 'light')
}

function setCSSColors() {
    let variants = colorVariants(localStorage.getItem('themeColor'), localStorage.getItem('themeMode') === 'dark')
    let grayVariants = colorVariants(colors.gray, localStorage.getItem('themeMode') === 'dark')
    Object.keys(variants).forEach(key => {
        document.documentElement.style.setProperty(`--primary-${key}`, variants[key])
    })
    Object.keys(grayVariants).forEach(key => {
        document.documentElement.style.setProperty(`--gray-${key}`, grayVariants[key])
    })
    if (localStorage.getItem('themeMode') === 'dark') {
        document.documentElement.style.setProperty('--black', colors.white)
        document.documentElement.style.setProperty('--white', colors.black)
    } else {
        document.documentElement.style.setProperty('--white', colors.white)
        document.documentElement.style.setProperty('--black', colors.black)
    }
}

export default function Main () {
    const [themeMode, setThemeMode] = useState(localStorage.getItem('themeMode'))

    useEffect(() => {
        setCSSColors()
        MyEvent.listen('change-theme-color', () => {
            setCSSColors()
        })
        MyEvent.listen('change-theme-mode', (val) => {
            setThemeMode(val)
            setCSSColors()
        })
    }, [])

    if (!user) return <div className={`${themeMode} text-gray-700`}><Login /></div>

    else return <div className={`${themeMode} bg-primary-100 text-gray-700`}>
        <div className="mx-auto container px-2 h-screen select-none" style={{ minWidth: '1000px' }}>
            <div className="h-full flex border-r border-l border-primary-200">
                <div className="w-4/12">
                    <div className="border-r border-primary-200 h-full overflow-y-auto bg-white relative">
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
                <div className="w-8/12">
                    <CurrentConversation />
                </div>
            </div>
        </div>
    </div>
}