
import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import _ from 'lodash'
import math from 'mathjs'

import { generateInternalMesh, generateExternalMesh, generateFluidBoxMesh } from './mesh-from-rib'
import ThreejsObject from './threejsObject'
import shellFromAirfoilGenerator from './shell-generator'
import airfoilFrom from './airfoil'
import generateRibFromPoints from './rib-from-shell'

// Actions
import {
  updateInternalMesh,
  updateExternalMesh,
  updateAirfoilPoints,
  updateFluidBoxMesh,
} from '../../actions/meshes'

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
  updateFluidBoxMesh: React.PropTypes.func.isRequired,
  internalMesh: React.PropTypes.object,
  externalMesh: React.PropTypes.object,
  fluidBoxMesh: React.PropTypes.object,
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
    fluidBoxMesh: state.meshes.fluidBoxMesh,
    airfoilShell: state.meshes.airfoilShell,
  }
}

function mapDispatchToProps (dispatch) {
  return {
    updateInternalMesh: bindActionCreators(updateInternalMesh, dispatch),
    updateExternalMesh: bindActionCreators(updateExternalMesh, dispatch),
    updateAirfoilPoints: bindActionCreators(updateAirfoilPoints, dispatch),
    updateFluidBoxMesh: bindActionCreators(updateFluidBoxMesh, dispatch),
  }
}

class Viewer extends React.Component {
  constructor (props, context) {
    super(props, context)

    // Link functions to this
    this.getSize = this.getSize.bind(this)
    this.generateAirfoilShell = this.generateAirfoilShell.bind(this)
    this.generateInternalMesh = this.generateInternalMesh.bind(this)
    this.generateFluidBoxMesh = this.generateFluidBoxMesh.bind(this)
    this.generateRib = this.generateRib.bind(this)
    this.getZcoord = this.getZcoord.bind(this)
    this.getXcoord = this.getXcoord.bind(this)
    this.getChord = this.getChord.bind(this)
  }

  componentDidMount () {
    // Start three.js object
    this.tobj = new ThreejsObject(this.getSize())

    // Generate wing
    this.generateAirfoilShell()
    this.generateFluidBoxMesh()
  }

  componentDidUpdate (prevProps) {
    const prevGeometry = prevProps.geometry
    const geometry = this.props.geometry

    if (this.props.width !== prevProps.width || this.props.height !== prevProps.height) {
      this.tobj.resize(this.getSize())
    }

    if (prevGeometry.airfoil.uid !== geometry.airfoil.uid ||
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

    if (
      prevGeometry.structureParameters.ribs !== geometry.structureParameters.ribs ||
      prevGeometry.structureParameters.beamExtension !== geometry.structureParameters.beamExtension
    ) {
      this.generateInternalMesh()
    }

    if (
      prevGeometry.fluidBox.width !== geometry.fluidBox.width ||
      prevGeometry.fluidBox.height !== geometry.fluidBox.height ||
      prevGeometry.fluidBox.length !== geometry.fluidBox.length ||
      prevGeometry.fluidBox.x !== geometry.fluidBox.x
    ) {
      this.generateFluidBoxMesh()
    }

    if (prevProps.fluidBoxMesh.vertices !== this.props.fluidBoxMesh.vertices) {
      const vertices = this.props.fluidBoxMesh.vertices
      const faces = this.props.fluidBoxMesh.faces
      const material = this.props.display.fluidBoxMesh.material
      const visible = this.props.display.fluidBoxMesh.visible
      this.tobj.renderMesh('fluidBoxMesh', vertices, faces, material, visible)
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

    if (prevProps.display.fluidBoxMesh.visible !== this.props.display.fluidBoxMesh.visible) {
      this.tobj.changeMeshVisibility('fluidBoxMesh', this.props.display.fluidBoxMesh.visible)
    }

    if (prevProps.display.internalMesh.material !== this.props.display.internalMesh.material) {
      this.tobj.changeMeshMaterial('internalMesh', this.props.display.internalMesh.material)
    }

    if (prevProps.display.externalMesh.material !== this.props.display.externalMesh.material) {
      this.tobj.changeMeshMaterial('externalMesh', this.props.display.externalMesh.material)
    }

    if (prevProps.display.fluidBoxMesh.material !== this.props.display.fluidBoxMesh.material) {
      this.tobj.changeMeshMaterial('fluidBoxMesh', this.props.display.fluidBoxMesh.material)
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

  generateAirfoilShell () { // eslint-disable-line
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

  getZcoord (i) {
    const geometry = this.props.geometry
    const l = geometry.wingParameters.length
    const centerZOffset = l / 2
    return i * l / (geometry.structureParameters.ribs - 1) - centerZOffset
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

  generateRib (i, segmentOffset) {
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
      segmentOffset,
      [geometry.structureParameters.beamCoord],
    )
  }

  generateInternalMesh () {
    const geometry = this.props.geometry
    const shell = this.props.airfoilShell

    const mesh = generateInternalMesh(geometry, shell, this.generateRib)
    if (mesh) {
      this.props.updateInternalMesh(mesh)
    }
  }

  generateExternalMesh () {
    const geometry = this.props.geometry
    const shell = this.props.airfoilShell

    const mesh = generateExternalMesh(geometry, shell, this.generateRib)
    if (mesh) {
      this.props.updateExternalMesh(mesh)
    }
  }

  generateFluidBoxMesh () {
    const geometry = this.props.geometry

    const mesh = generateFluidBoxMesh(geometry)
    if (mesh) {
      this.props.updateFluidBoxMesh(mesh)
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
