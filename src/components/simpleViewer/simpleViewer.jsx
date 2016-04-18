
import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import _ from 'lodash'
import math from 'mathjs'

import THREE from 'three'
import ThreejsObject from './threejsObject'

import shellFromAirfoilGenerator from './shell-generator'
import airfoilFrom from './airfoil'
import generateRibFromPoints from './rib-from-shell'

// Actions
import { updateInternalMesh, updateExternalMesh, updateAirfoilPoints } from '../../actions/meshes'

// Styles
import * as style from './simpleViewer.style'

// Shapes
import geometryShape from '../../shapes/geometry'
import displayShape from '../../shapes/display'

const propTypes = {
  geometry: geometryShape,
  airfoils: React.PropTypes.array.isRequired,
  width: React.PropTypes.number,
  height: React.PropTypes.number,
  display: displayShape,
  updateInternalMesh: React.PropTypes.func.isRequired,
  updateExternalMesh: React.PropTypes.func.isRequired,
  updateAirfoilPoints: React.PropTypes.func.isRequired,
  internalMesh: React.PropTypes.object,
  externalMesh: React.PropTypes.object,
  airfoilShell: React.PropTypes.object,
}

function mapStateToProps (state) {
  return {
    geometry: state.geometry,
    airfoils: state.data.airfoils,
    display: state.display,
    width: state.display.width,
    height: state.display.height,
    internalMesh: state.meshes.internalMesh,
    externalMesh: state.meshes.externalMesh,
    airfoilShell: state.meshes.airfoilShell,
  }
}

function mapDispatchToProps (dispatch) {
  return {
    updateInternalMesh: bindActionCreators(updateInternalMesh, dispatch),
    updateExternalMesh: bindActionCreators(updateExternalMesh, dispatch),
    updateAirfoilPoints: bindActionCreators(updateAirfoilPoints, dispatch),
  }
}

class Viewer extends React.Component {
  constructor (props, context) {
    super(props, context)

    // Link functions to this
    this.getSize = this.getSize.bind(this)
    this.generateAirfoilShell = this.generateAirfoilShell.bind(this)
    this.generateInternalMesh = this.generateInternalMesh.bind(this)
    this.generateRib = this.generateRib.bind(this)
  }

  componentDidMount () {
    // Start three.js object
    this.tobj = new ThreejsObject(this.getSize())
  }

  componentDidUpdate (prevProps) {
    const prevGeometry = prevProps.geometry
    const geometry = this.props.geometry

    if (this.props.width !== prevProps.width || this.props.height !== prevProps.height) {
      this.tobj.resize(this.getSize())
    }

    if (prevGeometry.airfoil.filename !== geometry.airfoil.filename ||
        prevGeometry.structureParameters.beamCoord !== geometry.structureParameters.beamCoord ||
        prevGeometry.airfoil.nPoints !== geometry.airfoil.nPoints ||
        prevGeometry.airfoil.distribution !== geometry.airfoil.distribution ||
        prevGeometry.airfoil.interpolation !== geometry.airfoil.interpolation) {
      this.generateAirfoilShell()
    }

    if (prevProps.airfoilShell.vertices !== this.props.airfoilShell.vertices ||
        prevGeometry.wingParameters.length !== geometry.wingParameters.length ||
        prevGeometry.wingParameters.root !== geometry.wingParameters.root ||
        prevGeometry.wingParameters.tip !== geometry.wingParameters.tip ||
        prevGeometry.wingParameters.sweep !== geometry.wingParameters.sweep) {
      this.generateInternalMesh()
      this.generateExternalMesh()
    }

    if (prevGeometry.wingParameters.ribs !== geometry.wingParameters.ribs) {
      this.generateInternalMesh()
    }

    if (prevProps.internalMesh.vertices !== this.props.internalMesh.vertices) {
      const vertices = this.props.internalMesh.vertices
      const faces = this.props.internalMesh.faces
      const material = this.props.display.internalMesh.material
      const visible = this.props.display.internalMesh.visible
      this.tobj.renderMesh('internalMesh', vertices, faces, material, visible)
    }

    if (prevProps.externalMesh.vertices !== this.props.externalMesh.vertices) {
      const vertices = this.props.externalMesh.vertices
      const faces = this.props.externalMesh.faces
      const material = this.props.display.externalMesh.material
      const visible = this.props.display.externalMesh.visible
      this.tobj.renderMesh('externalMesh', vertices, faces, material, visible)
    }

    if (prevProps.display.internalMesh.visible !== this.props.display.internalMesh.visible) {
      this.tobj.changeMeshVisibility('internalMesh', this.props.display.internalMesh.visible)
    }

    if (prevProps.display.externalMesh.visible !== this.props.display.externalMesh.visible) {
      this.tobj.changeMeshVisibility('externalMesh', this.props.display.externalMesh.visible)
    }

    if (prevProps.display.internalMesh.material !== this.props.display.internalMesh.material) {
      this.tobj.changeMeshMaterial('internalMesh', this.props.display.internalMesh.material)
    }

    if (prevProps.display.externalMesh.material !== this.props.display.externalMesh.material) {
      this.tobj.changeMeshMaterial('externalMesh', this.props.display.externalMesh.material)
    }
  }

  componentWillUnmount () {
    this.controls.dispose()
    delete this.controls
  }

  getSize () {
    return {
      width: this.props.width - 450,
      height: this.props.height - 55,
    }
  }

  getImposedPoints () {
    return [this.props.geometry.structureParameters.beamCoord]
  }

  getZcoord (i) {
    const geometry = this.props.geometry
    const centerZOffset = geometry.wingParameters.length / 2
    return i * geometry.wingParameters.length / (geometry.wingParameters.ribs - 1) - centerZOffset
  }

  getXcoord (i, z) {
    const geometry = this.props.geometry
    const root = geometry.wingParameters.root / 2
    const l = geometry.wingParameters.length
    const tip = root - math.tan(geometry.wingParameters.sweep / 180 * math.pi) * l

    return ((z + l / 2) / l) * (tip - root) + root
  }

  getChord (i, z) {
    const geometry = this.props.geometry
    const root = geometry.wingParameters.root === 0 ? 0.1 : geometry.wingParameters.root
    const tip = geometry.wingParameters.tip === 0 ? 0.1 : geometry.wingParameters.tip
    const l = geometry.wingParameters.length

    return ((z + l / 2) / l) * (tip - root) + root
  }

  generateAirfoilShell () {
    const geometry = this.props.geometry

    const airfoilFunction = airfoilFrom(this.props.airfoils, geometry)

    // Update mesh
    if (airfoilFunction && geometry.airfoil.nPoints > 8) {
      this.props.updateAirfoilPoints(
        shellFromAirfoilGenerator(
          airfoilFunction,
          geometry.airfoil.nPoints,
          geometry.airfoil.distribution,
          this.getImposedPoints(),
        )
      )
    }
  }

  generateRib (i) {
    const geometry = this.props.geometry
    const shell = this.props.airfoilShell
    const z = this.getZcoord(i)
    const x = this.getXcoord(i, z)
    const chord = this.getChord(i, z)

    return generateRibFromPoints(
      _.cloneDeep(shell),
      i,
      chord,
      - x,
      0,
      - z,
      [geometry.structureParameters.beamCoord],
    )
  }

  generateInternalMesh () {
    const geometry = this.props.geometry
    const shell = this.props.airfoilShell
    const mesh = {
      vertices: [],
      faces: [],
    }

    if (shell.vertices) {
      let prevBeamVertices = []

      for (let i = 0; i < geometry.wingParameters.ribs; i++) {
        const rib = this.generateRib(i)

        const beamVertices = rib.found.map((item) => (item + mesh.vertices.length))

        mesh.vertices = mesh.vertices.concat(rib.vertices)
        mesh.faces = mesh.faces.concat(rib.faces)

        if (i !== 0 && beamVertices.length !== 0) {
          mesh.faces.push(
            new THREE.Face3(beamVertices[0], beamVertices[1], prevBeamVertices[0])
          )
          mesh.faces.push(
            new THREE.Face3(beamVertices[1], prevBeamVertices[1], prevBeamVertices[0])
          )
        }

        prevBeamVertices = beamVertices
      }

      this.props.updateInternalMesh(mesh)
    }
  }

  generateExternalMesh () {
    const geometry = this.props.geometry
    const shell = this.props.airfoilShell
    const mesh = {
      vertices: [],
      faces: [],
    }

    if (shell.vertices) {
      for (let i = 0; i < geometry.wingParameters.ribs; i++) {
        const rib = this.generateRib(i)

        const le = mesh.vertices.length

        mesh.vertices = mesh.vertices.concat(rib.vertices)
        const faces = []

        if (i !== 0) {
          for (let j = 0, l = rib.vertices.length; j < l - 1; j++) {
            faces.push(new THREE.Face3(le + j, le + j + 1, le + j - l))
            faces.push(new THREE.Face3(le + j + 1, le + j + 1 - l, le + j - l))
          }

          faces.push(new THREE.Face3(le + rib.vertices.length - 1, le, le - 1))
          faces.push(new THREE.Face3(le - 1, le, le - rib.vertices.length))
        }

        mesh.faces = mesh.faces.concat(faces)
      }

      this.props.updateExternalMesh(mesh)
    }
  }

  render () {
    const size = this.getSize()
    const mainStyle = style.main(size.width, size.height)

    return (
      <div style={mainStyle}>
        <div id="three-container"></div>
      </div>
    )
  }
}

Viewer.propTypes = propTypes

export default connect(mapStateToProps, mapDispatchToProps)(Viewer)
