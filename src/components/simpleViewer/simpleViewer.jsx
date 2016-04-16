
import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import THREE from 'three'
import TrackballControls from 'three-trackballcontrols'
import Detector from './publicDeps/Detector.js'

import meshFromAirfoilGenerator from './mesh-generator'
import airfoilFromFileGenerator from './airfoil-from-file'

// Actions
import { updateInternalMesh } from '../../actions/meshes'

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
  internalMesh: React.PropTypes.object,
}

function mapStateToProps (state) {
  return {
    geometry: state.geometry,
    airfoils: state.data.airfoils,
    width: state.display.width,
    height: state.display.height,
    internalMesh: state.meshes.internalMesh,
  }
}

function mapDispatchToProps (dispatch) {
  return {
    updateInternalMesh: bindActionCreators(updateInternalMesh, dispatch),
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

    if ((prevProps.geometry.airfoil.filename !== this.props.geometry.airfoil.filename) ||
        (prevProps.geometry.airfoil.nPoints !== this.props.geometry.airfoil.nPoints)) {
      this.generateMesh()
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

  generateMesh () {
    let airfoilFunction

    // Generate interior mesh
    if (this.props.geometry.airfoil.type === 'fromFile') {
      if (this.props.geometry.airfoil.filename) {
        airfoilFunction = airfoilFromFileGenerator(
          this.props.airfoils.find((airfoilItem) => (
            airfoilItem.filename === this.props.geometry.airfoil.filename
          )),
          this.props.geometry.airfoil.interpolation
        )
      }
    } else {
      console.warn('This type of airfoil is not yet implemented')
      throw new Error('This type of airfoil is not yet implemented')
    }

    // Update mesh
    if (airfoilFunction) {
      this.props.updateInternalMesh(
        meshFromAirfoilGenerator(
          airfoilFunction,
          this.props.geometry.airfoil.nPoints < 8 ? 8 : this.props.geometry.airfoil.nPoints,
          this.props.geometry.airfoil.distribution,
          this.props.geometry.airfoil.interpolation,
        )
      )
    }
  }

  init () {
    const size = this.getSize()
    const container = document.getElementById('three-container')

    const scene = new THREE.Scene()

    const camera = new THREE.PerspectiveCamera(60, size.width / size.height, 0.1, 20000)
    camera.position.set(0, 0, 2)
    scene.add(camera)

    this.attatchLights(scene)
    this.attatchControls(camera, container)

    const gridHelper = new THREE.GridHelper(10, 1)
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
    const mainLigth = new THREE.PointLight(0xffffff, 1.2, 100)
    mainLigth.position.set(5, 5, 5)
    scene.add(mainLigth)

    const secondLigth = new THREE.PointLight(0xffffff, 0.7, 100)
    secondLigth.position.set(-5, -5, 5)
    scene.add(secondLigth)

    const thirdLigth = new THREE.PointLight(0xffffff, 0.6, 100)
    thirdLigth.position.set(-5, 5, -5)
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
