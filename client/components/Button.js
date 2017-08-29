import React from 'react'

const style = {
  backgroundImage:
    '-webkit-gradient(linear,left top, right top,from(#667eea),to(#764ba2))',
  borderRadius: '2px',
  border: '0px',
  padding:'5px 7px',
  boxShadow: '2px 2px 10px -1px #ccc',
  color:'white',
  fontWeight:600,
  margin:'0px 6px',
  cursor:'pointer'
}

class Button extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { handler, children } = this.props

    return (
      <button className="hvr-grow" style={style} onClick={handler}>
        {children}
      </button>
    )
  }
}
export default Button
