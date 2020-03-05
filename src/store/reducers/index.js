import { combineReducers } from 'redux'
import account from './account'

const appReducer = combineReducers({
    account
})

export default (state, action) => {
    if (action.type === 'RESET_STORE') {
        state = undefined
    }

    return appReducer(state, action)
}
