import React from 'react'
import Avatar from './common/Avatar'
import gql from 'graphql-tag'
import { useQuery, useSubscription } from '@apollo/react-hooks'
import MyEvent from '../services/MyEvent'
import { useSelector } from 'react-redux'

const ONLINE_USERS = gql`query {
    onlineUsers {
        id
        username
    }
}`

const ONLINE_USERS_SUBSCRIPTION = gql`subscription {
    onlineUsers {
        id
        username
    }
}`

export default function OnlineUsers () {
    const user = useSelector(state => state.account.user)
    const { data: firstData, loading: firstLoading, error: firstError} = useQuery(ONLINE_USERS)
    const { data, loading, error } = useSubscription(ONLINE_USERS_SUBSCRIPTION)

    if (loading && firstLoading) {
        return <div className="p-3 text-center text-gray-500">Loading ...</div>
    }
    
    if (error || firstError) {
        return 'error'
    }

    if (!(data || firstData).onlineUsers.length) {
        return <div className="p-3 text-center text-gray-500">No users yet !</div>
    }

    return (data || firstData).onlineUsers
    .filter(u => u.username !== user.username)
    .map(user => <div
        key={user.username}
        className="p-3 border-b border-primary-100 last:border-transparent hover:bg-primary-100 cursor-pointer"
        onClick={() => MyEvent.emit('start-conversation', user.id)}
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