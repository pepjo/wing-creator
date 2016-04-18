
import THREE from 'three'

export function generateInternalMesh (geometry, shell, ribGen) {
  const mesh = {
    vertices: [],
    faces: [],
    segments: [],
    facesFromSegments: [],
  }

  if (shell.vertices) {
    let prevBeamVertices = []

    for (let i = 0; i < geometry.structureParameters.ribs; i++) {
      const rib = ribGen(i)

      const beamVertices = rib.found.map((item) => (item + mesh.vertices.length))

      mesh.vertices = mesh.vertices.concat(rib.vertices)
      mesh.segments = mesh.segments.concat(rib.segments)
      mesh.faces = mesh.faces.concat(rib.faces)

      if (i !== 0 && beamVertices.length !== 0) {
        mesh.faces.push(
          new THREE.Face3(beamVertices[0], beamVertices[1], prevBeamVertices[0])
        )
        mesh.segments.push(
          [beamVertices[0], prevBeamVertices[0]]
        )
        mesh.faces.push(
          new THREE.Face3(beamVertices[1], prevBeamVertices[1], prevBeamVertices[0])
        )
        mesh.segments.push(
          [beamVertices[1], prevBeamVertices[1]]
        )
      }

      prevBeamVertices = beamVertices
    }

    return mesh
  }
  return null
}

export function generateExternalMesh (geometry, shell, ribGen) {
  const mesh = {
    vertices: [],
    faces: [],
    segments: [],
    facesFromSegments: [],
  }

  if (shell.vertices) {
    for (let i = 0; i < geometry.structureParameters.ribs; i++) {
      const rib = ribGen(i)

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

    return mesh
  }
  return null
}
