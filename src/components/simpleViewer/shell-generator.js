
import THREE from 'three'
import math from 'mathjs'

export const distributionFunctions = {
  equal: (x) => (x),
  sin: (x) => (math.cos((x - 2) * math.pi / 2) + 1),
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
  const x = (math.range(0, 1, 1 / (n / 2 - imposedPoints.length + 2))).toArray()
  const data = []

  // Extrados
  for (let i = x.length - 1; i >= 0; i--) {
    const xx = distributionFunctions[distribution](fix(x[i]))

    // Add imposed points
    for (let j = 0; j < impoToBeFound.length; j++) {
      if (xx < impoToBeFound[j] && lastX > impoToBeFound[j]) {
        data.push(new THREE.Vector3(impoToBeFound[j],
          airfoilFunction(impoToBeFound[j], 'extrados')))
        impoToBeFound.splice(j, 1)
      }
    }

    // Add point
    data.push(new THREE.Vector3(xx, airfoilFunction(xx, 'extrados')))
    lastX = xx
  }

  // Maybe the point to be found is here
  for (let j = 0; j < impoToBeFound.length; j++) {
    if (lastX > impoToBeFound[j]) {
      data.push(new THREE.Vector3(impoToBeFound[j],
        airfoilFunction(impoToBeFound[j], 'extrados')))
      impoToBeFound.splice(j, 1)
    }
  }

  // Reset
  impoToBeFound = [...imposedPoints]

  // Intrados
  for (let i = 1, len = x.length; i < len - 1; i++) { // The last is the same as the first
    const xx = distributionFunctions[distribution](fix(x[i]))

    // Add imposed points
    for (let j = 0; j < impoToBeFound.length; j++) {
      if (xx > impoToBeFound[j] && lastX < impoToBeFound[j]) {
        data.push(new THREE.Vector3(impoToBeFound[j],
          airfoilFunction(impoToBeFound[j], 'intrados')))
        impoToBeFound.splice(j, 1)
      }
    }

    data.push(new THREE.Vector3(xx, airfoilFunction(xx, 'intrados'), 0))
    lastX = xx
  }

  // Maybe the point to be found is here
  for (let j = 0; j < impoToBeFound.length; j++) {
    if (lastX < impoToBeFound[j]) {
      data.push(new THREE.Vector3(impoToBeFound[j],
        airfoilFunction(impoToBeFound[j], 'intrados')))
      impoToBeFound.splice(j, 1)
    }
  }

  return data
}

export default function (airfoilFunction, nPoints, distribution, imposedPoints) {
  const data = pointsGenerator(airfoilFunction, nPoints, distribution, imposedPoints)

  // Console.log a Matlab compatible version of the points
  // console.log('data', data.reduce((s, i) => (s + i[0] + ',' + i[1] + ';'), ''))

  const vertices = data

  const segments = [[0, 1]] // This segment is not added in the loop afterwards
  const facesFromSegments = [[[0, 0]]]
  const faces = []
  for (let i = 1, len = data.length - 1; i < len; i++) {
    segments.push([i, i + 1])
    facesFromSegments[0].push([i, 0])
    faces.push(new THREE.Face3(0, i, i + 1))
  }
  segments.push([data.length - 1, 0]) // This segment is not added on the previous loop
  facesFromSegments[0].push([segments.length - 1, 0])

  return {
    vertices,
    faces,
    segments,
    facesFromSegments,
  }
}
