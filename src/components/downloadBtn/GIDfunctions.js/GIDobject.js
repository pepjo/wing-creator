
import * as template from './templateStrings'

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
      face.findIndex((vertex) => (vertex === jSeg)) !== -1
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

  generateFaces () {
    return this.objects.reduce((faces, object, i) => (
      faces.concat(
        object.faces.map((face, j) => (
          this.generateFace(i, j, face)
        ))
      )
    ), []).join('')
  }

  generateFace (iObj, jFac, face) {

  }

  generateString () {
    let geo = ''

    geo += template.header
    geo += this.generateVertices()
    geo += this.generateSegments()
    // geo += this.generateFaces()
    geo += template.footer

    return geo
  }
  
  generateFile () {
    
  }
}
