import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import Tweet from './Tweet'
import NewTweet from './NewTweet'

class TweetPage extends React.Component {
    render () {
        const { id, replies } = this.props

        return (
            <div>
                 <Tweet tweetId={id} />
                 <NewTweet replyingTo={id} />
                 {replies.length !== 0 && <h3 className='center'>Replies</h3>}
                 <ul>
                    {
                        replies.map((tweetId) => (
                            <li key={tweetId}>
                                <Tweet tweetId={tweetId} />
                            </li>
                        ))
                    }
                 </ul>
            </div>
        )
    }
}

const mapStateToProps = ({tweets}, ownProps) => {
    const { id } = ownProps.match.params

    return {
        id,
        replies: !tweets[id]
        ? []
        : tweets[id].replies.sort((a,b) => tweets[b].timestamp - tweets[a].timestamp)
    }
}

export default withRouter(connect(mapStateToProps)(TweetPage))