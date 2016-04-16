
import THREE from 'three'
import math from 'mathjs'

const distributionFunctions = {
  equal: (x) => (x),
  // TODO: implement this
  sin: () => {throw Error('Sin not yet implemented!')},
}

function imposePoints (points, imposed) {
  for (let j = 0, o = imposed.length; j < o; j++) {
    for (let i = 1; i < points.length; i++) {
      if (points[i] > imposed[j] && points[i - 1] < imposed[j]) {
        points.splice(i, 0, imposed[j])
        break
      }
    }
  }
  return points
}

function pointsGenerator (airfoilFunction, n, distribution, interpolation, imposedPoints) {
  const x = imposePoints(
    (math.range(0, 1, 1 / (n / 2 - 1 - imposePoints.length))).toArray(),
    imposedPoints,
  )
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

export default function (airfoilFunction, nPoints, distribution, interpolation, imposedPoints) {
  const data = pointsGenerator(airfoilFunction, nPoints, distribution, interpolation, imposedPoints)

  // Console.log a Matlab compatible version of the points
  // console.log('data', data.reduce((s, i) => (s + i[0] + ',' + i[1] + ';'), ''))

  const vertices = data.map((point) => (new THREE.Vector3(point[0], point[1], 0)))

  const faces = []

  for (let i = 1, len = data.length - 1; i < len; i++) {
    faces.push(new THREE.Face3(0, i, i + 1))
  }

  return {
    vertices,
    faces,
  }
}
