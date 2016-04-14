
import React from 'react'

// Styles
import * as style from './index.style.js'

const propTypes = {
  children: React.PropTypes.oneOfType([
    React.PropTypes.node,
    React.PropTypes.arrayOf(React.PropTypes.node),
  ]),
}

class ViewContainer extends React.Component {
  constructor (props) {
    super(props)
    this.handleResizeWindowEvent = this.handleResizeWindowEvent.bind(this)
  }

  componentDidMount () {
    if (window.attachEvent) {
      // For IE 9
      window.attachEvent('onresize', this.handleResizeWindowEvent)
    } else if (window.addEventListener) {
      window.addEventListener('resize', this.handleResizeWindowEvent, true)
    }
  }

  componentWillUnmount () {
    if (window.attachEvent) {
      // For IE 9
      window.detachEvent('onresize', this.handleResizeWindowEvent)
    } else if (window.addEventListener) {
      window.removeEventListener('resize', this.handleResizeWindowEvent)
    }
  }

  handleResizeWindowEvent () {
    this.forceUpdate()
  }

  render () {
    return (
      <main style={style.main()}>
        {this.props.children}
      </main>
    )
  }
}

ViewContainer.propTypes = propTypes

export default ViewContainer
