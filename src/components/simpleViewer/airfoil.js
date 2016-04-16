
import airfoilFromFileGenerator from './airfoil-from-file'

export default function (airfoils, geometry) {
  let airfoilFunction

  // Generate interior mesh
  if (geometry.airfoil.type === 'fromFile') {
    if (geometry.airfoil.filename) {
      airfoilFunction = airfoilFromFileGenerator(
        airfoils.find((airfoilItem) => (
          airfoilItem.filename === geometry.airfoil.filename
        )),
        geometry.airfoil.interpolation
      )
    }
  } else {
    console.warn('This type of airfoil is not yet implemented')
    throw new Error('This type of airfoil is not yet implemented')
  }

  return airfoilFunction
}
