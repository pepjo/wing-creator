
// Feed the function with an airfoil points and the number of points desired.
// The function will obtain a continuous function of the airfoil shape and then
// discretise it into the different n points requested.
// The type argument changes the distribution of the points.
//   - equal returns equaly spaced points
//   - sin returns sin spaced points
//
// The interpolation type might be spline or linear

import math from 'mathjs'
import global from 'global'

const distribution = {
  equal: (x) => (x),
  sin: () => {throw Error('Sin not yet implemented!')},
}

const solveSystemForKHelpers = {
  calculateMDiagonal: (airfoil, n) => (
    2 * (
      (n === 0
        ? 0
        : 1 / (airfoil[n][0] - airfoil[n - 1][0])
      ) +
      (n === airfoil.length - 1
        ? 0
        : 1 / (airfoil[n + 1][0] - airfoil[n][0])
      )
    )
  ),
  calculateMDiagonalAdjacent: (airfoil, n) => (
    1 / (airfoil[n + 1][0] - airfoil[n][0])
  ),
  calculateB: (airfoil, n) => (
    3 * (
      (n === 0
        ? 0
        : (airfoil[n][1] - airfoil[n - 1][1]) / math.pow(airfoil[n][0] - airfoil[n - 1][0], 2)
      ) +
      (n === airfoil.length - 1
        ? 0
        : (airfoil[n + 1][1] - airfoil[n][1]) / math.pow(airfoil[n + 1][0] - airfoil[n][0], 2)
      )
    )
  ),
}

function solveSystemForK (airfoil) {
  const m = math.zeros(airfoil.length, airfoil.length/* , 'sparse' */)
  const b = math.zeros(airfoil.length)

  for (let i = 0, len = airfoil.length; i < len; i++) {
    // Populate matrix m
    m.set([i, i], solveSystemForKHelpers.calculateMDiagonal(airfoil, i))
    if (i !== airfoil.length - 1) {
      m.set([i, i + 1], solveSystemForKHelpers.calculateMDiagonalAdjacent(airfoil, i))
      m.set([i + 1, i], solveSystemForKHelpers.calculateMDiagonalAdjacent(airfoil, i))
    }

    // Populate vector b
    b.set([i], solveSystemForKHelpers.calculateB(airfoil, i))
  }

  // Solve the system
  return math.multiply(b, math.inv(m)).toArray()
}

function findPoint (airfoil, x, upSide) {
  if (upSide) {
    for (let i = 0, len = airfoil.length; i < len; i++) {
      if (airfoil[i][0] <= x) {
        return i
      }
    }
  }
  for (let i = airfoil.length - 1; i >= 0; i--) {
    if (airfoil[i][0] <= x) {
      return i + 1
    }
  }
  return null
}

const sFHelpers = {
  calculateTAtPoint: (airfoil, i, x) => (
    (x - airfoil[i - 1][0]) / (airfoil[i][0] - airfoil[i - 1][0])
  ),
  calculateAAtPoint: (airfoil, i, k) => (
    k[i - 1] * (airfoil[i][0] - airfoil[i - 1][0]) - (airfoil[i][1] - airfoil[i - 1][1])
  ),
  calculateBAtPoint: (airfoil, i, k) => (
    - k[i] * (airfoil[i][0] - airfoil[i - 1][0]) + (airfoil[i][1] - airfoil[i - 1][1])
  ),
}

function splineFunction (airfoil, k, x, upSide, interpolation) {
  const i = findPoint(airfoil, x, upSide)
  const t = sFHelpers.calculateTAtPoint(airfoil, i, x)
  if (interpolation === 'spline') {
    const a = sFHelpers.calculateAAtPoint(airfoil, i, k)
    const b = sFHelpers.calculateBAtPoint(airfoil, i, k)
    return (1 - t) * airfoil[i - 1][1] + t * airfoil[i - 1][1] + t * (1 - t) * (a * (1 - t) + b * t)
  } else if (interpolation === 'linear') {
    return (1 - t) * airfoil[i - 1][1] + t * airfoil[i - 1][1]
  }
  console.error('interpolation type not recognized')
  throw new Error('airfoil interpolation type not recognized')
}

export default function airfoilPointsGnrtr (airfoil, n, type = 'equal', interpolation = 'spline') {
  let k

  if (interpolation === 'spline') {
    // Retrive or solve the system
    if (global.airfoils && global.airfoils[airfoil.filename]) {
      k = global.airfoils[airfoil.filename]
    } else {
      k = solveSystemForK(airfoil.data)
    }
  }

  const x = (math.range(0, 1, 1 / (n - 1))).toArray()
  const data = [[1, 0]]

  for (let i = x.length - 1; i >= 0; i--) {
    const xx = distribution[type](x[i])
    data.push([xx, splineFunction(airfoil.data, k, xx, true, interpolation)])
  }
  for (let i = 0; i < x.length; i++) {
    const xx = distribution[type](x[i])
    data.push([xx, splineFunction(airfoil.data, k, xx, false, interpolation)])
  }

  // Save the solved system for later use
  if (interpolation === 'spline') {
    if (!global.airfoils || !global.airfoils[airfoil.filename]) {
      if (!global.airfoils) {
        global.airfoils = {}
      }
      global.airfoils[airfoil.filename] = k
    }
  }

  return data
}
