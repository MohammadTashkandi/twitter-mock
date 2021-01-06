import React from 'react'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import { formatTweet, formatDate } from '../utils/helpers'
import { TiArrowBackOutline, TiHeartOutline, TiHeartFullOutline } from 'react-icons/ti';
import { handleToggleLike } from '../actions/tweets'

class Tweet extends React.Component {

    toParent = (e, id) => {
        e.preventDefault()

        this.props.history.push(`/tweet/${id}`)
    }

    handleLike = (e) => {
        e.preventDefault()

        const { tweetId, tweet, authedUser } = this.props
        const { hasLiked } = tweet

        const info = {
            id: tweetId,
            hasLiked,
            authedUser
        }

        console.log(info)

        this.props.dispatch(handleToggleLike(info))
    }

    render() {

        const { tweet } = this.props

        if (tweet === null) {
            return <p>The tweet doesn't exist</p>
        }

        const {
            name, avatar, timestamp, text, likes, replies, parent, id, hasLiked
        } = tweet

        return (
            <Link to={`/tweet/${id}`} className='tweet'>
                <img
                    src={avatar}
                    alt={`avatar of ${name}`}
                    className='avatar'
                />
                <div className='tweet-info'>
                    <div>
                        <span>{name}</span>
                        <div>{formatDate(timestamp)}</div>
                        {parent && (
                            <button className='replying-to' onClick={(e) => this.toParent(e, parent.id)}>
                                Replying to @{parent.author}
                            </button>
                        )}
                        <p>{text}</p>
                    </div>
                    <div className='tweet-icons'>
                        <TiArrowBackOutline className='tweet-icon' />
                        <span>{replies !== 0 && replies}</span>
                        <button className='heart-button' onClick={this.handleLike}>
                            {
                                hasLiked === true
                                    ? (<TiHeartFullOutline color='e0245e' className='tweet-icon' />)
                                    : (<TiHeartOutline className='tweet-icon' />)
                            }
                        </button>
                        <span>{likes !== 0 && likes}</span>
                    </div>
                </div>
            </Link>
        )
    }
}

const mapStateToProps = ({ tweets, users, authedUser }, { tweetId }) => {
    const tweet = tweets[tweetId]
    const parentTweet = tweet ? tweets[tweet.replyingTo] : null

    return {
        tweet: tweet ?
            (formatTweet(tweet, users[tweet.author], authedUser, parentTweet))
            :
            (null),
        authedUser
    }
}

export default withRouter(connect(mapStateToProps)(Tweet))