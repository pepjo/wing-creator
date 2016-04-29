
// import * as testData from './__test__/GIDobject.data'
import * as template from './templateStrings'
import math from 'mathjs'
import JSZip from 'jszip'
import xml from 'xmlbuilder'

// Files
import kratoskmdb from './auxiliar-files/kratos.kmdb'
import kratosspd from './auxiliar-files/kratos.spd'

export default class gidObject {
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
    this.generateVolumes = this.generateVolumes.bind(this)
    this.generateVolume = this.generateVolume.bind(this)
    this.generareSpdFile = this.generareSpdFile.bind(this)
    this.parseGroupEntities = this.parseGroupEntities.bind(this)
    this.fillXmlEntitiesGroup = this.fillXmlEntitiesGroup.bind(this)
    this.convertToKratosGroup = this.convertToKratosGroup.bind(this)
  }

  vertexDependencyCounter (iObj, jVer) {
    const objs = [this.objects[iObj]].concat(this.objects.reduce((all, obj) => (
      obj.useVerticesFrom === iObj ? [...all, obj] : all
    ), []))

    return objs.map((obj) => (
      obj.segments.filter((segment) => (
        segment.findIndex((vertex) => (vertex === jVer)) !== -1
      )).length
    )).reduce((all, o) => (all + o))
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
${vertex[0].toFixed(6)} ${vertex[1].toFixed(6)} ${vertex[2].toFixed(6)}
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
    return this.objects[iObj].volumes.filter((volume) => (
      volume.findIndex((face) => (
        face[0] === jFac
      )) !== -1
    )).length
  }

  faceCenterCalculator (iObj, face, returnVector) {
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

    const vector = points.reduce((all, point) => {
      const p = this.objects[iObj].vertices[point]
      return [all[0] + p[0], all[1] + p[1], all[2] + p[2]]
    }, [0, 0, 0])
    .map((x) => (x / points.length))

    if (returnVector) {
      return vector
    }

    return vector.map((x) => (`${x} `)).join('').trim()
  }

  faceNormalCalculator (iObj, face) {
    const points = []

    if (face[0][1] === 0) {
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

    const normal = math.cross(v1, v2)
    const normalized = math.divide(normal, math.norm(normal))

    return normalized.map((x) => `${x} `).join('').trim()
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

  volumeCenterCalculator (iObj, volume) {
    return volume.map((face) => (
      this.faceCenterCalculator(iObj, this.objects[iObj].faces[face[0]], true)
    )).reduce((prev, current) => (math.add(prev, current)))
    .map((coord) => (`${coord / volume.length} `)).join('').trim()
  }

  generateVolumes () {
    let nVolumes = -1 // So when we nVertices ++ first will become 0

    return this.objects.reduce((volumes, object, i) => {
      const objPrevF = this.objects
        .filter((o, iO) => (iO < i))
        .reduce((a, o) => (a + o.faces.length), 0)
      return volumes.concat(
        object.volumes.map((volume, j) => {
          nVolumes++
          return this.generateVolume(nVolumes, objPrevF, i, j, volume)
        })
      )
    }, []).join('')
  }

  generateVolume (n, objPrevF, iObj, jVol, volume) {
    return `9 ${n + 1} 0 0 0 0 0 ${iObj + 1} 0
${volume.length}
${volume.map((f) => (`${f[0] + 1 + objPrevF} `)).join('').trim()}
${volume.map((f) => (`${f[1]} `)).join('').trim()}
${this.volumeCenterCalculator(iObj, volume)}
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
    geo += this.generateVolumes()
    geo += template.footer
    // geo += testData.header
    // geo += testData.verticesText
    // geo += testData.segmentsText
    // geo += testData.facesText
    // geo += testData.volumesText
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

  parseGroupEntities (type, entities, iObj) {
    let offset = 0

    if (type === 'points' && iObj !== 0) {
      offset = this.objects
        .filter((o, iO) => (iO < iObj))
        .reduce((a, o) => (a + o.vertices.length), 0)
    } else if (type === 'segments' && iObj !== 0) {
      offset = this.objects
        .filter((o, iO) => (iO < iObj))
        .reduce((a, o) => (a + o.segments.length), 0)
    } else if (type === 'surfaces' && iObj !== 0) {
      offset = this.objects
        .filter((o, iO) => (iO < iObj))
        .reduce((a, o) => (a + o.faces.length), 0)
    }

    return [].concat.apply([], entities.map((ent) => {
      if (ent instanceof Array) {
        return math.range(ent[0] + offset, ent[1] + offset, true)._data
      }
      return ent + offset
    }))
  }

  fillXmlEntitiesGroup (xmlTag) {
    xmlTag.ele(
      'vector',
      { name: 'entity_ids', length: 0, type: 'integer' }
    )
    xmlTag.ele(
      'vector',
      { name: 'entity_num_groups', length: 0, type: 'ushort' }
    )
    xmlTag.ele(
      'vector',
      { name: 'entity_groups', length: 0, type: 'ushort' }
    )
  }

  convertToKratosGroup (entities) {
    return entities.reduce((unique, group, i) => {
      if (group) {
        // For each entity
        for (const ent of group) {
          // If its not in ids
          const index = unique.ids.findIndex((uE) => (ent === uE))
          if (index === -1) {
            unique.ids.push(ent)
            unique.num.push(1)
            unique.groups.push([i])
          } else {
            unique.num[index] += 1 // eslint-disable-line
            unique.groups[index].push(i) // eslint-disable-line
          }
        }
      }
      return unique
    }, { ids: [], num: [], groups: [] })
  }

  populateXmlEntitiesGroup (xmleGroup, kratos) {
    xmleGroup.children[0].att('length', kratos.ids.length)
    xmleGroup.children[0].txt(kratos.ids.map((i) => (i + 1)).join(' '))

    xmleGroup.children[1].att('length', kratos.num.length)
    xmleGroup.children[1].txt(kratos.num.join(' '))

    let groups = []
    for (const group of kratos.groups) {
      if (group instanceof Array) {
        groups = groups.concat(group)
      } else {
        groups.push(group)
      }
    }
    xmleGroup.children[2].att('length', groups.length)
    xmleGroup.children[2].txt(groups.join(' '))
  }

  generateKratosPrjFile () {
    const prj = xml.create('gid')
    prj.att('version', '11.1')
    const pre = prj.ele('pre')
    const groups = pre.ele('groups')
    const xmlgroup = []
    const eGroups = pre.ele('entities_groups')
    const xmleGroup = {}

    const data = {
      points: [],
      segments: [],
      surfaces: [],
    }

    let nGroups = 0

    this.objects.forEach((object, iObj) => {
      if (typeof object.groups !== 'undefined') {
        object.groups.forEach((group) => {
          if (group.type === 'points') {
            nGroups++
            data.points[nGroups] = this.parseGroupEntities(
              'vertices',
              group.entities,
              object.useVerticesFrom || iObj
            )
            if (typeof xmleGroup.points === 'undefined') {
              xmleGroup.points = eGroups.ele('entities_group', { name: 'points' })
              this.fillXmlEntitiesGroup(xmleGroup.points)
            }
          } else if (group.type === 'surfaces') {
            nGroups++
            data.surfaces[nGroups] = this.parseGroupEntities(
              'surfaces',
              group.entities,
              iObj
            )
            if (typeof xmleGroup.surfaces === 'undefined') {
              xmleGroup.surfaces = eGroups.ele('entities_group', { name: 'surfaces' })
              this.fillXmlEntitiesGroup(xmleGroup.surfaces)
            }
          } else {
            throw new Error('not yet implemented')
          }
          xmlgroup.push(groups.ele('group', { id: nGroups, name: group.name, color: group.color }))
        })
      }
    })

    if (xmleGroup.points) {
      const kratos = this.convertToKratosGroup(data.points)
      this.populateXmlEntitiesGroup(xmleGroup.points, kratos)
    }

    if (xmleGroup.surfaces) {
      const kratos = this.convertToKratosGroup(data.surfaces)
      this.populateXmlEntitiesGroup(xmleGroup.surfaces, kratos)
    }

    if (groups.children.length > 0) {
      return prj.end({ pretty: true })
    }
    return null
  }

  // Returns a string with the xml spd file
  generareSpdFile () {
    let content = ''

    for (const object of this.objects) {
      if (object.loads instanceof Array) {
        for (const load of object.loads) {
          if (load.type === 'SurfacePressureLoad3D') {
            /* eslint-disable */
            content += `<Container id="${load.goupName}" pid="${load.goupName}" class="Group" icon="groupsTree.gif" help="Define the positive or negative face pressure" open="0" active="1">
  <Container id="MainProperties" pid="New property" state="hidden" help="Values">
    <Item id="FixPressure" pid="Fix pressure" dv="${load.fixPressure}" ivalues="1,0" values="1,0" help="Fix pressure"/>
    <Item id="PressureType" pid="Face type" dv="${load.pressureType}" ivalues="Positive,Negative" values="Positive,Negative" help="Defines which side of the face that matches the direction of the normal to the surface, positive or negative"/>
    <Item id="PressureValue" pid="Pressure value" dv="${load.pressureValue}" help="Pressure value"/>
  </Container>
</Container>
`
            /* eslint-enable */
          } else {
            throw new Error('Load type not yet implemented')
          }
        }
      }
    }

    return kratosspd.replace('{{pressureContent}}', content)
  }

  // Returns blob in a promise
  generateProjectZip (filename) {
    const zip = new JSZip()
    const file = this.generateFile()

    const gid = zip.folder(`${filename}.gid`)
    gid.file(`${filename}.geo`, file)

    if (this.problemType === 'KRATOS_structural') {
      gid.file(`${filename}.kmdb`, kratoskmdb)

      const kratosspdfile = this.generareSpdFile()
      if (kratosspdfile) {
        gid.file(`${filename}.spd`, kratosspdfile)
      }

      const prj = this.generateKratosPrjFile()
      if (prj) {
        gid.file(`${filename}.prj`, prj)
      }
    }

    return zip.generateAsync({ type: 'blob' })
  }
}
