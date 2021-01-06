import { getInitialData, saveTweet } from '../utils/api'
import { receiveTweets, saveTweetAction } from './tweets'
import { receiveUsers, addUserTweet } from './users'
import { setAuthedUser } from './authedUser'
import { showLoading, hideLoading } from 'react-redux-loading'

const AUTHED_ID = 'tylermcginnis'

export function handleInitialData() {
    return (dispatch) => {
        dispatch(showLoading())

        return getInitialData()
         .then(({tweets, users}) => {
             dispatch(receiveTweets(tweets))
             dispatch(receiveUsers(users))
             dispatch(setAuthedUser(AUTHED_ID))
             dispatch(hideLoading())
         })
    }
}

export function handleSaveTweet(text, replyingTo) {
    return (dispatch, getState) => {
        dispatch(showLoading())

        const { authedUser } = getState()
        const info = {
            text,
            author: authedUser,
            replyingTo
        }

        return saveTweet(info)
         .then((formattedTweet) => {
            dispatch(saveTweetAction(formattedTweet))
            dispatch(addUserTweet(formattedTweet.id, formattedTweet.author))
         })
         .then(() => dispatch(hideLoading()))
         .catch((e) => {
            console.warn('Error in handleSaveTweet', e)
            alert('An error has occured. Please try again')
         })
    }
}