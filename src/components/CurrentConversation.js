import React, { useState, useEffect } from 'react'
import CurrentConversationHeader from './CurrentConversationHeader'
import MessageForm from './MessageForm'
import Messages from './Messages'
import PubSub from 'pubsub-js'
import { useQuery } from 'react-apollo'
import gql from 'graphql-tag'

const START_CONVERSATION = gql`query ($user_id: ID!) {
    conversation (user_id: $user_id) {
        id
        created_at
        participants {
            id
            username
        }
    }
}`

export default function CurrentConversation () {
    const [conversation, setConversation] = useState(null)
    const [userId, setUserId] = useState(null)
    const { loading, error } = useQuery(START_CONVERSATION, { 
        variables: { user_id: userId },
        skip: !userId,
        onCompleted: (data) => {
            setConversation(data.conversation)
        }
    })

    useEffect(() => {
        PubSub.subscribe('start-conversation', (_, user_id) => setUserId(user_id))
        PubSub.subscribe('open-conversation', (_, c) => setConversation(c))
    }, [])

    if (loading) {
        return 'loading ...'
    }
    
    if (error) {
        return 'error'
    }

    if (!conversation) {
        return <div className="bg-white h-full flex flex-col justify-center items-center text-primary-500">
            <div className="w-16 h-16 rounded-full bg-primary-100 flex items-center justify-center mb-3">
                <svg xmlns="http://www.w3.org/2000/svg" width={30} height={30} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="feather feather-message-circle"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" /></svg>
            </div>
            <span className="font-semibold uppercase">select a chat</span>
        </div>
    }

    return <div 
        key={conversation.id} 
        className="h-full flex flex-col"
    >
        <CurrentConversationHeader conversation={conversation} />
        <div className="flex-grow flex flex-col-reverse py-2 px-3 bg-white overflow-y-auto">
            <Messages conversation={conversation} />
            <div><div className="h-3"></div></div>
        </div>
        <MessageForm conversation={conversation} />
    </div>
}
