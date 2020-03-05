import React, { useState, useEffect } from 'react'
import Avatar from './common/Avatar'
import MyEvent from '../services/MyEvent'
import colors from '../constants/colors'
import { useSelector } from 'react-redux'
import gql from 'graphql-tag'
import { useMutation } from 'react-apollo'

const LOGOUT = gql`mutation { logout }`

export default function Menu () {
    const user = useSelector(state => state.account.user)
    const [visibility, setVisibility] = useState(false)
    const [themeColor, setThemeColor] = useState(localStorage.getItem('themeColor'))
    const [logout] = useMutation(LOGOUT)

    useEffect(() => {
        MyEvent.listen('display-menu', (val) => {
            setVisibility(val)
        })
        MyEvent.listen('change-theme-color', (val) => {
            setThemeColor(val)
        })
    }, [])

    return <div className="absolute bg-primary-100 inset-0 overflow-hidden" style={{ height: visibility ? '100%' : '0%', transition: 'height .5s' }}>
        <div className="flex justify-between p-3">
            <div className="flex">
                <div className="mr-3">
                    <Avatar user={user} />
                </div>
                <div className="text-primary-700">
                    <div className="text-sm font-semibold">
                        {user.username}
                    </div>
                    <div className="text-xs">
                        @{user.username}
                    </div>
                </div>
            </div>
            <div className="text-primary-500 cursor-pointer hover:text-primary-600" onClick={() => MyEvent.emit('display-menu', false)}>
                <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="feather feather-x"><line x1={18} y1={6} x2={6} y2={18} /><line x1={6} y1={6} x2={18} y2={18} /></svg>
            </div>  
        </div>  
        <div>
            <div className="p-3 bg-white border-t border-b border-primary-200 mb-3">
                <div className="uppercase font-semibold text-gray-300 text-xs mb-2">theme color</div>
                <div className="-m-1 flex flex-wrap">
                    {colors.hues.map(c => {
                        return <div 
                            key={c} 
                            className="w-6 h-6 m-1 rounded-full cursor-pointer flex justify-center items-center"
                            style={{ background: c }}
                            onClick={() => MyEvent.emit('change-theme-color', c)}
                        >
                            {c === themeColor && <div className="h-3 w-3 rounded-full bg-white shadow"></div>}
                        </div>
                    })}
                </div>
                <div className="border-t border-primary-200 my-3"></div>
                <div className="uppercase font-semibold text-gray-300 text-xs mb-2">theme mode</div>
                <div className="flex light">
                    <div onClick={() => MyEvent.emit('change-theme-mode', 'light')} className="px-3 py-1 leading-none border border-black rounded-full text-black bg-white cursor-pointer uppercase text-xs">light</div>
                    <div className="w-1"></div>
                    <div onClick={() => MyEvent.emit('change-theme-mode', 'dark')} className="px-3 py-1 leading-none border border-white rounded-full text-white bg-black cursor-pointer uppercase text-xs">dark</div>
                </div>
            </div>
            <div className="p-3 bg-white border-t border-b border-primary-200">
                <button 
                    className="text-primary-500 text-sm"
                    onClick={async () => {
                        await logout()
                        localStorage.removeItem('token')
                        window.location = ''
                    }}
                >
                    logout
                </button>
            </div>
        </div>
    </div>
}

 