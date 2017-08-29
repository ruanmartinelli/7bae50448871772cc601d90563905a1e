import React from 'react'

const style = {
  borderRadius: '50px'
}

class Tweet extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { text, user, created } = this.props
    return (
      <div className="card p-2">
        <p>{text}</p>
        <div className="text-muted">
        <em>{'@' + user} - {new Date(created).toUTCString()}</em>
        </div>
      </div>
    )
  }
}

export default Tweet
