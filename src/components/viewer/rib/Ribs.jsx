
import React from 'react'

const propTypes = {
  airfoil: React.PropTypes.string,
  length: React.PropTypes.number,
  settings: React.PropTypes.object,
}

function Rib ({ airfoil, settings, length }) {
  /*
    1. Load airfoil
    2. Generate section
    3. copy section
    4. Generate vertex matrix
    5. Generate faces matrix
  */
  return (
    <scene>

    </scene>
  )
}

Rib.propTypes = propTypes

export default Rib
