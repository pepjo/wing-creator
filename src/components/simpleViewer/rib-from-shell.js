
import THREE from 'three'

export default function (shell, i, chord, x, y, imposed) {
  const length = shell.vertices.length

  const resImposed = shell.vertices.filter((vertex) => {
    for (let j = 0; j < imposed.length; j++) {
      return imposed[j] === vertex.x
    }
    return false
  }).map((vertex) => shell.vertices.indexOf(vertex))

  const faces = shell.faces.map((f) => (
    new THREE.Face3(f.a + length * i, f.b + length * i, f.c + length * i)
  ))

  const vertices = shell.vertices.map((p) => (
    new THREE.Vector3(p.x, p.y + y, p.z - x)
  ))

  return {
    imposed: resImposed,
    faces,
    vertices,
  }
}
