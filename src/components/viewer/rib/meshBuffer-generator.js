
import THREE from 'three'
import math from 'mathjs'

const distributionFunctions = {
  equal: (x) => (x),
  // TODO: implement this
  sin: () => {throw Error('Sin not yet implemented!')},
}

function pointsGenerator (airfoilFunction, n, distribution, interpolation) {
  const x = (math.range(0, 1, 1 / (n - 1))).toArray()
  const data = [[1, 0]]

  for (let i = x.length - 1; i >= 0; i--) {
    const xx = distributionFunctions[distribution](x[i])
    data.push([xx, airfoilFunction(xx, 'extrados', interpolation)])
  }
  for (let i = 0; i < x.length; i++) {
    const xx = distributionFunctions[distribution](x[i])
    data.push([xx, airfoilFunction(xx, 'intrados', interpolation)])
  }

  return data
}

export default function ribsGenerator (airfoilFunction, nPoints, distribution, interpolation) {
  const data = pointsGenerator(airfoilFunction, nPoints, distribution, interpolation)

  // Console.log a Matlab compatible version of the points
  // console.log('data', data.reduce((s, i) => (s + i[0] + ',' + i[1] + ';'), ''))

  // Every three vertexPositions is a face
  const vertexPositions = []
  for (let i = 1, len = data.length - 1; i < len; i++) {
    const j = i * 3
    vertexPositions[j + 0] = [data[0][0], data[0][1], 0]
    vertexPositions[j + 1] = [data[i][0], data[i][1], 0]
    vertexPositions[j + 2] = [data[i + 1][0], data[i + 1][1], 0]
  }

  const vertices = new Float32Array(vertexPositions.length * 3) // three components per vertex

  // components of the position vector for each vertex are stored
  // contiguously in the buffer.
  for (let i = 0; i < vertexPositions.length; i++) {
    vertices[i * 3 + 0] = vertexPositions[i][0]
    vertices[i * 3 + 1] = vertexPositions[i][1]
    vertices[i * 3 + 2] = vertexPositions[i][2]
  }

  return vertices
}
