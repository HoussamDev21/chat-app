import React, { useState, useEffect } from 'react'
import Menu from './Menu'
import MenuHeader from './MenuHeader'
import OnlineUsers from './OnlineUsers'
import Conversations from './Conversations'
import SearchInput from './SearchInput'
import CurrentConversation from './CurrentConversation'
import Authentication from './Authentication'
import PubSub from 'pubsub-js'
import colorVariants from '../helpers/colorVariants'
import colors from '../constants/colors'
import { useQuery } from 'react-apollo'
import gql from 'graphql-tag'
import { useDispatch } from 'react-redux'

const ME_QUERY = gql`{
    me {
        id
        username
    }
}`

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
    const dispatch = useDispatch()
    const { data, loading } = useQuery(ME_QUERY)
    const [themeMode, setThemeMode] = useState(localStorage.getItem('themeMode'))
    const [tab, setTab] = useState('online-users')

    useEffect(() => {
        setCSSColors()
        PubSub.subscribe('change-theme-color', (_, val) => {
            localStorage.setItem('themeColor', val)
            setCSSColors()
        })
        PubSub.subscribe('change-theme-mode', (_, val) => {
            localStorage.setItem('themeMode', val)
            setThemeMode(val)
            setCSSColors()
        })
    }, [])

    if (loading) return null

    if (!data.me) {
        localStorage.removeItem('token')
        return <div className={`${themeMode} text-gray-700`}><Authentication /></div>
    }
    else dispatch({ type: 'account/SET_USER', user: data.me })

    return <div className={`${themeMode} bg-primary-100 text-gray-700`}>
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
                        <div className="flex border-b border-primary-100 p-3">
                            <button className={`w-1/2 text-center leading-none p-2 text-xs uppercase font-semibold text-gray-500 ${tab === 'online-users' ? 'bg-primary-100 text-primary-500' : ''} rounded-full`} onClick={() => setTab('online-users')}>online users</button>
                            <button className={`w-1/2 text-center leading-none p-2 text-xs uppercase font-semibold text-gray-500 ${tab === 'conversations' ? 'bg-primary-100 text-primary-500' : ''} rounded-full`} onClick={() => setTab('conversations')}>conversations</button>
                        </div>
                        {tab === 'online-users' && <OnlineUsers />}
                        {tab === 'conversations' && <Conversations />}
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