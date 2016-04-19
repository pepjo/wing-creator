
import airfoilFromFileGenerator from './airfoil-from-file'
import airfoilFromNaca4 from './airfoil-from-naca4'

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
  } else if (geometry.airfoil.type === 'fromNACA4') {
    if (geometry.airfoil.data.length === 4) {
      airfoilFunction = airfoilFromNaca4(geometry.airfoil.data)
    }
  } else {
    throw new Error('This type of airfoil is not yet implemented')
  }

  return airfoilFunction
}
