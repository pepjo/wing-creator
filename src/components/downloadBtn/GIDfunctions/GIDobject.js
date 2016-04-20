
// import * as testData from './__test__/GIDobject.data'
import * as template from './templateStrings'
import math from 'mathjs'
import JSZip from 'jszip'
import xml from 'xmlbuilder'

// Files
import kratoskmdb from './auxiliar-files/kratos.kmdb'
import kratosspd from './auxiliar-files/kratos.spd'

export default class {
  constructor (objects, problemType) {
    this.objects = objects || {}
    this.problemType = problemType || 'NONE'

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
    this.generateLayersString = this.generateLayersString.bind(this)
  }

  vertexDependencyCounter (iObj, jVer) {
    return this.objects[iObj].segments.filter((segment) => (
      segment.findIndex((vertex) => (vertex === jVer)) !== -1
    )).length
  }

  generateVertices () {
    let nVertices = -1 // So when we nVertices ++ first will become 0

    return this.objects.reduce((vertices, object, i) => {
      if (typeof object.useVerticesFrom === 'undefined') {
        return vertices.concat(
          object.vertices.map((vertex, j) => {
            nVertices++
            return this.generateVertex(nVertices, i, j, vertex)
          })
        )
      }
      return vertices
    }, []).join('')
  }

  generateVertex (n, iObj, jVer, vertex) {
    return `1 ${n + 1} 0 0 ${this.vertexDependencyCounter(iObj, jVer)} 0 0 ${iObj + 1} 0
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

    return this.objects.reduce((segments, object, i) => {
      const useVerticesFrom = typeof object.useVerticesFrom === 'undefined'
        ? i : object.useVerticesFrom

      const objPrevV = this.objects
        .filter((o, iO) => (iO < useVerticesFrom))
        .filter((o) => (typeof o.useVerticesFrom === 'undefined'))
        .reduce((a, o) => (a + o.vertices.length), 0)

      return segments.concat(
        object.segments.map((segment, j) => {
          nSegments++
          return this.generateSegment(nSegments, objPrevV, i, j, segment)
        })
      )
    }, []).join('')
  }

  generateSegment (n, objPrevV, iObj, jSeg, segment) {
    return `2 ${n + 1} 0 0 ${this.segmentDependencyCounter(iObj, jSeg)} 0 0 ${iObj + 1} 0
${segment[0] + 1 + objPrevV} ${segment[1] + 1 + objPrevV}
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

    if (face[1][1] === 0) {
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

    return this.objects.reduce((faces, object, i) => {
      const objPrevS = this.objects
        .filter((o, iO) => (iO < i))
        .reduce((a, o) => (a + o.segments.length), 0)
      return faces.concat(
        object.faces.map((face, j) => {
          nFaces++
          return this.generateFace(nFaces, objPrevS, i, j, face)
        })
      )
    }, []).join('')
  }

  generateFace (n, objPrevS, iObj, jFac, face) {
    return `5 ${n + 1} 0 0 ${this.faceDependencyCounter(iObj, jFac)} 0 0 ${iObj + 1} 0
${face.length}
${face.map((f) => (`${f[0] + 1 + objPrevS} `)).join('').trim()}
${face.map((f) => (`${f[1]} `)).join('').trim()}
${this.faceCenterCalculator(iObj, face)}
${this.faceNormalCalculator(iObj, face)}
`
  }

  generateLayersString () {
    return this.objects.map((o, i) => (`${i + 1} ${o.layer}`)).join('\n')
  }

  generateString () {
    let geo = ''
    let header

    if (this.problemType === 'KRATOS_structural') {
      header = template.header
        .replace('UNKNOWN', 'kratos.gid\\Kratos\\kratos')
    } else {
      header = template.header
    }

    geo += header.replace('$LAYERS', this.generateLayersString())
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

  stringifyXMLGroup (group, id, iObj, groups, eGroups) {
    const j = eGroups.children.length
    const le = group.entities.reduce((total, ent) => (
      total + (ent[1] - ent[0]) + 1
    ), 0)
    let offset = 0

    if (group.type === 'points' && iObj !== 0) {
      offset = this.objects
        .filter((o, iO) => (iO < iObj))
        .reduce((a, o) => (a + o.vertices.length), 0)
    } else if (group.type === 'segments' && iObj !== 0) {
      offset = this.objects
        .filter((o, iO) => (iO < iObj))
        .reduce((a, o) => (a + o.segments.length), 0)
    } else if (group.type === 'faces' && iObj !== 0) {
      offset = this.objects
        .filter((o, iO) => (iO < iObj))
        .reduce((a, o) => (a + o.faces.length), 0)
    }

    groups.ele('group', { id, name: group.name, color: group.color })
    eGroups.ele('entities_group', { name: group.type })

    eGroups.children[j].ele(
      'vector',
      { name: 'entity_ids', length: le, type: 'integer' },
      group.entities.reduce((s, ent) => (
        `${s} ${ent[0] + offset + 1}:${ent[1] + offset + 1}`
      ), '').trim()
    )
    eGroups.children[j].ele(
      'vector',
      { name: 'entity_num_groups', length: le, type: 'ushort' },
      `1x${le}`
    )
    eGroups.children[j].ele(
      'vector',
      { name: 'entity_groups', length: le, type: 'ushort' },
      `1x${le}`
    )
  }

  generateKratosPrjFile () {
    const prj = xml.create('gid')
    prj.att('version', '11.1')
    const pre = prj.ele('pre')
    const groups = pre.ele('groups')
    const eGroups = pre.ele('entities_groups')
    let nGroups = 0

    this.objects.forEach((object, iObj) => {
      if (typeof object.groups !== 'undefined') {
        object.groups.forEach((group) => {
          if (group.type === 'points') {
            nGroups++
            this.stringifyXMLGroup(
              group,
              nGroups,
              object.useVerticesFrom || iObj,
              groups,
              eGroups,
            )
          } else {
            throw new Error('not yet implemented')
          }
        })
      }
    })

    if (groups.children.length > 0) {
      return prj.end({ pretty: true })
    }
    return null
  }

  // Returns blob in a promise
  generateProjectZip (filename) {
    const zip = new JSZip()
    const file = this.generateFile()

    const gid = zip.folder(`${filename}.gid`)
    gid.file(`${filename}.geo`, file)

    if (this.problemType === 'KRATOS_structural') {
      gid.file(`${filename}.kmdb`, kratoskmdb)
      gid.file(`${filename}.spd`, kratosspd)

      const prj = this.generateKratosPrjFile()
      if (prj) {
        gid.file(`${filename}.prj`, prj)
      }
    }

    return zip.generateAsync({ type: 'blob' })
  }
}
