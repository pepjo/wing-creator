
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
  if (upSide === 'extrados') {
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
  calculateTAtPoint: (x1, x0, x) => (
    (x - x0) / (x1 - x0)
  ),
  calculateAAtPoint: (x1, x0, y1, y0, k0) => (
    k0 * (x1 - x0) - (y1 - y0)
  ),
  calculateBAtPoint: (x1, x0, y1, y0, k1) => (
    - k1 * (x1 - x0) + (y1 - y0)
  ),
}

function interpolatorFunction (airfoil, k, interpolation, x, upSide) {
  const i = findPoint(airfoil, x, upSide)
  if (i === 0 || i === airfoil.length) {
    return airfoil[0][1]
  }
  const x1 = airfoil[i][0]
  const x0 = airfoil[i - 1][0]
  const y1 = airfoil[i][1]
  const y0 = airfoil[i - 1][1]

  // TODO: FIX: spline behaviour
  if (interpolation === 'spline') {
    const k1 = k[i]
    const k0 = k[i - 1]
    const a = sFHelpers.calculateAAtPoint(x1, x0, y1, y0, k0)
    const b = sFHelpers.calculateBAtPoint(x1, x0, y1, y0, k1)
    const t = sFHelpers.calculateTAtPoint(x1, x0, x)
    // console.log(i, 'a', a)
    // console.log(i, 'b', b)
    // console.log(i, 't', t)
    return (1 - t) * y0 + t * y1 + t * (1 - t) * (a * (1 - t) + b * t)
  } else if (interpolation === 'linear') {
    const m = (y0 - y1) / (x0 - x1)
    return y1 + (x - x1) * m
  }
  throw new Error('Airfoil interpolation type not recognized')
}

export default function airfoilPointsGnrtr (airfoil, interpolation = 'spline') {
  let k

  if (interpolation === 'spline') {
    // Retrive or solve the system
    if (global.airfoils && global.airfoils[airfoil.filename] &&
    typeof global.it !== 'function') { // It's not a test
      k = global.airfoils[airfoil.filename]
    } else {
      k = solveSystemForK(airfoil.data)

      // Save the solution
      if (!global.airfoils || !global.airfoils[airfoil.filename]) {
        if (!global.airfoils) {
          global.airfoils = {}
        }
        global.airfoils[airfoil.filename] = k
      }
    }
  }

  return interpolatorFunction.bind(undefined, airfoil.data, k, interpolation)
}
