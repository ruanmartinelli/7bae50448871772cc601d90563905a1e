import React from 'react'

class Login extends React.Component {
  redirect () {
    window.location.href = '/oauth_request'
  }

  render () {
    return (
      <div>
        <button onClick={this.redirect}>Sign In with Twitter</button>
      </div>
    )
  }
}

export default Login
