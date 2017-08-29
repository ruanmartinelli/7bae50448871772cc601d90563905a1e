import React from 'react'
import { get, post } from 'axios'
import Button from '../components/Button'
import Avatar from '../components/Avatar'

class Home extends React.Component {
  constructor(props) {
    super(props)
    this.state = { tweets: [], user: {} }

    this.getUserData = this.getUserData.bind(this)
    this.getTweets = this.getTweets.bind(this)
    this.logout = this.logout.bind(this)
  }

  getUserData() {
    post('/connect')
      .then(res => res.data)
      .then(user => {
        this.setState({ user })
      })
  }

  getTweets() {
    get('/tweets')
      .then(res => res.data)
      .then(tweets => {
        this.setState({ tweets })
      })
  }

  logout() {
    return post('/disconnect')
      .then(res => res.data)
      .then(data => {
        window.location.href = '#/login'
      })
  }

  render() {
    const {
      name,
      screen_name: username,
      profile_image_url: avatarUrl
    } = this.state.user
    const { tweets } = this.state

    const tweetsList = tweets.map((tweet, index) => (
      <div key={index}>
        <blockquote>
          <p>{tweet.text}</p>
          <em>- {tweet.from_user}</em>
        </blockquote>
      </div>
    ))

    return (
      <div>
        <div className="row mt-3">
          <div className="col">
            <Button handler={this.getUserData}>Connect</Button>
            <Button handler={this.getTweets}>Refresh Tweets</Button>
            <Button handler={this.logout}>Logout</Button>
            <hr />
          </div>
        </div>
        <div className="row">
          <div className="col-1">
            <Avatar source={avatarUrl} />
          </div>
        </div>
        <div className="row mt-2">
          <div className="col-10">
            <h2 className="text-left">{name}</h2>
            <p className="text-muted">{username ? '@' + username : ''}</p>
          </div>
        </div>
        <div>{tweetsList}</div>
      </div>
    )
  }
}

export default Home
