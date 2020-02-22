import React, { useState, useEffect } from 'react'
import CurrentConversationHeader from './CurrentConversationHeader'
import MessageForm from './MessageForm'
import Messages from './Messages'
import MyEvent from '../Services/MyEvent'

export default function CurrentConversation () {
    const [ user, setUser ] = useState({})

    useEffect(() => {
        MyEvent.listen('start-conversation', (user) => {
            setUser(user)
        })
    }, [])

    if (!user.username) {
        return <div className="rounded-lg bg-white h-full border border-primary-200 flex flex-col justify-center items-center text-primary-300">
            <div className="w-16 h-16 rounded-full bg-primary-100 flex items-center justify-center mb-3">
                <svg xmlns="http://www.w3.org/2000/svg" width={30} height={30} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="feather feather-message-circle"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" /></svg>
            </div>
            <span className="font-semibold uppercase">select a chat</span>
        </div>
    }

    return <div className="rounded-lg border border-primary-200 overflow-y-auto h-full flex flex-col-reverse">
        <div className="flex-grow flex flex-col" key={user.username}>
            <CurrentConversationHeader user={user} />
            <Messages user={user} />
            <MessageForm user={user} />
        </div> 
    </div>
}
