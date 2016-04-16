
import React from 'react'

import meshBufferFromAirfoilGenerator from './meshBuffer-generator'
import meshFromAirfoilGenerator from './mesh-generator'
import airfoilFromFileGenerator from './airfoil-from-file'

const propTypes = {
  airfoils: React.PropTypes.array.isRequired,
  geometry: React.PropTypes.object.isRequired,
  updateInternalMesh: React.PropTypes.func.isRequired,
  internalMesh: React.PropTypes.object,
}

class Ribs extends React.Component {
  constructor (props) {
    super(props)

    this.generateMesh = this.generateMesh.bind(this)
  }

  componentDidMount () {
    // TODO: Generate mesh if possible
  }

  componentDidUpdate (prevProps) {
    if (prevProps.geometry.airfoil.filename !== this.props.geometry.airfoil.filename) {
      this.generateMesh()
    }
  }

  generateMesh () {
    let airfoilFunction

    // Generate interior mesh
    if (this.props.geometry.airfoil.type === 'fromFile') {
      airfoilFunction = airfoilFromFileGenerator(
        this.props.airfoils.find((airfoilItem) => (
          airfoilItem.filename === this.props.geometry.airfoil.filename
        )),
        this.props.geometry.airfoil.interpolation
      )
    } else {
      console.warn('This type of airfoil is not yet implemented')
      throw new Error('This type of airfoil is not yet implemented')
    }

    const type = 'geometryBuffer'

    if (type === 'geometryBuffer') {
      this.props.updateInternalMesh({
        vertices: meshBufferFromAirfoilGenerator(
          airfoilFunction,
          this.props.geometry.airfoil.nPoints,
          this.props.geometry.airfoil.distribution,
          this.props.geometry.airfoil.interpolation,
        ),
        faces: [],
      })
    } else if (type === 'geometry') {
      this.props.updateInternalMesh(
        meshFromAirfoilGenerator(
          airfoilFunction,
          this.props.geometry.airfoil.nPoints,
          this.props.geometry.airfoil.distribution,
          this.props.geometry.airfoil.interpolation,
        )
      )
    }
  }

  render () {
    const { vertices, faces } = this.props.internalMesh

    if (vertices && faces) {
      return (
        <mesh>
          <geometry
            vertices={vertices}
            faces={faces}
            dynamic
          />
          <meshLambertMaterial
            color={0xff7777}
          />
        </mesh>
      )
    }
    return (
      <mesh>
        <boxGeometry
          width={1}
          height={1}
          depth={1}
        />
        <meshLambertMaterial
          color={0xff7777}
        />
      </mesh>
    )
  }
}

Ribs.propTypes = propTypes

export default Ribs
