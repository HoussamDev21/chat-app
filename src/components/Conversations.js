import React from 'react'
import ConversationItem from './ConversationItem'

const data = [
    {
        avatar: 'https://images.pexels.com/photos/3569566/pexels-photo-3569566.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
        title: 'Amy',
        updated_at: '11:45',
        message: {
            body: 'hello',
        }
    },
    {
        avatar: 'https://images.pexels.com/photos/3588650/pexels-photo-3588650.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
        title: 'Ali',
        updated_at: '10:23',
        message: {
            body: 'hello',
        }
    },
    {
        avatar: 'https://images.pexels.com/photos/3476402/pexels-photo-3476402.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
        title: 'Mohammed',
        updated_at: '9:00',
        message: {
            body: 'hello',
        }
    },
    {
        avatar: 'https://images.pexels.com/photos/3577339/pexels-photo-3577339.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
        title: 'Sara',
        updated_at: 'yesterday 17:34',
        message: {
            body: 'hello',
        }
    },
    {
        avatar: 'https://images.pexels.com/photos/3569566/pexels-photo-3569566.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
        title: 'Amy',
        updated_at: '11:45',
        message: {
            body: 'hello',
        }
    },
    {
        avatar: 'https://images.pexels.com/photos/3588650/pexels-photo-3588650.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
        title: 'Ali',
        updated_at: '10:23',
        message: {
            body: 'hello',
        }
    },
    {
        avatar: 'https://images.pexels.com/photos/3476402/pexels-photo-3476402.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
        title: 'Mohammed',
        updated_at: '9:00',
        message: {
            body: 'hello',
        }
    },
    {
        avatar: 'https://images.pexels.com/photos/3577339/pexels-photo-3577339.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
        title: 'Sara',
        updated_at: 'yesterday 17:34',
        message: {
            body: 'hello',
        }
    },
    {
        avatar: 'https://images.pexels.com/photos/3569566/pexels-photo-3569566.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
        title: 'Amy',
        updated_at: '11:45',
        message: {
            body: 'hello',
        }
    },
    {
        avatar: 'https://images.pexels.com/photos/3588650/pexels-photo-3588650.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
        title: 'Ali',
        updated_at: '10:23',
        message: {
            body: 'hello',
        }
    },
    {
        avatar: 'https://images.pexels.com/photos/3476402/pexels-photo-3476402.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
        title: 'Mohammed',
        updated_at: '9:00',
        message: {
            body: 'hello',
        }
    },
    {
        avatar: 'https://images.pexels.com/photos/3577339/pexels-photo-3577339.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
        title: 'Sara',
        updated_at: 'yesterday 17:34',
        message: {
            body: 'hello',
        }
    },
]

export default function Conversations () {
    return data.map((c, i) => <ConversationItem key={i} item={c} />)
}