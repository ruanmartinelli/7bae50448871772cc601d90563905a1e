import React from 'react'

const style = {
  borderRadius:'50px'
}

class Avatar extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { source, children } = this.props
    return <img src={source} style={style} />
  }
}

export default Avatar
