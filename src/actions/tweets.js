import { saveLikeToggle } from '../utils/api'

export const RECEIVE_TWEETS = 'RECEIVE_TWEETS'
export const TOGGLE_LIKE = 'TOGGLE_LIKE'
export const SAVE_TWEET = 'SAVE_TWEET'

export function receiveTweets(tweets) {
    return {
        type: RECEIVE_TWEETS,
        tweets
    }
}

function toggleLike({id, hasLiked, authedUser}) {
    return {
        type: TOGGLE_LIKE,
        tweetId: id,
        hasLiked,
        authedUser
    }
}

export function handleToggleLike(info) {
    return (dispatch) => {
        dispatch(toggleLike(info))

        return saveLikeToggle(info)
         .catch((e) => {
            console.warn('Error in handleToggleLike ', e)
            dispatch(toggleLike(info))
            alert('There was an error liking the tweet. Please try again')
         })
    }
}

export function saveTweetAction(formattedTweet) {
    return {
        type: SAVE_TWEET,
        formattedTweet
    }
}