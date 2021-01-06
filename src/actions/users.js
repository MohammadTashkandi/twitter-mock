export const RECEIVE_USERS = 'RECEIVE_USERS'
export const ADD_USER_TWEET = 'ADD_USER_TWEET'

export function receiveUsers(users) {
    return {
        type: RECEIVE_USERS,
        users
    }
}

export function addUserTweet(id, author) {
    return {
        type: ADD_USER_TWEET,
        id,
        author
    }
}