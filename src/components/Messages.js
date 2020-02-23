import React, { useState } from 'react'
import MessageItem from './MessageItem'
import Avatar from './common/Avatar'
import gql from 'graphql-tag'
import { useSubscription, useQuery } from '@apollo/react-hooks'

const NEW_MESSAGE_SUBSCRIPTION = gql`subscription($participants: [String]!) {
    newMessage(participants: $participants) {
        content
        sender { username }
        receiver { username }
    }
}`

const MESSAGES = gql`query ($username: String!) {
    messages(username: $username) {
        content
        sender { username }
        receiver { username }
    }
}`

const auth = JSON.parse(localStorage.getItem('user'))

export default function Messages ({ user }) {

    const [messages, setMessages] = useState([])
    
    const { loading, error } = useQuery(MESSAGES, { 
        variables: { username: user.username },
        onCompleted: (data) => {
            setMessages(data.messages)
        }
    })

    useSubscription(NEW_MESSAGE_SUBSCRIPTION, { 
        variables: { participants: [ user.username, auth.username ] },
        onSubscriptionData: ({ subscriptionData: { data }}) => {
            let list = [ data.newMessage, ... messages ]
            setMessages(list)
        }
    })

    const groupedByUser = () => {
        return messages.reduce((all, item, index) => {
            const groupIndex = (() => {
                if (index === 0) return 0
                else if (messages[index - 1].sender.username === item.sender.username) return all.length - 1
                else return all.length
            })()
            if (!all[groupIndex]) {
                all[groupIndex] = []
            }
            all[groupIndex].unshift(item)
            return all
        }, [])
    }
    
    if (loading) {
        return <div className="flex-grow flex justify-center items-center text-blue-400">error</div>
    }
    
    if (error) {
        return <div className="flex-grow flex justify-center items-center text-blue-400">error</div>
    }

    if (!messages.length && loading) {
        return <div className="flex-grow h-full flex flex-col justify-center items-center text-primary-300 bg-white">
            <div className="w-16 h-16 rounded-full bg-primary-100 flex items-center justify-center mb-3">
                <svg xmlns="http://www.w3.org/2000/svg" width={30} height={30} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="feather feather-edit-2"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" /></svg>
            </div>
            <span className="font-semibold uppercase">write something</span>
        </div>
    }

    return groupedByUser().map((group, groupIndex) => {
        return <div key={groupIndex} className="flex items-start mb-2">
            {group[0].sender.username !== auth.username && <div className="mr-2 sticky top-0">
                <Avatar className="w-8 h-8" user={group[0].sender} />
            </div>}
            <div className="flex-grow">
                {group.map((m, i) => <MessageItem key={i} item={m} />)}
            </div>
        </div>   
    })
}