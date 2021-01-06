import { RECEIVE_USERS, ADD_USER_TWEET } from '../actions/users'

export default function users(state={}, action) {
    switch(action.type) {
        case RECEIVE_USERS:
            return {
                ...state,
                ...action.users
            }
        case ADD_USER_TWEET:
            return {
                ...state,
                [action.author]: {
                    ...state[action.author],
                    tweets: state[action.author].tweets.concat([action.id])
                }
            }
        default: 
            return state
    }
}