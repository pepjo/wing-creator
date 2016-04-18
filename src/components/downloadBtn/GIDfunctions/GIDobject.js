
// import * as testData from './__test__/GIDobject.data'
import * as template from './templateStrings'
import math from 'mathjs'

export default class {
  constructor (objects) {
    this.objects = objects || {}

    this.generateFile = this.generateFile.bind(this)
    this.generateVertices = this.generateVertices.bind(this)
    this.generateSegments = this.generateSegments.bind(this)
    this.generateFaces = this.generateFaces.bind(this)
    this.generateVertex = this.generateVertex.bind(this)
    this.generateSegment = this.generateSegment.bind(this)
    this.generateFace = this.generateFace.bind(this)
    this.vertexDependencyCounter = this.vertexDependencyCounter.bind(this)
    this.segmentDependencyCounter = this.segmentDependencyCounter.bind(this)
    this.generateFile = this.generateFile.bind(this)
  }

  vertexDependencyCounter (iObj, jVer) {
    return this.objects[iObj].segments.filter((segment) => (
      segment.findIndex((vertex) => (vertex === jVer)) !== -1
    )).length
  }

  generateVertices () {
    let nVertices = -1 // So when we nVertices ++ first will become 0

    return this.objects.reduce((vertices, object, i) => (
      vertices.concat(
        object.vertices.map((vertex, j) => {
          nVertices++
          return this.generateVertex(nVertices, i, j, vertex)
        })
      )
    ), []).join('')
  }

  generateVertex (n, iObj, jVer, vertex) {
    return `1 ${n + 1} 0 ${iObj + 1} ${this.vertexDependencyCounter(iObj, jVer)} 0 0 ${iObj + 1} 0
${vertex[0]} ${vertex[1]} ${vertex[2]}
`
  }

  segmentDependencyCounter (iObj, jSeg) {
    return this.objects[iObj].faces.filter((face) => (
      face.findIndex((segment) => (
        segment[0] === jSeg
      )) !== -1
    )).length
  }

  generateSegments () {
    let nSegments = -1 // So when we nVertices ++ first will become 0

    return this.objects.reduce((segments, object, i) => (
      segments.concat(
        object.segments.map((segment, j) => {
          nSegments++
          return this.generateSegment(nSegments, i, j, segment)
        })
      )
    ), []).join('')
  }

  generateSegment (n, iObj, jSeg, segment) {
    return `2 ${n + 1} 0 ${iObj + 1} ${this.segmentDependencyCounter(iObj, jSeg)} 0 0 ${iObj + 1} 0
${segment[0] + 1} ${segment[1] + 1}
`
  }

  faceDependencyCounter (iObj, jFac) {
    return 0
  }

  faceCenterCalculator (iObj, face) {
    const points = []
    face.forEach((segment) => {
      const seg = this.objects[iObj].segments[segment[0]]
      if (typeof points.find((x) => (x === seg[0])) === 'undefined') {
        points.push(seg[0])
      }
      if (typeof points.find((x) => (x === seg[1])) === 'undefined') {
        points.push(seg[1])
      }
    })
    return points.reduce((all, point) => {
      const p = this.objects[iObj].vertices[point]
      return [all[0] + p[0], all[1] + p[1], all[2] + p[2]]
    }, [0, 0, 0]).map((x) => (`${x / points.length} `)).join('').trim()
  }

  faceNormalCalculator (iObj, face) {
    const points = []

    if (face[0][1] === 1) {
      const seg = this.objects[iObj].segments[face[0][0]]
      points.push(this.objects[iObj].vertices[seg[0]])
      points.push(this.objects[iObj].vertices[seg[1]])
    } else {
      const seg = this.objects[iObj].segments[face[0][0]]
      points.push(this.objects[iObj].vertices[seg[1]])
      points.push(this.objects[iObj].vertices[seg[0]])
    }

    if (face[1][1] === 1) {
      const seg = this.objects[iObj].segments[face[1][0]]
      points.push(this.objects[iObj].vertices[seg[1]])
    } else {
      const seg = this.objects[iObj].segments[face[1][0]]
      points.push(this.objects[iObj].vertices[seg[0]])
    }

    const v1 = math.add(points[1], math.multiply(points[0], -1))
    const v2 = math.add(points[2], math.multiply(points[1], -1))

    return math.cross(v1, v2).map((x) => `${x} `).join('').trim()
  }

  generateFaces () {
    let nFaces = -1 // So when we nVertices ++ first will become 0

    return this.objects.reduce((faces, object, i) => (
      faces.concat(
        object.faces.map((face, j) => {
          nFaces++
          return this.generateFace(nFaces, i, j, face)
        })
      )
    ), []).join('')
  }

  generateFace (n, iObj, jFac, face) {
    return `5 ${n + 1} 0 ${iObj + 1} ${this.faceDependencyCounter(iObj, jFac)} 0 0 ${iObj + 1} 0
${face.length}
${face.map((f) => (`${f[0] + 1} `)).join('').trim()}
${face.map((f) => (`${f[1]} `)).join('').trim()}
${this.faceCenterCalculator(iObj, face)}
${this.faceNormalCalculator(iObj, face)}
`
  }

  generateString () {
    let geo = ''

    geo += template.header
    geo += this.generateVertices()
    geo += this.generateSegments()
    geo += this.generateFaces()
    geo += template.footer
    // geo += testData.header
    // geo += testData.verticesText
    // geo += testData.segmentsText
    // geo += testData.facesText
    // geo += testData.footer

    return geo
  }

  generateFile () {
    const str = this.generateString()

    const buf = new ArrayBuffer(str.length + 1)
    const bufView = new Uint8Array(buf)
    for (let i = 0, strLen = str.length; i < strLen + 1; i++) {
      if (i < strLen - 147) {
        bufView[i] = str.charCodeAt(i)
      } else if (i === strLen - 147) {
        bufView[i] = 0
      } else {
        bufView[i] = str.charCodeAt(i - 1)
      }
    }

    return new Blob([buf], { type: 'text/plain;charset=us-ascii' })
  }
}
