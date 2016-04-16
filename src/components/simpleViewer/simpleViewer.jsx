
import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import _ from 'lodash'

import THREE from 'three'
import TrackballControls from 'three-trackballcontrols'
import Detector from './publicDeps/Detector.js'

import shellFromAirfoilGenerator from './shell-generator'
import airfoilFrom from './airfoil'
import generateRibFromPoints from './rib-from-shell'

// Actions
import { updateInternalMesh, updateAirfoilPoints } from '../../actions/meshes'

// Styles
import * as style from './simpleViewer.style'

// Shapes
import shape from '../../shapes/geometry'

const propTypes = {
  geometry: shape,
  airfoils: React.PropTypes.array.isRequired,
  width: React.PropTypes.number,
  height: React.PropTypes.number,
  updateInternalMesh: React.PropTypes.func.isRequired,
  updateAirfoilPoints: React.PropTypes.func.isRequired,
  internalMesh: React.PropTypes.object,
  airfoilShell: React.PropTypes.object,
}

function mapStateToProps (state) {
  return {
    geometry: state.geometry,
    airfoils: state.data.airfoils,
    width: state.display.width,
    height: state.display.height,
    internalMesh: state.meshes.internalMesh,
    airfoilShell: state.meshes.airfoilShell,
  }
}

function mapDispatchToProps (dispatch) {
  return {
    updateInternalMesh: bindActionCreators(updateInternalMesh, dispatch),
    updateAirfoilPoints: bindActionCreators(updateAirfoilPoints, dispatch),
  }
}

class Viewer extends React.Component {
  constructor (props, context) {
    super(props, context)

    // Link functions to this
    this.getSize = this.getSize.bind(this)
    this.init = this.init.bind(this)
    this.attatchControls = this.attatchControls.bind(this)
    this.attatchLights = this.attatchLights.bind(this)
    this.animate = this.animate.bind(this)
    this.threeRender = this.threeRender.bind(this)
    this.generateAirfoilShell = this.generateAirfoilShell.bind(this)
    this.generateInternalMesh = this.generateInternalMesh.bind(this)
  }

  componentDidMount () {
    if (!Detector.webgl) {
      Detector.addGetWebGLMessage()
      document.getElementById('three-container').innerHTML = ''
    }

    this.init()
    this.animate()

    // TODO: Delete this
    window.view = this

    requestAnimationFrame(this.threeRender)
  }

  componentDidUpdate (prevProps) {
    if (this.props.width !== prevProps.width || this.props.height !== prevProps.height) {
      const size = this.getSize()
      this.camera.aspect = size.width / size.height
      this.camera.updateProjectionMatrix()
      this.renderer.setSize(size.width, size.height)
      this.controls.handleResize()
      requestAnimationFrame(this.threeRender)
    }

    if (prevProps.geometry.airfoil.filename !== this.props.geometry.airfoil.filename ||
        prevProps.geometry.airfoil.nPoints !== this.props.geometry.airfoil.nPoints) {
      this.generateAirfoilShell()
    }

    if (prevProps.airfoilShell.vertices !== this.props.airfoilShell.vertices ||
        prevProps.geometry.wingParameters.ribs !== this.props.geometry.wingParameters.ribs ||
        prevProps.geometry.wingParameters.length !== this.props.geometry.wingParameters.length ||
        prevProps.geometry.wingParameters.root !== this.props.geometry.wingParameters.root ||
        prevProps.geometry.wingParameters.tip !== this.props.geometry.wingParameters.tip ||
        prevProps.geometry.wingParameters.sweep !== this.props.geometry.wingParameters.sweep) {
      this.generateInternalMesh()
    }

    if (prevProps.internalMesh.vertices !== this.props.internalMesh.vertices) {
      this.renderMesh('internalMesh')
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

  generateAirfoilShell () {
    const geometry = this.props.geometry

    const airfoilFunction = airfoilFrom(this.props.airfoils, geometry)

    // Update mesh
    if (airfoilFunction) {
      this.props.updateAirfoilPoints(
        shellFromAirfoilGenerator(
          airfoilFunction,
          geometry.airfoil.nPoints < 8 ? 8 : geometry.airfoil.nPoints,
          geometry.airfoil.distribution,
          geometry.airfoil.interpolation,
        )
      )
    }
  }

  generateInternalMesh () {
    const geometry = this.props.geometry
    const shell = this.props.airfoilShell
    const mesh = {
      vertices: [],
      faces: [],
    }

    const centerZOffset = geometry.wingParameters.length / 2

    for (let i = 0; i < geometry.wingParameters.ribs; i++) {
      const rib = generateRibFromPoints(
        _.cloneDeep(shell),
        i,
        geometry.wingParameters.root,
        i * geometry.wingParameters.length / (geometry.wingParameters.ribs - 1) - centerZOffset,
        0,
      )

      mesh.vertices = mesh.vertices.concat(rib.vertices)
      mesh.faces = mesh.faces.concat(rib.faces)
    }

    this.props.updateInternalMesh(mesh)
  }

  init () {
    const size = this.getSize()
    const container = document.getElementById('three-container')

    const scene = new THREE.Scene()

    const camera = new THREE.PerspectiveCamera(60, size.width / size.height, 0.1, 20000)
    camera.position.set(-2, 8, 10)
    scene.add(camera)

    this.attatchLights(scene)
    this.attatchControls(camera, container)

    const gridHelper = new THREE.GridHelper(10, 2)
    gridHelper.setColors(0xCFD8DC, 0x90A4AE)
    scene.add(gridHelper)

    const material = new THREE.MeshLambertMaterial({ color: 0xff7777 })

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
    })
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setSize(size.width, size.height)
    container.innerHTML = ''
    container.appendChild(renderer.domElement)

    this.camera = camera
    this.scene = scene
    this.material = material
    this.renderer = renderer
  }

  attatchLights (scene) {
    const mainLigth = new THREE.PointLight(0xffffff, 1.2, 150)
    mainLigth.position.set(15, 15, 15)
    scene.add(mainLigth)

    const secondLigth = new THREE.PointLight(0xffffff, 0.7, 150)
    secondLigth.position.set(-15, -15, 15)
    scene.add(secondLigth)

    const thirdLigth = new THREE.PointLight(0xffffff, 0.6, 150)
    thirdLigth.position.set(-15, 15, -15)
    scene.add(thirdLigth)
  }

  attatchControls (camera, container) {
    const controls = new TrackballControls(camera, container)

    controls.rotateSpeed = 15
    controls.zoomSpeed = 1.2
    controls.panSpeed = 0.8

    controls.noRotate = false
    controls.noZoom = false
    controls.noPan = true

    controls.staticMoving = false
    controls.dynamicDampingFactor = 0.3

    controls.addEventListener('change', this.threeRender)

    this.controls = controls
  }

  animate () {
    requestAnimationFrame(this.animate)
    this.controls.update()
  }

  threeRender () {
    this.renderer.render(this.scene, this.camera)
  }

  renderMesh (name) {
    if (this[name]) {
      const oldMesh = this[name]
      this.scene.remove(oldMesh)
    }
    const geometry = new THREE.Geometry()

    geometry.vertices = this.props[name].vertices
    geometry.faces = this.props[name].faces
    geometry.name = name

    const mesh = new THREE.Mesh(geometry, this.material)
    this.scene.add(mesh)

    geometry.computeFaceNormals()
    geometry.computeBoundingSphere()

    this[name] = mesh
    this.threeRender()
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
