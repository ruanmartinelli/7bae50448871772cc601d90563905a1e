import React from 'react'
import { get, post } from 'axios'

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
    const { name, screen_name: username, profile_image_url } = this.state.user
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
        <button onClick={this.getUserData}>Connect</button>
        <button onClick={this.getTweets}>Refresh Tweets</button>
        <button onClick={this.logout}>Logout</button>
        <hr />
        <img src={profile_image_url} alt="" />
        <h3>{name}</h3>
        <h3>{username}</h3>
        <div>{tweetsList}</div>
      </div>
    )
  }
}

export default Home
