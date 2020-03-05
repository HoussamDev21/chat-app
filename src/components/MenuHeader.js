import React from 'react'
import Avatar from './common/Avatar'
import MyEvent from '../services/MyEvent'
import { useSelector } from 'react-redux'

export default function MenuHeader () {
    const user = useSelector(state => state.account.user)

    return <div className="flex justify-between">
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
        <div className="text-primary-500 cursor-pointer hover:text-primary-600" onClick={() => MyEvent.emit('display-menu', true)}>
            <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="feather feather-menu"><line x1={3} y1={12} x2={21} y2={12} /><line x1={3} y1={6} x2={21} y2={6} /><line x1={3} y1={18} x2={21} y2={18} /></svg>
        </div>
    </div>
}

 