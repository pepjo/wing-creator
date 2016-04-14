
import React from 'react'
import { connect } from 'react-redux'
import THREE from 'three'

// Components
import React3 from 'react-THREE-renderer'
import Container from './container'
import Ribs from './Ribs'

// Styles
import * as style from './index.style'

const propTypes = {
  geometry: React.propTypes.object,
}

function mapStateToProps (state) {
  return {
    geometry: state.geometry,
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

    this.state = {
      cameraPosition: new THREE.Vector3(0, 0, 5),
    }

    this._onAnimate = () => {
      // we will get this callback every frame

      // pretend cubeRotation is immutable.
      // this helps with updates and pure rendering.
      // React will be sure that the rotation has now updated.
      this.setState({
      })
    }
  }

  render () {
    const mainStyle = style.main()
    const width = mainStyle.width
    const height = mainStyle.height

    return (
      <Container>
        <React3
          mainCamera="camera"
          width={width}
          height={height}
          onAnimate={this._onAnimate}
          alpha
          clearAlpha={0}
        >
          <scene>
            <perspectiveCamera
              name="camera"
              fov={75}
              aspect={width / height}
              near={0.1}
              far={1000}

              position={this.state.cameraPosition}
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

            <mesh>
              <Ribs
                airfoil={this.props.geometry.airfoil}
                settings={this.props.geometry.ribs}
              />
              <meshLambertMaterial
                color={0xff7777}
              />
            </mesh>
          </scene>
        </React3>
      </Container>
    )
  }
}

Viewer.propTypes = propTypes

export default connect(mapStateToProps, mapDispatchToProps)(Viewer)
