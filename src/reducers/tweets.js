import { RECEIVE_TWEETS, TOGGLE_LIKE, SAVE_TWEET } from '../actions/tweets'

export default function tweets(state={}, action) {
    switch(action.type) {
        case RECEIVE_TWEETS:
            return {
                ...state,
                ...action.tweets
            }
        case TOGGLE_LIKE:
            return {
                ...state,
                [action.tweetId]: {
                    ...state[action.tweetId],
                    likes: action.hasLiked === true
                    ? state[action.tweetId].likes.filter((uid) => uid !== action.authedUser)
                    : state[action.tweetId].likes.concat([action.authedUser])
                }
            }
        case SAVE_TWEET:
            let replyingTo = {}
            if (action.formattedTweet.replyingTo !== null) {
                replyingTo = {
                    [action.formattedTweet.replyingTo]: {
                        ...state[action.formattedTweet.replyingTo],
                        replies: state[action.formattedTweet.replyingTo].replies.concat([action.formattedTweet.id])
                    }
                }
            }
            
            return {
                ...state,
                [action.formattedTweet.id]: action.formattedTweet,
                ...replyingTo
            }
        default:
            return state
    }
}