
import React from 'react'

import generator from './generator'

const propTypes = {
  airfoil: React.PropTypes.object,
  settings: React.PropTypes.object,
}

class Ribs extends React.Component {
  constructor (props) {
    super(props)

    console.log('The msh should be regenerated if the props change')
    this.msh = generator(
      props.airfoil, props.settings.ribs, props.settings.length, props.settings.root
    )
  }

  render () {
    const { vertices, faces } = this.msh
    return (
      <mesh>
        <geometry
          vertices={vertices}
          faces={faces}
        />
        <meshLambertMaterial
          color={0xff7777}
        />
      </mesh>
    )
  }
}

Ribs.propTypes = propTypes

export default Ribs
