
import THREE from 'three'
import math from 'mathjs'

export function generateFluidBoxMesh (geometry) {
  const fb = geometry.fluidBox
  const wl = geometry.wingParameters.length
  const z0 = wl / 2
  const x0 = - fb.x

  const mesh = {
    vertices: [
      new THREE.Vector3(x0, fb.height * wl / 2, z0), // 0
      new THREE.Vector3(x0, fb.height * wl / 2, z0 - fb.width * wl),
      new THREE.Vector3(x0, - fb.height * wl / 2, z0 - fb.width * wl),
      new THREE.Vector3(x0, - fb.height * wl / 2, z0),

      new THREE.Vector3(x0 + fb.length * wl, fb.height * wl / 2, z0), // 4
      new THREE.Vector3(x0 + fb.length * wl, fb.height * wl / 2, z0 - fb.width * wl),
      new THREE.Vector3(x0 + fb.length * wl, - fb.height * wl / 2, z0 - fb.width * wl),
      new THREE.Vector3(x0 + fb.length * wl, - fb.height * wl / 2, z0),
    ],
    faces: [
      new THREE.Face3(0, 1, 2), // 0
      new THREE.Face3(0, 2, 3),

      new THREE.Face3(4, 6, 5), // 2
      new THREE.Face3(4, 7, 6),

      new THREE.Face3(0, 7, 4), // 4
      new THREE.Face3(0, 3, 7),

      new THREE.Face3(0, 5, 1), // 6
      new THREE.Face3(0, 4, 5),

      new THREE.Face3(1, 5, 6), // 8
      new THREE.Face3(1, 6, 2),

      new THREE.Face3(3, 2, 6), // 10
      new THREE.Face3(3, 6, 7),
    ],
    segments: [
      [0, 1], // 0
      [1, 2],
      [2, 3], // 2
      [3, 0],

      [4, 5], // 4
      [5, 6],
      [6, 7], // 6
      [7, 4],

      [0, 4], // 8
      [1, 5],
      [2, 6], // 10
      [3, 7],
    ],
    facesFromSegments: [
      [[0, 0], [1, 0], [2, 0], [3, 0]],
      [[4, 0], [5, 0], [6, 0], [7, 0]],
      [[8, 0], [4, 0], [9, 0], [0, 1]],
      [[9, 0], [5, 0], [10, 0], [1, 1]],
      [[10, 0], [6, 0], [11, 0], [2, 1]],
      [[11, 0], [7, 0], [8, 0], [3, 1]],
    ],
    groups: [],
  }

  return mesh
}

export function generateInternalMesh (geometry, shell, ribGen) {
  const mesh = {
    vertices: [],
    faces: [],
    segments: [],
    facesFromSegments: [],
    groups: [],
  }

  if (shell.vertices) {
    let prevBeamVertices = []
    let rootBeamVertices = []
    let rootBeamSegment = 0
    let prevSegmentIndex = 0

    for (let i = 0; i < geometry.structureParameters.ribs; i++) {
      const rib = ribGen(i, mesh.segments.length)

      const beamVertices = rib.found.map((item) => (item + mesh.vertices.length))

      mesh.vertices = mesh.vertices.concat(rib.vertices)
      mesh.segments = mesh.segments.concat(rib.segments)
      mesh.faces = mesh.faces.concat(rib.faces)
      mesh.facesFromSegments = mesh.facesFromSegments.concat(rib.facesFromSegments)

      if (i !== 0 && beamVertices.length !== 0) {
        mesh.faces.push(
          new THREE.Face3(beamVertices[0], beamVertices[1], prevBeamVertices[0])
        )
        mesh.faces.push(
          new THREE.Face3(beamVertices[1], prevBeamVertices[1], prevBeamVertices[0])
        )

        // Add segments for GID
        mesh.segments.push(
          [prevBeamVertices[0], beamVertices[0]]
        )
        mesh.segments.push(
          [beamVertices[1], prevBeamVertices[1]]
        )

        // Add facesFromSegments (notice the last segment is still to be added)
        mesh.facesFromSegments.push([
          [mesh.segments.length, 0],
          [mesh.segments.length - 1, 0],
          [prevSegmentIndex - 1, 1],
          [mesh.segments.length - 2, 0],
        ])
      }

      mesh.segments.push(
        [beamVertices[0], beamVertices[1]]
      )

      if (i === 0) {
        // Save vertices for beam extension
        rootBeamVertices = beamVertices
        rootBeamSegment = mesh.segments.length - 1

        // Add root group
        mesh.groups.push({
          name: 'internalRoot',
          type: 'points',
          color: '#999999ff',
          entities: [
            [0, rib.vertices.length - 1],
          ],
        })
      }

      prevSegmentIndex = mesh.segments.length
      prevBeamVertices = beamVertices
    }

    // Add beam extension (at the end, otherwise we would mess with the exporter)
    if (geometry.structureParameters.beamExtension) {
      const x = math.tan(geometry.wingParameters.sweep / 180 * math.pi) *
        geometry.structureParameters.beamExtension

      // Add beam extension vertices
      mesh.vertices.push(new THREE.Vector3(
        mesh.vertices[rootBeamVertices[0]].x - x,
        mesh.vertices[rootBeamVertices[0]].y,
        mesh.vertices[rootBeamVertices[0]].z + geometry.structureParameters.beamExtension
      ))
      mesh.vertices.push(new THREE.Vector3(
        mesh.vertices[rootBeamVertices[1]].x - x,
        mesh.vertices[rootBeamVertices[1]].y,
        mesh.vertices[rootBeamVertices[1]].z + geometry.structureParameters.beamExtension
      ))

      // Add this to vertices to the intern route group
      mesh.groups[0].entities.push([mesh.vertices.length - 2, mesh.vertices.length - 1])

      // Add beam extension threes faces
      const l = mesh.vertices.length
      mesh.segments.push([rootBeamVertices[1], l - 1])
      mesh.segments.push([l - 1, l - 2])
      mesh.segments.push([l - 2, rootBeamVertices[0]])

      // Add beam extension GID faces
      const s = mesh.segments.length
      mesh.facesFromSegments.push([
        [rootBeamSegment, 0],
        [s - 3, 0],
        [s - 2, 0],
        [s - 1, 0],
      ])

      // Add beam extension threes faces
      mesh.faces.push(
        new THREE.Face3(rootBeamVertices[0], rootBeamVertices[1], l - 2)
      )
      mesh.faces.push(
        new THREE.Face3(rootBeamVertices[1], l - 1, l - 2)
      )
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
    groups: [],
  }

  if (shell.vertices) {
    let prevASeg = 0 // prevSegmentIndexAirfoilStart

    for (let i = 0; i < geometry.structureParameters.ribs; i++) {
      const rib = ribGen(i)

      const le = mesh.vertices.length
      const cASeg = mesh.segments.length // currentSegmentIndexAirfoilStart

      mesh.vertices = mesh.vertices.concat(rib.vertices)
      mesh.segments = mesh.segments.concat(rib.segments)
      const faces = []

      if (i !== 0) {
        const l = rib.vertices.length
        for (let j = 0; j < l - 1; j++) {
          faces.push(new THREE.Face3(le + j, le + j + 1, le + j - l))
          faces.push(new THREE.Face3(le + j + 1, le + j + 1 - l, le + j - l))

          mesh.segments.push([le + j, le - l + j])

          mesh.facesFromSegments.push([
            [cASeg + j, 0], // In rib segment
            [cASeg + l + j + 1, 0], // Rib to rib segment
            [prevASeg + j, 1], // In prev rib segment
            [cASeg + l + j, 1], // Rib to rib segment
          ])
        }

        mesh.segments.push([le + (l - 1), le - 1])

        mesh.facesFromSegments.push([
          [cASeg + (l - 1), 0], // In rib segment
          [cASeg + l, 0], // Rib to rib segment
          [prevASeg + (l - 1), 1], // In prev rib segment
          [cASeg + l + (l - 1), 1], // Rib to rib segment
        ])

        faces.push(new THREE.Face3(le + rib.vertices.length - 1, le, le - 1))
        faces.push(new THREE.Face3(le - 1, le, le - rib.vertices.length))
      }

      // Add root group
      if (i === 0) {
        mesh.groups.push({
          name: 'externalRoot',
          type: 'points',
          color: '#999999ff',
          entities: [
            [0, rib.vertices.length - 1],
          ],
        })
      }

      mesh.faces = mesh.faces.concat(faces)

      prevASeg = cASeg
    }

    return mesh
  }
  return null
}
