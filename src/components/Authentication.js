import React, { useState } from 'react'
import gql from 'graphql-tag'
import { useMutation } from '@apollo/react-hooks'

const AUTHENTICATION_MUTATION = gql`mutation ($username: String!, $password: String!){
    authentication(input: {
        username: $username
        password: $password
    }) {
        ok
        error
        token
    }
}`

export default function Authentication () {
    const [authentication, { data, loading, error }] = useMutation(AUTHENTICATION_MUTATION)

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    
    if (error) {
        return 'error'
    }

    let errorMessage

    if (data && data.authentication) {
        if (data.authentication.ok) {
            localStorage.setItem('token', data.authentication.token)
            window.location = ''
        } else {
            errorMessage = data.authentication.error
        }
    }

    return <div className="bg-white mx-auto py-5 h-screen">
        <div className="flex justify-center">
            <form
                className="w-1/4 mt-24"
                onSubmit={(e) => {
                    e.preventDefault()
                    authentication({ variables: { username, password }})
                }}
            >
                <div className="mb-5 font-semibold leading-none text-xl text-primary-500 text-center">Authentication</div>
                <input 
                    className="input mb-3"
                    placeholder="Username"
                    value={username}
                    onChange={({ target }) => setUsername(target.value)}
                />
                <input 
                    type="password"
                    className="input mb-3"
                    placeholder="Password"
                    value={password}
                    onChange={({ target }) => setPassword(target.value)}
                />
                <button disabled={loading} className="button">next</button>
                {!!errorMessage && <div className="text-center text-red-500 mt-5">{errorMessage}</div>}
            </form>
        </div>
    </div>
}