import React from 'react'
import ConversationItem from './ConversationItem'
import { useQuery } from 'react-apollo'
import gql from 'graphql-tag'

const CONVERSATIONS = gql`{
    conversations {
        id
        created_at
        participants {
            id
            username
        }
    }
}`

export default function Conversations () {
    let { data, loading, error } = useQuery(CONVERSATIONS)

    if (loading) {
        return <div className="p-3 text-center text-gray-500">Loading ...</div>
    }
    
    if (error) {
        return 'error'
    }

    if (!data.conversations.length) {
        return <div className="p-3 text-center text-gray-500">No conversations yet !</div>
    }

    return data.conversations.map((c) => <ConversationItem key={c.id} item={c} />)
}