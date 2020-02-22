require('dotenv').config()

export default {
    WS_URI: process.env.WS_URI || 'ws://localhost:4000/ws',
    HTTP_URI: process.env.HTTP_URI || 'http://localhost:4000/'
}