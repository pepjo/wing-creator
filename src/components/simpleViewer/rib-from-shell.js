
import THREE from 'three'

export default function (shell, i, chord, x, y) {
  const length = shell.vertices.length
  shell.faces = shell.faces.map((f) => ( // eslint-disable-line no-param-reassign
    new THREE.Face3(f.a + length * i, f.b + length * i, f.c + length * i)
  ))

  shell.vertices = shell.vertices.map((p) => ( // eslint-disable-line no-param-reassign
    new THREE.Vector3(p.x, p.y + y, p.z - x)
  ))

  return shell
}
