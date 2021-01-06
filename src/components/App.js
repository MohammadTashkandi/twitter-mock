import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { handleInitialData } from '../actions/shared'
import LoadingBar from 'react-redux-loading'
import { Route } from 'react-router-dom'
import Dashboard from './Dashboard'
import NewTweet from './NewTweet'
import TweetPage from './TweetPage'
import Nav from './Nav'

class App extends Component {

  componentDidMount() {
    this.props.handleInitialData()
  }

  render() {
    return (
      <Fragment>
        <LoadingBar />
        <div className='container'>
          <Nav />
          {
            this.props.loading ?
              (null)
              :
              (
                <div>
                  <Route path='/' exact render={() => (<Dashboard />)} />
                  <Route path='/new' render={() => (<NewTweet />)} />
                  <Route path='/tweet/:id' render={() => (<TweetPage />)} />
                </div>
              )
          }
        </div>
      </Fragment>
    )
  }
}

const mapStateToProps = ({ authedUser }) => ({
  loading: authedUser === null
})

const mapDispatchToState = {
  handleInitialData
}
//What I did here is made the function handleInitialData come to this component as props, and when called will be called with dispatch
//This may be a benefit if you want to pass the new handleInitialData as props to a component that doesn't use connect from react redux

export default connect(mapStateToProps, mapDispatchToState)(App)