import React from 'react'
import { get, post } from 'axios'

class Home extends React.Component {
  constructor(props) {
    super(props)
    this.state = { tweets: [], user: {} }

    this.getTwitterData = this.getTwitterData.bind(this)
    this.logout = this.logout.bind(this)
  }

  getTwitterData() {
    const userDataPromise = post('/connect').then(res => res.data)
    const tweetDataPromise = get('/tweets').then(res => res.data)

    Promise.all([userDataPromise, tweetDataPromise]).then(([user, tweets]) => {
      this.setState({ tweets, user })
    })
  }

  logout() {
    return post('/disconnect')
      .then(res => res.data)
      .then(data => {
        this.setState({ twitterData: {} })
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
        <button onClick={this.getTwitterData}>Connect</button>
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

// {tweets.map((tweet, index) => <li key={tweet.index}>{tweet.text}</li>)}
export default Home
