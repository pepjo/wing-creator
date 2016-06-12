
// import * as testData from './__test__/GIDobject.data'
import * as template from './templateStrings'
import math from 'mathjs'
import JSZip from 'jszip'
import xml from 'xmlbuilder'

// Files
import kratoskmdb from './auxiliar-files/kratos.kmdb'
import kratosspdstr from './auxiliar-files/kratos-str.spd'
import kratosspdflu from './auxiliar-files/kratos-flu.spd'

export default class gidObject {
  constructor (objects, problemType, files) {
    this.objects = objects || {}
    this.problemType = problemType || 'NONE'
    this.files = files

    this.deleteDuplicateSegments = this.deleteDuplicateSegments.bind(this)
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
    this.generatePressuresFile = this.generatePressuresFile.bind(this)
    this.generateKratosPrjFile = this.generateKratosPrjFile.bind(this)
    this.parseGroupEntities = this.parseGroupEntities.bind(this)
    this.fillXmlEntitiesGroup = this.fillXmlEntitiesGroup.bind(this)
    this.convertToKratosGroup = this.convertToKratosGroup.bind(this)

    this.deleteDuplicateSegments()
  }

  deleteDuplicateSegments () {
    this.objects = this.objects.map((obj, i) => {
      if (i === 0) return obj // Skip the first one (no need to check if there is only 1)
      if (typeof obj.useVerticesFrom === 'undefined') return obj

      const totalSegments = obj.segments.length
      const obj2 = this.objects[obj.useVerticesFrom]
      const move = []
      const moveCount = []

      obj.segments = obj.segments.filter((seg, k) => ( // eslint-disable-line
        // For each segment of this object, keep the non-repeated
        obj2.segments.findIndex((seg2, l) => { // See if the segment is repeated
          if (seg2[0] === seg[0] && seg[1] === seg2[1]) {
            move.push({ fromS: k, toS: l })
            moveCount[k] = true
            return true
          }
          return false
        }) === -1
      ))

      let tmpCount = 0
      for (let j = 0; j < totalSegments; j++) {
        if (moveCount[j]) tmpCount++
        moveCount[j] = tmpCount
      }

      obj.faces = obj.faces.map((face) => ( // eslint-disable-line
        face.map((seg) => {
          const m = move.find((mo) => (mo.fromS === seg[0]))
          if (m === undefined) {
            return [seg[0] - moveCount[seg[0]], seg[1]]
          }

          return [{ seg: m.toS }, seg[1]]
        })
      ))

      return obj
    })
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
    const objs = [{ isThis: true, obj: this.objects[iObj] }]
    .concat(this.objects.reduce((all, obj) => (
      obj.useVerticesFrom === iObj ? [...all, { isThis: false, obj }] : all
    ), []))

    return objs.map((obj) => (
      obj.isThis ?
        obj.obj.faces.filter((face) => (
          face.findIndex((segment) => (
            segment[0] === jSeg
          )) !== -1
        )).length :
        obj.obj.faces.filter((face) => (
          face.findIndex((segment) => (
            segment[0].seg === jSeg
          )) !== -1
        )).length
    )).reduce((all, o) => (all + o))
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
      if (typeof segment[0] === 'object') {
        const seg = this.objects[this.objects[iObj].useVerticesFrom].segments[segment[0].seg]

        points.push({ obj: this.objects[iObj].useVerticesFrom, point: seg[0] })
        points.push({ obj: this.objects[iObj].useVerticesFrom, point: seg[1] })
      } else {
        const seg = this.objects[iObj].segments[segment[0]]

        points.push({ obj: iObj, point: seg[0] })
        points.push({ obj: iObj, point: seg[1] })
      }
    })

    const vector = points.reduce((all, point) => {
      const p = this.objects[point.obj].vertices[point.point]
      return [all[0] + p[0], all[1] + p[1], all[2] + p[2]]
    }, [0, 0, 0])
    .map((x) => (x / points.length))

    if (returnVector) {
      return vector
    }

    return vector.join(' ')
  }

  faceNormalCalculator (iObj, face) {
    const points = []

    const seg1 = typeof face[0][0] === 'object' ?
      this.objects[this.objects[iObj].useVerticesFrom].segments[face[0][0].seg] :
      this.objects[iObj].segments[face[0][0]]
    const seg2 = typeof face[1][0] === 'object' ?
      this.objects[this.objects[iObj].useVerticesFrom].segments[face[1][0].seg] :
      this.objects[iObj].segments[face[1][0]]

    if (face[0][1] === 0) {
      points.push(this.objects[iObj].vertices[seg1[0]])
      points.push(this.objects[iObj].vertices[seg1[1]])
    } else {
      points.push(this.objects[iObj].vertices[seg1[1]])
      points.push(this.objects[iObj].vertices[seg1[0]])
    }

    if (face[1][1] === 0) {
      points.push(this.objects[iObj].vertices[seg2[1]])
    } else {
      points.push(this.objects[iObj].vertices[seg2[0]])
    }

    const v1 = math.add(points[1], math.multiply(points[0], -1))
    const v2 = math.add(points[2], math.multiply(points[1], -1))

    const normal = math.cross(v1, v2)
    const normalized = math.divide(normal, math.norm(normal))

    return normalized.join(' ')
  }

  faceAreaCalculator (iObj, face) {
    const points = []
    const triangles = []

    if (face.length === 4) {
      const seg1 = typeof face[0][0] === 'object' ?
        this.objects[this.objects[iObj].useVerticesFrom].segments[face[0][0].seg] :
        this.objects[iObj].segments[face[0][0]]
      const seg2 = typeof face[2][0] === 'object' ?
        this.objects[this.objects[iObj].useVerticesFrom].segments[face[2][0].seg] :
        this.objects[iObj].segments[face[2][0]]

      if (face[0][1] === 0) {
        points.push(this.objects[iObj].vertices[seg1[0]])
        points.push(this.objects[iObj].vertices[seg1[1]])
      } else {
        points.push(this.objects[iObj].vertices[seg1[1]])
        points.push(this.objects[iObj].vertices[seg1[0]])
      }

      if (face[1][1] === 0) {
        points.push(this.objects[iObj].vertices[seg2[0]])
        points.push(this.objects[iObj].vertices[seg2[1]])
      } else {
        points.push(this.objects[iObj].vertices[seg2[1]])
        points.push(this.objects[iObj].vertices[seg2[0]])
      }

      triangles.push([points[0], points[1], points[2]])
      triangles.push([points[0], points[3], points[2]])
    } else {
      throw new Error(`Calculation of area of a ${face.length} sided face is not implemented`)
    }

    const sides = triangles.map((triangle) => (
      [
        math.add(triangle[0], math.multiply(triangle[1], -1)),
        math.add(triangle[1], math.multiply(triangle[2], -1)),
        math.add(triangle[2], math.multiply(triangle[0], -1)),
      ]
    ))

    const sidesLen = sides.map((side) => (
      [
        math.norm(side[0], 3),
        math.norm(side[1], 3),
        math.norm(side[2], 3),
      ]
    ))

    const halfP = sidesLen.map((side) => (
      (side[0] + side[1] + side[2]) / 2
    ))

    return halfP.reduce((total, s, i) => (
      total + (math.sqrt(s * (s - sidesLen[i][0]) * (s - sidesLen[i][1]) * (s - [sidesLen[i][2]])))
    ), 0)
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
${face.map((f) => (
  // FIX: We only can do this if useVerticesFrom = 0
  typeof f[0] === 'object' ? f[0].seg + 1 : f[0] + 1 + objPrevS
)).join(' ')}
${face.map((f) => (f[1])).join(' ')}
${this.faceCenterCalculator(iObj, face)}
${this.faceNormalCalculator(iObj, face)}
`
  }

  volumeCenterCalculator (iObj, volume) {
    return volume.map((face) => (
      this.faceCenterCalculator(iObj, this.objects[iObj].faces[face[0]], true)
    )).reduce((prev, current) => (math.add(prev, current)))
    .map((coord) => (coord / volume.length)).join(' ')
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
${volume.map((f) => (f[0] + 1 + objPrevF)).join(' ')}
${volume.map((f) => (f[1])).join(' ')}
${this.volumeCenterCalculator(iObj, volume)}
`
  }

  generateLayersString () {
    return this.objects.map((o, i) => (`${i + 1} ${o.layer}`)).join('\n')
  }

  generateString () {
    let geo = ''
    let header

    if (this.problemType === 'KRATOS_structural' || this.problemType === 'KRATOS_fluid') {
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
          xmlgroup.push(groups.ele('group', {
            id: nGroups, name: group.name, color: `${group.color}ff`,
          }))
        })
      }
    })

    // Add AllSurfaces group
    nGroups++
    xmlgroup.push(groups.ele('group', { id: nGroups, name: 'AllSurfaces', color: '#999999ff' }))
    data.surfaces[nGroups] = math.range(
      0,
      this.objects.reduce((sum, obj) => (
        sum + obj.faces.length
      ), 0)
    )._data

    if (xmleGroup.points) {
      const kratos = this.convertToKratosGroup(data.points)
      this.populateXmlEntitiesGroup(xmleGroup.points, kratos)
    }

    if (xmleGroup.surfaces) {
      const kratos = this.convertToKratosGroup(data.surfaces)
      this.populateXmlEntitiesGroup(xmleGroup.surfaces, kratos)
    }

    if (this.files) {
      const nodes = this.files.prj.data.match(
        /<entities_group name="nodes">([\S\s]*?)<\/entities_group>/
      )[1]
      eGroups.r(`<entities_group name="nodes">${nodes}</entities_group>`)

      const elements = this.files.prj.data.match(
        /<entities_group name="elements">([\S\s]*?)<\/entities_group>/
      )[1]
      eGroups.r(`<entities_group name="elements">${elements}</entities_group>`)
    }

    if (groups.children.length > 0) {
      return prj.end({ pretty: true })
    }
    return null
  }

  generatePressuresFile () {
    return this.generatePressuresData()
    .reduce((total, press, i) => (
      /* eslint-disable */
      `${total}${i + 1}\t${press.value}\t${press.area}\t${press.normal.replace(' ', '\t').replace(' ', '\t')}\r\n`
      /* eslint-enable */
    ), '')
  }

  generatePressuresData () {
    // This generates a pressures file, not for Kratos but for me
    const pressures = []

    for (const object of this.objects) {
      if (object.loads instanceof Array) {
        for (const load of object.loads) {
          if (load.type === 'SurfacePressureLoad3D') {
            const temp = {
              group: load.goupName,
              value: load.pressureValue,
            }
            pressures.push(temp)
          } else {
            throw new Error('Load type not yet implemented')
          }
        }
      }
    }

    return pressures.map((press) => (
      Object.assign({}, press, {
        group: this.objects.reduce((obj, object, i) => {
          if (typeof object.groups !== 'undefined') {
            const g = object.groups.find((group) => {
              if (group.name === press.group) {
                return true
              }
              return obj
            })
            if (g) {
              return Object.assign(g, {
                iObj: i,
              })
            }
            return obj
          }
          return obj
        }, false),
      })
    ))
    .map((press) => (
      Object.assign({}, press, {
        face: press.group.entities.map((entity) => (
          this.objects[press.group.iObj].faces[entity]
        ))[0],
      })
    ))
    .map((press) => (
      Object.assign({}, press, {
        normal: this.faceNormalCalculator(press.group.iObj, press.face),
        area: this.faceAreaCalculator(press.group.iObj, press.face),
      })
    ))
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

    const groups = `${this.objects.reduce((string, object) => {
      let s = string
      if (typeof object.groups !== 'undefined') {
        object.groups.forEach((group) => {
          s += `<Group id="${group.name}" color="{${group.color}}" state="1" type="Generic"/>
`
        })
      }
      return s
    }, '')}<Group id="AllSurfaces" color="{#999999}" state="1" type="Generic"/>
`

    const displacementsBC = this.objects.reduce((string, object) => {
      let s = string
      if (typeof object.boundaryConditions !== 'undefined') {
        object.boundaryConditions.forEach((bc) => {
          if (bc.type === 'Displacements') {
            /* eslint-disable */
            s += `<Container id="internalRoot" pid="internalRoot" class="Group" icon="groupsTree.gif" help="Activation" open="1" active="1">
    <Container id="Values" pid="Values" help="Set the values" open="0">
        <Item id="Vx" pid="X" dv="${bc.x}" help="X coordinate" state="normal"/>
        <Item id="Vy" pid="Y" dv="${bc.y}" help="Y coordinate" state="normal"/>
        <Item id="Vz" pid="Z" dv="${bc.z}" nDim="3D" help="Z coordinate" state="disabled"/>
    </Container>
    <Container id="Activation" pid="Fixed" help="Fix/release some degree of freedom" open="0">
        <Item id="Ax" pid="X active" dv="${bc.fx}" ivalues="1,0" values="1,0" help="Fix X degree of freedom"/>
        <Item id="Ay" pid="Y active" dv="${bc.fy}" ivalues="1,0" values="1,0" help="Fix Y degree of freedom"/>
        <Item id="Az" pid="Z active" dv="${bc.fz}" nDim="3D" ivalues="1,0" values="1,0" help="Fix Z degree of freedom"/>
    </Container>
</Container>
`
          /* eslint-enable */
          }
        })
      }
      return s
    }, '')

    const properties = this.objects.reduce((string, object) => {
      let s = string
      if (typeof object.properties !== 'undefined') {
        object.properties.forEach((property) => {
          /* eslint-disable */
          s += `<Container id="${property.name}" pid="${property.name}" class="Property" icon="propsTree.gif" help="Property" open="0">
    <Container id="MainProperties" pid="New property" state="hidden" help="Values">
        <Item id="ElemType" pid="Property type" dv="${property.element}" state="normal" ivalues="Beam,Shell,Membrane,Solid" values="Beam,Shell,Membrane,Solid" help="Element type"/>
        <Item id="MatModel" pid="Constitutive law" state="normal" dv="Elastic-Isotropic" GCV="MatModel" help="Material model"/>
        <Item id="Material" pid="Material" dv="${property.material}" state="normal" GCV="Materials" help="Material"/>
        <Item id="Thickness" pid="Thickness" state="normal" dv="1.0" help="Thickness"/>
        <Item id="SectionType" pid="Section type" state="normal" dv="UserDefined" GCV="SectType" help="Select the section type"/>
        <Item id="ProfileDB" pid="Profile list" state="normal" dv="" GCV="ProfileType" help="Select the profile from the list"/>
        <Item id="Area" pid="Area" dv="1.0" state="normal" help="Cross section area"/>
        <Item id="InertiaIx" pid="Inertia Ix" state="normal" dv="1.0" help="Moment of inertia Ix"/>
        <Item id="InertiaIy" pid="Inertia Iy" state="normal" dv="1.0" help="Moment of inertia Iy"/>
        <Item id="RectangularHeight" pid="Height" state="normal" dv="1.0" help="Height value"/>
        <Item id="RectangularWidth" pid="Width" state="normal" dv="1.0" help="Width value"/>
        <Item id="CircularDiameter" pid="Diameter" state="normal" dv="1.0" help="Diameter value"/>
    </Container>
</Container>
`
        /* eslint-enable */
        })
      }
      return s
    }, '')

    const elements = this.objects.reduce((string, object) => {
      let s = string
      if (typeof object.elements !== 'undefined') {
        object.elements.forEach((element) => {
          /* eslint-disable */
          s += `<Container id="${element.group}" pid="${element.group}" class="Group" icon="groupsTree.gif" help="Thin shell formulation" open="1" active="1">
    <Container id="Properties" pid="Element Properties" state="hidden" help="Properties">
        <Item id="ElementType" pid="Element type" dv="${element.element}" ivalues="Triangle" values="Triangle" help="Element Type"/>
        <Item id="Property" pid="Property" dv="${element.property}" GCV="Properties" help="Property"/>
    </Container>
</Container>
`
        /* eslint-enable */
        })
      }
      return s
    }, '')

    if (this.problemType === 'KRATOS_structural') {
      return kratosspdstr
        .replace('{{pressureContent}}', content)
        .replace('{{GroupsContent}}', groups)
        .replace('{{DisplacementsBCcontent}}', displacementsBC)
        .replace('{{propertiesContent}}', properties)
        .replace('{{shellElements}}', elements)
    } else if (this.problemType === 'KRATOS_fluid') {
      return kratosspdflu.replace('{{GroupsContent}}', groups)
    }
    throw new Error('Problem type not implemented')
  }

  // Returns blob in a promise
  generateProjectZip (filename) {
    const zip = new JSZip()
    const file = this.generateFile()

    const gid = zip.folder(`${filename}.gid`)
    gid.file(`${filename}.geo`, file)

    if (this.problemType === 'KRATOS_structural' || this.problemType === 'KRATOS_fluid') {
      gid.file(`${filename}.kmdb`, kratoskmdb)

      const kratosspdfile = this.generareSpdFile()
      if (kratosspdfile) {
        gid.file(`${filename}.spd`, kratosspdfile)
      }

      const prj = this.generateKratosPrjFile()
      if (prj) {
        gid.file(`${filename}.prj`, prj)
      }

      const pressuresF = this.generatePressuresFile()
      if (pressuresF) {
        gid.file(`${filename}.pressures.out.dat`, pressuresF)
      }
    }

    if (this.files) {
      gid.file(`${filename}.msh`, this.files.msh.data)
    }

    return zip.generateAsync({ type: 'blob' })
  }
}
