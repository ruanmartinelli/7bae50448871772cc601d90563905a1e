import React from 'react'
import ReactDOM from 'react-dom'
import { Route, HashRouter as Router } from 'react-router-dom'

import Login from './pages/Login'
import Home from './pages/Home'

class App extends React.Component {
  render() {
    return (
      <Router>
        <div className="container">
          <Route exact path="/" component={Home} />
          <Route path="/login" component={Login} />
        </div>
      </Router>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'))
