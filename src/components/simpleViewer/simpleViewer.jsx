
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
    this.init = this.init.bind(this)
    this.attatchControls = this.attatchControls.bind(this)
    this.attatchLights = this.attatchLights.bind(this)
    this.animate = this.animate.bind(this)
    this.threeRender = this.threeRender.bind(this)
    this.generateAirfoilShell = this.generateAirfoilShell.bind(this)
    this.generateInternalMesh = this.generateInternalMesh.bind(this)
    this.changeMeshVisibility = this.changeMeshVisibility.bind(this)
    this.changeMeshMaterial = this.changeMeshMaterial.bind(this)
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
    const prevGeometry = prevProps.geometry
    const geometry = this.props.geometry

    if (this.props.width !== prevProps.width || this.props.height !== prevProps.height) {
      const size = this.getSize()
      this.camera.aspect = size.width / size.height
      this.camera.updateProjectionMatrix()
      this.renderer.setSize(size.width, size.height)
      this.controls.handleResize()
      requestAnimationFrame(this.threeRender)
    }

    if (prevGeometry.airfoil.filename !== geometry.airfoil.filename ||
        prevGeometry.structureParameters.beamCoord !== geometry.structureParameters.beamCoord ||
        prevGeometry.airfoil.nPoints !== geometry.airfoil.nPoints) {
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
      this.renderMesh('internalMesh')
    }

    if (prevProps.externalMesh.vertices !== this.props.externalMesh.vertices) {
      this.renderMesh('externalMesh')
    }

    if (prevProps.display.internalMesh.visible !== this.props.display.internalMesh.visible) {
      this.changeMeshVisibility('internalMesh', this.props.display.internalMesh.visible)
    }

    if (prevProps.display.externalMesh.visible !== this.props.display.externalMesh.visible) {
      this.changeMeshVisibility('externalMesh', this.props.display.externalMesh.visible)
    }

    if (prevProps.display.internalMesh.material !== this.props.display.internalMesh.material) {
      this.changeMeshMaterial('internalMesh', this.props.display.internalMesh.material)
    }

    if (prevProps.display.externalMesh.material !== this.props.display.externalMesh.material) {
      this.changeMeshMaterial('externalMesh', this.props.display.externalMesh.material)
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

  generateInternalMesh () {
    const geometry = this.props.geometry
    const shell = this.props.airfoilShell
    const mesh = {
      vertices: [],
      faces: [],
    }

    if (shell) {
      let prevImposedVertices = []

      for (let i = 0; i < geometry.wingParameters.ribs; i++) {
        const rib = generateRibFromPoints(
          _.cloneDeep(shell),
          i,
          geometry.wingParameters.root,
          this.getZcoord(i),
          0,
          this.getImposedPoints(),
        )

        const imposedVertices = rib.imposed.map((item) => (item + mesh.vertices.length))

        mesh.vertices = mesh.vertices.concat(rib.vertices)
        mesh.faces = mesh.faces.concat(rib.faces)

        if (i !== 0) {
          mesh.faces.push(
            new THREE.Face3(imposedVertices[0], imposedVertices[1], prevImposedVertices[0])
          )
          mesh.faces.push(
            new THREE.Face3(imposedVertices[1], prevImposedVertices[1], prevImposedVertices[0])
          )
        }

        prevImposedVertices = imposedVertices
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

    if (shell) {
      for (let i = 0; i < geometry.wingParameters.ribs; i++) {
        const rib = generateRibFromPoints(
          _.cloneDeep(shell),
          i,
          geometry.wingParameters.root,
          this.getZcoord(i),
          0,
          this.getImposedPoints(),
        )

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

    const materials = {
      solid: new THREE.MeshLambertMaterial({ color: 0xff7777 }),
      wireframe: new THREE.MeshLambertMaterial({ color: 0xff7777, wireframe: true }),
    }
    materials.solid.side = THREE.DoubleSide

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
    })
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setSize(size.width, size.height)
    container.innerHTML = ''
    container.appendChild(renderer.domElement)

    this.camera = camera
    this.scene = scene
    this.materials = materials
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

    controls.rotateSpeed = 3
    controls.zoomSpeed = 1.2
    controls.panSpeed = 0.8

    controls.noRotate = false
    controls.noZoom = false
    controls.noPan = process.env.NODE_ENV !== 'development'

    controls.staticMoving = false
    controls.dynamicDampingFactor = 0.3

    controls.addEventListener('change', this.threeRender)

    this.controls = controls
  }

  changeMeshVisibility (name, visibility) {
    if (this[name]) {
      this[name].visible = visibility
      this.threeRender()
    }
  }

  changeMeshMaterial (name, material) {
    if (this[name]) {
      this[name].material = this.materials[material]
      this.threeRender()
    }
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

    if (this.props[name].vertices) {
      const geometry = new THREE.Geometry()

      geometry.vertices = this.props[name].vertices
      geometry.faces = this.props[name].faces
      geometry.name = name

      geometry.computeFaceNormals()
      geometry.computeBoundingSphere()

      const mesh = new THREE.Mesh(geometry, this.materials[this.props.display[name].material])
      this.scene.add(mesh)

      mesh.visible = this.props.display[name].visible

      this[name] = mesh
      this.threeRender()
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
