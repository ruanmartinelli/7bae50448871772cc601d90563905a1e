import React from 'react'
import Button from '../components/Button'

class Login extends React.Component {
  redirect() {
    window.location.href = '/oauth_request'
  }

  render() {
    return (
      <div className="row mt-5 animated fadeInUp">
        <div className="col-12 text-center">
          <Button handler={this.redirect}>Sign In with Twitter 🐦</Button>
        </div>
      </div>
    )
  }
}

export default Login
