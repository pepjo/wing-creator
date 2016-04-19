
import React from 'react'

// Components
import RaisedButton from 'material-ui/RaisedButton'

// Syles
import * as style from './Foldable.style'

const propTypes = {
  border: React.PropTypes.bool,
  button: React.PropTypes.bool,
  children: React.PropTypes.node,
  gran: React.PropTypes.bool,
  nom: React.PropTypes.node,
  obert: React.PropTypes.bool,
  toggleOnLoad: React.PropTypes.bool,
  onToggle: React.PropTypes.func,
}

const defaultProps = {
  border: true,
  gran: false,
  button: true,
  obert: false,
  toggleOnLoad: false,
}

// S'utiliza en la configuració general i en els colors.
class Foldable extends React.Component {
  constructor (props) {
    super(props)

    this.close = this.close.bind(this)
    this.open = this.open.bind(this)
    this.togle = this.togle.bind(this)

    this.state = {
      obert: this.props.obert,
      height: this.props.gran ? 19 : 15,
      altura: this.props.obert ? 'auto' : 0,
    }
  }

  componentDidMount () {
    if (this.props.toggleOnLoad) {
      this.togle()
    }
  }

  componentWillReceiveProps (nextProps) {
    if (this.props.obert !== nextProps.obert) {
      this.togle()
    }
  }

  close () {
    this.state.altura = `${this.refs.container.offsetHeight}px`
    this.forceUpdate(() => {
      this.setState({
        obert: !this.state.obert,
        altura: `${this.refs.container.offsetHeight}px`,
        noAnimation: false,
      })
    })
  }

  open () {
    this.setState({
      obert: !this.state.obert,
      altura: `${this.refs.container.offsetHeight}px`,
    })
    setTimeout(() => {
      this.setState({
        altura: 'auto',
        noAnimation: true,
      })
    }, 280)
  }

  togle () {
    if (this.props.onToggle) {
      this.props.onToggle(
        this.refs.bigContainer, !this.state.obert, this.refs.container.offsetHeight)
    }
    if (this.state.obert) {
      this.close()
    } else {
      this.open()
    }
  }

  render () {
    const container = Object.assign.apply(undefined, [{},
      style.container,
      this.props.border && style.containerBoder,
    ])
    const arrow = Object.assign.apply(undefined, [{},
      style.arrow,
      this.state.obert && style.arrow__pressed,
    ])
    const btn = Object.assign.apply(undefined, [{},
      style.btn,
      this.state.obert && style.btn__pressed,
      this.props.gran && style.btn__big,
      { display: this.props.button ? 'block' : 'none' },
    ])
    const bdy = Object.assign.apply(undefined, [{},
      style.bdy,
      ((this.state.obert && this.state.altura === 'auto')) && style.bdy__opened,
      this.state.noAnimation && style.noAnimation,
      { height: this.state.obert ? this.state.altura : 0 },
    ])

    return (
      <div style={container} ref="bigContainer">
        <RaisedButton
          onClick={this.togle}
          style={btn}
          secondary
        >
          <span style={style.innerContainer}>
            {this.props.nom}
            <svg style={arrow} height={this.state.height}
              viewBox="10 10 30 30" width={this.state.height}
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                className="opcions__desplegar__fletxa__path"
                d="M30.83 14.83L28 12 16 24l12 12 2.83-2.83L21.66 24z"
              />
            </svg>
          </span>
        </RaisedButton>
        <div style={bdy}>
          <div className="opcions__container" ref="container">
            {this.props.children}
          </div>
        </div>
      </div>
    )
  }
}

Foldable.propTypes = propTypes
Foldable.defaultProps = defaultProps

export default Foldable
