import React from 'react'

const style = {
  borderRadius: '50px'
}

class Avatar extends React.Component {
  render () {
    const { source } = this.props
    return <img src={source} style={style} />
  }
}

export default Avatar
