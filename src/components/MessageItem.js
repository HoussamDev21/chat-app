import React from 'react'
import { useSelector } from 'react-redux'

export default function MessageItem (props) {
    const user = useSelector(state => state.account.user)
    const { item } = props

    const isAuthMessage = item.user.username === user.username

    return <div className={`flex mb-1 last:mb-0 ${ isAuthMessage ? 'justify-end' : '' }`}>
        <div style={{ maxWidth: '60%' }}>
            <div className={`px-3 py-1 rounded-lg ${ isAuthMessage ? 'bg-primary-500 text-white' : ' bg-primary-100 border border-primary-200' }`}>
                {item.content}
            </div>
        </div>
    </div>
}