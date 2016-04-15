
import React from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import THREE from 'three'

import TrackballControls from './trackball'

// Components
import React3 from 'react-THREE-renderer'
import Container from './container'
import Ribs from './rib/Ribs'

// Styles
import * as style from './index.style'

const propTypes = {
  geometry: React.PropTypes.object,
  airfoil: React.PropTypes.object,
}

function mapStateToProps (state) {
  return {
    geometry: state.geometry,
    airfoil: state.data.airfoils.find((item) => (item.filename === state.geometry.airfoil)),
  }
}

function mapDispatchToProps () {
  return {}
}

class Viewer extends React.Component {
  constructor (props, context) {
    super(props, context)

    // construct the position vector here, because if we use 'new' within render,
    // React will think that things have changed when they have not.
    this.mainLigthPosition = new THREE.Vector3(5, 5, 5)
    this.secondLigthPosition = new THREE.Vector3(-5, -5, 5)
    this.axisPosition = new THREE.Vector3(-0.1, -0.1, -0.1)
    this.gridPosition = new THREE.Vector3(0, 0, 0)

    this._onAnimate = () => {
      // we will get this callback every frame

      // pretend cubeRotation is immutable.
      // this helps with updates and pure rendering.
      // React will be sure that the rotation has now updated.
      // this.setState({
      // })

      this.controls.update()
    }

    this.state = {
      mainCameraPosition: new THREE.Vector3(0, 0, 2),
    }
  }

  componentDidMount () {
    const controls = new TrackballControls(this.refs.mainCamera,
      ReactDOM.findDOMNode(this.refs.react3))

    controls.rotateSpeed = 10
    controls.zoomSpeed = 1.2
    controls.panSpeed = 0.8

    controls.noRotate = false
    controls.noZoom = false
    controls.noPan = true

    controls.staticMoving = false
    controls.dynamicDampingFactor = 0.3

    controls.addEventListener('change', () => {
      this.setState({
        mainCameraPosition: this.refs.mainCamera.position,
      })
    })

    this.controls = controls
  }

  componentWillUnmount () {
    this.controls.dispose()
    delete this.controls
  }

  render () {
    const mainStyle = style.main()
    const width = mainStyle.width
    const height = mainStyle.height

    return (
      <Container>
        <React3
          ref="react3"
          mainCamera="camera"
          width={width}
          height={height}
          onAnimate={this._onAnimate}
          alpha
          clearAlpha={0}
        >
          <scene>
            <perspectiveCamera
              ref="mainCamera"
              name="camera"
              fov={75}
              aspect={width / height}
              near={0.1}
              far={10000}
              position={this.state.mainCameraPosition}
            />

            <pointLight
              name="mainLight"
              position={this.mainLigthPosition}
              visible
              castShadow
            />
            <pointLight
              name="secondLight"
              position={this.secondLigthPosition}
              intensity={0.3}
              visible
              castShadow={false}
            />

            <axisHelper
              position={this.axisPosition}
              size={0.2}
            />

            <Ribs
              airfoil={this.props.airfoil}
              settings={this.props.geometry}
            />
          </scene>
        </React3>
      </Container>
    )
  }
}

Viewer.propTypes = propTypes

export default connect(mapStateToProps, mapDispatchToProps)(Viewer)
