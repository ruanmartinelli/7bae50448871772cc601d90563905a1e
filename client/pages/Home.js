import React from 'react'
import { get, post } from 'axios'

class Home extends React.Component {
  constructor(props) {
    super(props)
    this.state = { twitterData: {} }

    this.getTwitterData = this.getTwitterData.bind(this)
    this.logout = this.logout.bind(this)
  }

  getTwitterData() {
    return post('/connect')
      .then(res => res.data)
      .then(data => this.setState({ twitterData: data }))
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
    const {
      name,
      screen_name: username,
      profile_image_url
    } = this.state.twitterData

    return (
      <div>
        <button onClick={this.getTwitterData}>Connect</button>
        <button onClick={this.logout}>Logout</button>
        <hr />
        <img src={profile_image_url} alt="" />
        <h3>{name}</h3>
        <h3>{username}</h3>
      </div>
    )
  }
}

export default Home
