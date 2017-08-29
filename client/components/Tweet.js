import React from 'react'

class Tweet extends React.Component {
  render () {
    const { text, user, created } = this.props
    return (
      <div className='card p-2'>
        <p>{text}</p>
        <div className='text-muted'>
          <em>{'@' + user} - {new Date(created).toUTCString()}</em>
        </div>
      </div>
    )
  }
}

export default Tweet
