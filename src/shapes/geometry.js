
import { PropTypes } from 'react'

export const wingParametersShape = PropTypes.shape({
  ribs: PropTypes.number.isRequired,
  length: PropTypes.number.isRequired,
  root: PropTypes.number.isRequired,
  tip: PropTypes.number.isRequired,
  sweep: PropTypes.number.isRequired,
})

export const structureParametersShape = PropTypes.shape({
  beamCoord: PropTypes.number.isRequired,
})

export const meshPropsShape = PropTypes.shape({
  type: PropTypes.string.isRequired,
  thickness: PropTypes.number.isRequired,
})

export const airfoilShape = PropTypes.shape({
  type: PropTypes.string.isRequired,
  filename: PropTypes.string,
  uid: PropTypes.string,
  data: PropTypes.array,
  name: PropTypes.string,
  nPoints: PropTypes.number.isRequired,
  distribution: PropTypes.string.isRequired,
  interpolation: PropTypes.string.isRequired,
})

export default PropTypes.shape({
  wingParameters: wingParametersShape,
  internal: meshPropsShape,
  external: meshPropsShape,
  airfoil: airfoilShape,
})