
import naca4 from 'naca-four-digit-airfoil'

function pointGetter (airfoil, x, side) {
  if (side === 'extrados') {
    return airfoil.yUpper(x)
  }
  return airfoil.yLower(x)
}

export default function airfoilPointsGnrtr (airfoil) {
  const naca = naca4(airfoil)

  return pointGetter.bind(undefined, naca)
}
