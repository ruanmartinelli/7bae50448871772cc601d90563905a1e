import React from 'react'
import ReactDOM from 'react-dom'

class App extends React.Component {
  render () {
    return (
      <div>
        <h1> react works 💪</h1>
        <a href='/oauth_request'>Sign In</a>
      </div>
    )
  }
}
ReactDOM.render(<App />, document.getElementById('app'))
