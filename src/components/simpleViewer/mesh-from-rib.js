
import THREE from 'three'
import math from 'mathjs'

import addFacesWithPressure from './addFaceWithPressure'
import getPressureFromVertices from './getPressureFromVertices'

// Configuration
const numberOfBeams = 2

export function generateInternalMesh (geometry, shell, ribGen) {
  const mesh = {
    vertices: [],
    faces: [],
    segments: [],
    facesFromSegments: [],
    groups: [],
    boundaryConditions: [],
  }

  if (shell.vertices) {
    let prevBeamVertices = []
    let rootBeamVertices = []
    let rootBeamSegment = 0
    let prevSegmentIndex = 0
    let rootGroupIndex = 0

    for (let i = 0; i < geometry.structureParameters.ribs; i++) {
      const rib = ribGen(i, mesh.segments.length)

      const beamVertices = rib.found.map((item) => (item + mesh.vertices.length))

      mesh.vertices = mesh.vertices.concat(rib.vertices)
      mesh.segments = mesh.segments.concat(rib.segments)
      mesh.faces = mesh.faces.concat(rib.faces)
      mesh.facesFromSegments = mesh.facesFromSegments.concat(rib.facesFromSegments)

      if (i !== 0 && beamVertices.length !== 0) {
        for (let j = 0; j < numberOfBeams; j++) {
          const v1 = j
          const v2 = numberOfBeams * 2 - 1 - j

          mesh.faces.push(
            new THREE.Face3(beamVertices[v1], beamVertices[v2], prevBeamVertices[v1])
          )
          mesh.faces.push(
            new THREE.Face3(beamVertices[v2], prevBeamVertices[v2], prevBeamVertices[v1])
          )

          // Add segments for GID
          mesh.segments.push(
            [prevBeamVertices[v1], beamVertices[v1]]
          )
          mesh.segments.push(
            [beamVertices[v2], prevBeamVertices[v2]]
          )

          // Add facesFromSegments (notice the last segment is yet to be added)
          mesh.facesFromSegments.push([
            [mesh.segments.length, 0],
            [mesh.segments.length - 1, 0],
            [prevSegmentIndex - 1, 1],
            [mesh.segments.length - 2, 0],
          ])
        }
      }

      mesh.segments.push(
        [beamVertices[0], beamVertices[3]]
      )
      mesh.segments.push(
        [beamVertices[1], beamVertices[2]]
      )

      if (i === 0) {
        // Save vertices for beam extension
        rootBeamVertices = beamVertices
        rootBeamSegment = mesh.segments.length - 1
        rootGroupIndex = mesh.groups.length

        // Add root group
        mesh.groups.push({
          name: 'internalRoot',
          type: 'points',
          color: '#999999',
          entities: [
            [0, rib.vertices.length - 1],
          ],
        })

        mesh.boundaryConditions.push({
          type: 'Displacements',
          goupName: 'surf1',
          x: 0,
          y: 0,
          z: 0,
          fx: 1,
          fy: 1,
          fz: 1,
        })
      }

      prevSegmentIndex = mesh.segments.length
      prevBeamVertices = beamVertices
    }

    // Add beam extension (at the end, otherwise we would mess with the exporter)
    if (geometry.structureParameters.beamExtension) {
      for (let i = 0; i < numberOfBeams; i++) {
        const v1 = i
        const v2 = numberOfBeams * 2 - 1 - i

        const x = math.tan(geometry.wingParameters.sweep / 180 * math.pi) *
          geometry.structureParameters.beamExtension

        // Add beam extension vertices
        mesh.vertices.push(new THREE.Vector3(
          mesh.vertices[rootBeamVertices[v1]].x - x,
          mesh.vertices[rootBeamVertices[v1]].y,
          mesh.vertices[rootBeamVertices[v1]].z + geometry.structureParameters.beamExtension
        ))
        mesh.vertices.push(new THREE.Vector3(
          mesh.vertices[rootBeamVertices[v2]].x - x,
          mesh.vertices[rootBeamVertices[v2]].y,
          mesh.vertices[rootBeamVertices[v2]].z + geometry.structureParameters.beamExtension
        ))

        // Add this to vertices to the intern route group
        mesh.groups[rootGroupIndex].entities.push(
          [mesh.vertices.length - 2, mesh.vertices.length - 1]
        )

        // Add beam extension threes faces
        const l = mesh.vertices.length
        mesh.segments.push([rootBeamVertices[v2], l - 1])
        mesh.segments.push([l - 1, l - 2])
        mesh.segments.push([l - 2, rootBeamVertices[v1]])

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
          new THREE.Face3(rootBeamVertices[v1], rootBeamVertices[v2], l - 2)
        )
        mesh.faces.push(
          new THREE.Face3(rootBeamVertices[v2], l - 1, l - 2)
        )
      }
    }

    return mesh
  }
  return null
}

export function generateExternalMesh (geometry, shell, ribGen, fluidSimulation) {
  const mesh = {
    vertices: [],
    faces: [],
    segments: [],
    facesFromSegments: [],
    groups: [],
    loads: [],
  }

  // Each time we add a vertice, we add the corresponding pressure here.
  // If we did this when we add a face it would take longer since each vertice is in 4 faces
  let verticesPressure = []

  if (shell.vertices) {
    let prevASeg = 0 // prevSegmentIndexAirfoilStart

    for (let i = 0; i < geometry.structureParameters.ribs; i++) {
      const rib = ribGen(i)

      const le = mesh.vertices.length
      const cASeg = mesh.segments.length // currentSegmentIndexAirfoilStart

      mesh.vertices = mesh.vertices.concat(rib.vertices)
      verticesPressure = verticesPressure.concat(
        getPressureFromVertices(rib.vertices, fluidSimulation)
      )
      mesh.segments = mesh.segments.concat(rib.segments)
      const faces = []

      if (i !== 0) {
        const l = rib.vertices.length
        for (let j = 0; j < l - 1; j++) {
          faces.push(new THREE.Face3(le + j, le + j + 1, le + j - l))
          faces.push(new THREE.Face3(le + j + 1, le + j + 1 - l, le + j - l))

          mesh.segments.push([le + j, le - l + j])

          addFacesWithPressure(
            mesh,
            [
              cASeg + j, // In rib segment
              cASeg + l + j + 1, // Rib to rib segment
              prevASeg + j, // In prev rib segment
              cASeg + l + j, // Rib to rib segment
            ],
            [
              verticesPressure[le + j],
              verticesPressure[le + j + 1],
              verticesPressure[le + j - l],
              verticesPressure[le + j + 1 - l],
            ]
          )
        }

        mesh.segments.push([le + (l - 1), le - 1])

        addFacesWithPressure(
          mesh,
          [
            cASeg + (l - 1), // In rib segment
            cASeg + l, // Rib to rib segment
            prevASeg + (l - 1), // In prev rib segment
            cASeg + l + (l - 1), // Rib to rib segment
          ],
          [
            verticesPressure[le + rib.vertices.length - 1],
            verticesPressure[le],
            verticesPressure[le - 1],
            verticesPressure[le - rib.vertices.length],
          ]
        )

        faces.push(new THREE.Face3(le + rib.vertices.length - 1, le, le - 1))
        faces.push(new THREE.Face3(le - 1, le, le - rib.vertices.length))
      }

      // Add root group
      if (i === 0) {
        mesh.groups.push({
          name: 'externalRoot',
          type: 'points',
          color: '#999999',
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

export function generateFluidBoxMesh (geometry) {
  const angle = - geometry.fluidBox.angle / 180 * math.pi
  const fb = geometry.fluidBox
  const wl = geometry.wingParameters.length
  const z0 = wl / 2
  const x0 = - fb.x

  let vertices = [
    [x0, fb.height * wl / 2, z0],
    [x0, fb.height * wl / 2, z0 - fb.width * wl],
    [x0, - fb.height * wl / 2, z0 - fb.width * wl],
    [x0, - fb.height * wl / 2, z0],

    [x0 + fb.length * wl, fb.height * wl / 2, z0],
    [x0 + fb.length * wl, fb.height * wl / 2, z0 - fb.width * wl],
    [x0 + fb.length * wl, - fb.height * wl / 2, z0 - fb.width * wl],
    [x0 + fb.length * wl, - fb.height * wl / 2, z0],
  ]

  const rotation = [
    [math.cos(angle), -math.sin(angle), 0],
    [math.sin(angle), math.cos(angle), 0],
    [0, 0, 1],
  ]

  vertices = vertices.map((vertex) => (
    math.multiply(vertex, rotation)
  ))

  const mesh = {
    vertices: [
      new THREE.Vector3(vertices[0][0], vertices[0][1], vertices[0][2]), // 0
      new THREE.Vector3(vertices[1][0], vertices[1][1], vertices[1][2]),
      new THREE.Vector3(vertices[2][0], vertices[2][1], vertices[2][2]),
      new THREE.Vector3(vertices[3][0], vertices[3][1], vertices[3][2]),

      new THREE.Vector3(vertices[4][0], vertices[4][1], vertices[4][2]), // 4
      new THREE.Vector3(vertices[5][0], vertices[5][1], vertices[5][2]),
      new THREE.Vector3(vertices[6][0], vertices[6][1], vertices[6][2]),
      new THREE.Vector3(vertices[7][0], vertices[7][1], vertices[7][2]),
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
      [[7, 1], [6, 1], [5, 1], [4, 1]],
      [[8, 0], [4, 0], [9, 1], [0, 1]],
      [[9, 0], [5, 0], [10, 1], [1, 1]],
      [[10, 0], [6, 0], [11, 1], [2, 1]],
      [[11, 0], [7, 0], [8, 1], [3, 1]],
    ],
    volumes: [
      [[0, 0], [1, 0], [2, 0], [3, 0], [4, 0], [5, 0]],
    ],
    groups: [],
  }

  return mesh
}
