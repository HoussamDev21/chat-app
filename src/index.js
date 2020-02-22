import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import * as serviceWorker from './serviceWorker'
import config from './config'

// gql
import { ApolloClient } from 'apollo-client'
import { ApolloProvider } from '@apollo/react-hooks'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { HttpLink } from 'apollo-link-http'
import { WebSocketLink } from 'apollo-link-ws'
import { getMainDefinition } from 'apollo-utilities'
import { split } from 'apollo-link'
import { setContext } from 'apollo-link-context'

const httpLink = new HttpLink({
	uri: config.HTTP_URI
})

const wsLink = new WebSocketLink({
	uri: config.WS_URI,
	options: {
		reconnect: true,
		connectionParams: {
			user: localStorage.getItem('user'),
		}
	}
})

const authLink = setContext((_, { headers }) => {
	return {
		headers: {
			...headers,
			user: localStorage.getItem('user')
		}
	}
})

const link = split(
	({ query }) => {
		const definition = getMainDefinition(query)
		return (
			definition.kind === 'OperationDefinition' &&
			definition.operation === 'subscription'
		)
	},
	wsLink,
	authLink.concat(httpLink),
)

const cache = new InMemoryCache()
const client = new ApolloClient({
	cache,
	link
})

ReactDOM.render(<ApolloProvider client={client}><App /></ApolloProvider>, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
