import React, { useState } from 'react'
import Avatar from './common/Avatar'
import gql from 'graphql-tag'
import { useQuery, useSubscription } from '@apollo/react-hooks'
import PubSub from 'pubsub-js'
import { useSelector } from 'react-redux'

const ONLINE_USERS = gql`query {
    onlineUsers {
        id
        username
    }
}`

const USER_CONNECTED = gql`subscription {
    userConnected {
        id
        username
    }
}`

const USER_DISCONNECTED = gql`subscription {
    userDisconnected {
        id
        username
    }
}`

export default function OnlineUsers () {
    const user = useSelector(state => state.account.user)
    const { loading, error } = useQuery(ONLINE_USERS, {
        onCompleted: (data) => {
            setOnlineUsers(data.onlineUsers)
        }
    })
    const [onlineUsers, setOnlineUsers] = useState([])

    useSubscription(USER_CONNECTED, {
        onSubscriptionData: ({ subscriptionData: { data }}) => {
            let index = onlineUsers.findIndex(u => u.id === data.userConnected.id)
            if (index === -1) {
                let list = [ data.userConnected, ...onlineUsers ]
                setOnlineUsers(list)
            }
        }
    })

    useSubscription(USER_DISCONNECTED, { 
        onSubscriptionData: ({ subscriptionData: { data }}) => {
            let index = onlineUsers.findIndex(u => u.id === data.userDisconnected.id)
            if (index > -1) {
                let list = [...onlineUsers]
                list.splice(index, 1)
                setOnlineUsers(list)
            }
        }
    })

    if (loading) {
        return <div className="p-3 text-center text-gray-500">Loading ...</div>
    }
    
    if (error) {
        return 'error'
    }

    if (!onlineUsers.length) {
        return <div className="p-3 text-center text-gray-500">No users yet !</div>
    }

    return onlineUsers
    .filter(u => u.username !== user.username)
    .map(user => <div
        key={user.username}
        className="p-3 border-b border-primary-100 last:border-transparent hover:bg-primary-100 cursor-pointer"
        onClick={() => PubSub.publish('start-conversation', user.id)}
    >
        <div className="flex items-center">
            <div className="mr-3">
                <Avatar className="h-8 w-8" user={user} />
            </div>
            <div className="flex-grow">
                <div className="text-sm">
                    {user.username}
                </div>
            </div>
        </div>
    </div>)
}