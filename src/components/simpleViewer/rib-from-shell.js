
import THREE from 'three'

export default function (shell, i, chord, x, y, imposed) {
  const length = shell.vertices.length

  shell.imposed = shell.vertices.filter((vertex) => { // eslint-disable-line no-param-reassign
    for (let j = 0; j < imposed.length; j++) {
      return imposed[j] === vertex.x
    }
    return false
  }).map((vertex) => shell.vertices.indexOf(vertex))

  shell.faces = shell.faces.map((f) => ( // eslint-disable-line no-param-reassign
    new THREE.Face3(f.a + length * i, f.b + length * i, f.c + length * i)
  ))

  shell.vertices = shell.vertices.map((p) => ( // eslint-disable-line no-param-reassign
    new THREE.Vector3(p.x, p.y + y, p.z - x)
  ))

  return shell
}
