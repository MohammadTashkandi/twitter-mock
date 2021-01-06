import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { handleSaveTweet } from '../actions/shared'


class NewTweet extends React.Component {

    state = {
        text: '',
        toHome: false
    }

    handleChange = (e) => {
        e.persist()

        this.setState(() => ({
            [e.target.name]: e.target.value
        }))
    }

    handleSubmit = (e) => {
        e.preventDefault()

        const { text } = this.state
        const { dispatch, replyingTo } = this.props

        dispatch(handleSaveTweet(text, replyingTo))

        console.log('New tweet: ',text)

        this.setState(() => ({
            text: '',
            toHome: replyingTo ? false : true
        }))
    }

    render() {

        const { text, toHome } = this.state

        if (toHome) {
            return <Redirect to='/' />
        }

        const tweetLeft = 280 - text.length

        return (
            <div>
                <h3 className='center'>Compose New Tweet</h3>
                <form className='new-tweet' onSubmit={this.handleSubmit}>
                    <textarea 
                        onChange={this.handleChange}
                        className='textarea'
                        type='text'
                        name='text'
                        value={text}
                        placeholder="What's happening?"
                        maxLength={280}
                    />

                    {tweetLeft < 100 && (
                        <div className='tweet-length'>
                            {tweetLeft}
                        </div>
                    )}

                    <button className='btn' disabled={text===''} type='submit'>Sumbit</button>
                </form>
            </div>
        )
    }
}

export default connect()(NewTweet)