
import { PropTypes } from 'react'

export const wingParametersShape = PropTypes.shape({
  length: PropTypes.number.isRequired,
  root: PropTypes.number.isRequired,
  tip: PropTypes.number.isRequired,
  sweep: PropTypes.number.isRequired,
})

export const structureParametersShape = PropTypes.shape({
  ribs: PropTypes.number.isRequired,
  beamCoord: PropTypes.number.isRequired,
  beamExtension: PropTypes.number.isRequired,
})

export const meshPropsShape = PropTypes.shape({
  type: PropTypes.string.isRequired,
  thickness: PropTypes.number.isRequired,
})

export const airfoilShape = PropTypes.shape({
  type: PropTypes.string.isRequired,
  filename: PropTypes.string,
  uid: PropTypes.string,
  data: PropTypes.oneOfType([PropTypes.array, PropTypes.string, PropTypes.bool]),
  name: PropTypes.string,
  nPoints: PropTypes.number.isRequired,
  distribution: PropTypes.string.isRequired,
  interpolation: PropTypes.string.isRequired,
})

export const fluidBoxShape = PropTypes.shape({
  width: PropTypes.number,
  height: PropTypes.number,
  length: PropTypes.number,
  x: PropTypes.number,
  angle: PropTypes.number,
})

export default PropTypes.shape({
  wingParameters: wingParametersShape,
  internal: meshPropsShape,
  external: meshPropsShape,
  airfoil: airfoilShape,
  fluidBox: fluidBoxShape,
})
