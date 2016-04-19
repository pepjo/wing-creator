
import THREE from 'three'

export default function (shell, i, chord, x, y, z, segmentOffset, find) {
  const length = shell.vertices.length

  const found = shell.vertices.filter((vertex) => {
    for (let j = 0; j < find.length; j++) {
      return find[j] === vertex.x
    }
    return false
  }).map((vertex) => shell.vertices.indexOf(vertex))

  const segments = shell.segments.map((s) => (
    [s[0] + length * i, s[1] + length * i]
  ))

  const faces = shell.faces.map((f) => (
    new THREE.Face3(f.a + length * i, f.b + length * i, f.c + length * i)
  ))

  const facesFromSegments = shell.facesFromSegments.map((f) => (
    f.map((s) => ([s[0] + segmentOffset, s[1]]))
  ))

  const vertices = shell.vertices.map((p) => (
    new THREE.Vector3(
      (p.x * chord) + x,
      (p.y * chord) + y,
      p.z + z
    )
  ))

  return {
    found,
    faces,
    vertices,
    segments,
    facesFromSegments,
  }
}
