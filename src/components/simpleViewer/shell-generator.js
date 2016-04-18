
import THREE from 'three'
import math from 'mathjs'

export const distributionFunctions = {
  equal: (x) => (x),
  sin: (x) => (math.cos((x - 2) * math.pi / 2) + 1),
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

// Fixes the inpressions ints might have.
// Me want real 0. and 1. not 0.999999 etc
function fix (x) {
  const pr = 1e14 // Precission
  return Math.round(x * pr) / pr
}

function pointsGenerator (airfoilFunction, n, distribution, imposedPoints) {
  let lastX = 1
  let impoToBeFound = [...imposedPoints]
  const x = (math.range(0, 1, 1 / (n / 2 - imposePoints.length + 1))).toArray()
  const data = [new THREE.Vector3(1, 0, 0)]

  // Extrados
  for (let i = x.length - 1; i >= 0; i--) {
    const xx = distributionFunctions[distribution](fix(x[i]))

    // Add imposed points
    for (let j = 0; j < impoToBeFound.length; j++) {
      if (xx < impoToBeFound[j] && lastX > impoToBeFound[j]) {
        data.push(new THREE.Vector3(impoToBeFound[j], airfoilFunction(xx, 'extrados')))
        impoToBeFound.splice(j, 1)
      }
    }

    // Add point
    data.push(new THREE.Vector3(xx, airfoilFunction(xx, 'extrados')))
    lastX = xx
  }

  // Reset
  impoToBeFound = [...imposedPoints]

  // Intrados
  for (let i = 1, len = x.length; i < len; i++) {
    const xx = distributionFunctions[distribution](fix(x[i]))

    // Add imposed points
    for (let j = 0; j < impoToBeFound.length; j++) {
      if (xx > impoToBeFound[j] && lastX < impoToBeFound[j]) {
        data.push(new THREE.Vector3(impoToBeFound[j], airfoilFunction(xx, 'intrados')))
        impoToBeFound.splice(j, 1)
      }
    }

    data.push(new THREE.Vector3(xx, airfoilFunction(xx, 'intrados'), 0))
    lastX = xx
  }

  return data
}

export default function (airfoilFunction, nPoints, distribution, imposedPoints) {
  const data = pointsGenerator(airfoilFunction, nPoints, distribution, imposedPoints)

  // Console.log a Matlab compatible version of the points
  // console.log('data', data.reduce((s, i) => (s + i[0] + ',' + i[1] + ';'), ''))

  const vertices = data

  const faces = []

  for (let i = 1, len = data.length - 1; i < len; i++) {
    faces.push(new THREE.Face3(0, i, i + 1))
  }

  return {
    vertices,
    faces,
  }
}
