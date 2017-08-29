import React from 'react'
import Button from '../components/Button'

class Login extends React.Component {
  redirect () {
    window.location.href = '/oauth_request'
  }

  render () {
    return (
      <div>
        <Button handler={this.redirect}>Sign In with Twitter 🐦</Button>
      </div>
    )
  }
}

export default Login
