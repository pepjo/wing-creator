
import React from 'react'
import THREE from 'three'

// Components
import React3 from 'react-THREE-renderer'
import Container from './container'

// Styles
import * as style from './index.style'

class Viewer extends React.Component {
  constructor (props, context) {
    super(props, context)

    // construct the position vector here, because if we use 'new' within render,
    // React will think that things have changed when they have not.
    this.cameraPosition = new THREE.Vector3(0, 0, 5)
    this.mainLigthPosition = new THREE.Vector3(5, 5, 5)
    this.secondLigthPosition = new THREE.Vector3(-5, -5, 5)

    this.state = {
      cubeRotation: new THREE.Euler(),
    }

    this._onAnimate = () => {
      // we will get this callback every frame

      // pretend cubeRotation is immutable.
      // this helps with updates and pure rendering.
      // React will be sure that the rotation has now updated.
      this.setState({
        cubeRotation: new THREE.Euler(
          this.state.cubeRotation.x + 0.01,
          this.state.cubeRotation.y + 0.01,
          0
        ),
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

            position={this.cameraPosition}
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

          <mesh
            rotation={this.state.cubeRotation}
          >
            <boxGeometry
              width={1}
              height={1}
              depth={1}
            />
            <meshLambertMaterial
              color={0x00ff00}
            />
          </mesh>
        </scene>
        </React3>
      </Container>
    )
  }
}

export default Viewer
