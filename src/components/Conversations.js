import React, { useState } from 'react'
import ConversationItem from './ConversationItem'
import { useQuery, useSubscription } from 'react-apollo'
import gql from 'graphql-tag'
import _ from 'lodash'

const CONVERSATIONS = gql`{
    conversations {
        id
        created_at
        participants {
            id
            username
        },
        lastMessage {
            id
            content
            created_at
            user_id
        }
    }
}`

const CONVERSATION_SUBSCRIPTION = gql`subscription {
    conversation {
        id
        created_at
        participants {
            id
            username
        },
        lastMessage {
            id
            content
            created_at
            user_id
        }
    }
}`

export default function Conversations () {
    const [conversations, setConversations] = useState([])
    const { loading, error } = useQuery(CONVERSATIONS, {
        variables: {},
        onCompleted: (data) => {
            setConversations(data.conversations)
        }
    })

    useSubscription(CONVERSATION_SUBSCRIPTION, { 
        variables: {},
        onSubscriptionData: ({ subscriptionData: { data }}) => {
            let list = [...conversations]
            let index = list.findIndex(c => c.id === data.conversation.id)
            if (index > -1) {
                list[index] = data.conversation
            } else {
                list.unshift(data.conversation)
            }
            list = _.orderBy(list, 'lastMessage.created_at', 'desc')
            setConversations(list)
        }
    })

    if (loading) {
        return <div className="p-3 text-center text-gray-500">Loading ...</div>
    }
    
    if (error) {
        return 'error'
    }

    if (!conversations.length) {
        return <div className="p-3 text-center text-gray-500">No conversations yet !</div>
    }

    return conversations.map((c) => <ConversationItem key={c.id} item={c} />)
}