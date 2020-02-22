import React, { useState } from 'react'
import gql from 'graphql-tag'
import { useMutation } from '@apollo/react-hooks'

const SEND_MESSAGE = gql`mutation ($content: String!, $receiver: String!){
    sendMessage(content: $content, receiver: $receiver) {
        content
        sender {
            username
        }
        receiver {
            username
        }
    }
}`

export default function MessageForm ({ user }) {
    const [content, setContent] = useState('')
    const [sendMessage] = useMutation(SEND_MESSAGE)

    return <div className="p-3 rounded-b-lg border-t-2 border-primary-100 sticky bottom-0 z-10 bg-white">
        <form 
            className="relative flex"
            onSubmit={event => {
                event.preventDefault()
                if (content) {
                    sendMessage({ variables: { content, receiver: user.username }})
                    setContent('')
                }
            }}
        >
            <input 
                value={content}
                onChange={({ target }) => setContent(target.value)}
                className="bg-transparent placeholder-primary-300 flex-grow" placeholder="write your message ..."
            />
            <button 
                className="rounded-full py-1 px-4 uppercase text-sm font-semibold bg-primary-100 text-primary-500 hover:shadow hover:bg-white"
            >
                send
            </button>
        </form>
    </div>
}