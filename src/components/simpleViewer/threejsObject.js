
import THREE from 'three'
import TrackballControls from 'three-trackballcontrols'
import Detector from './publicDeps/Detector.js'

export default class ThreejsObject {
  constructor (size) {
    // Bind methods
    this.resize = this.resize.bind(this)
    this.attatchLights = this.attatchLights.bind(this)
    this.attatchControls = this.attatchControls.bind(this)
    this.changeMeshVisibility = this.changeMeshVisibility.bind(this)
    this.changeMeshMaterial = this.changeMeshMaterial.bind(this)
    this.animate = this.animate.bind(this)
    this.threeRender = this.threeRender.bind(this)
    this.renderMesh = this.renderMesh.bind(this)

    // Iniitalize threes
    if (!Detector.webgl) {
      Detector.addGetWebGLMessage()
      document.getElementById('three-container').innerHTML = ''
    }

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

    this.animate()

    requestAnimationFrame(this.threeRender)
  }

  resize (size) {
    this.camera.aspect = size.width / size.height
    this.camera.updateProjectionMatrix()
    this.renderer.setSize(size.width, size.height)
    this.controls.handleResize()
    requestAnimationFrame(this.threeRender)
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

  renderMesh (name, vertices, faces, material, visible) {
    if (this[name]) {
      const oldMesh = this[name]
      this.scene.remove(oldMesh)
    }

    if (vertices) {
      const geometry = new THREE.Geometry()

      geometry.vertices = vertices
      geometry.faces = faces
      geometry.name = name

      geometry.computeFaceNormals()
      geometry.computeBoundingSphere()

      const mesh = new THREE.Mesh(geometry, this.materials[material])
      this.scene.add(mesh)

      mesh.visible = visible

      this[name] = mesh
      this.threeRender()
    }
  }
}
