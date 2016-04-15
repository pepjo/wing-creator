
import airfoilPointsGenerator from './airfoil'
import THREE from 'three'

export default function ribsGenerator (airfoil, ribs, length, root) {
  const data = airfoilPointsGenerator(airfoil, 20, 'equal', 'linear')

  console.log('data', data.reduce((s, i) => (s + i[0] + ',' + i[1] + ';'), ''))

  const vertices = data.map((point) => (new THREE.Vector3(point[0], point[1], 0)))

  const faces = []

  for (let i = 1, len = data.length - 1; i < len; i++) {
    faces.push(new THREE.Face3(0, i, i + 1))
  }

  return {
    vertices,
    faces,
  }
}
