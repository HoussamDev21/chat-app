import produce from 'immer'

const default_state = {
    user: null
}

export default function (state = default_state, action) {
	switch (action.type) {

		case 'account/SET_USER': {
            const next_state = produce(state, draft_state => {
                draft_state.user = action.user
            })
            return next_state
        }

		default: {
			return state
        }
        
	}
}