
import React from 'react'

// Components
import TextField from 'material-ui/TextField'

// Styles
import * as style from '../Controls.style'

// Shapes
import { structureParametersShape } from '../../../shapes/geometry'

const propTypes = {
  structureParameters: structureParametersShape,
  handleBeamCoordChange: React.PropTypes.func,
  handleRibsChange: React.PropTypes.func,
}

function WingParametersControls ({
  structureParameters,
  handleBeamCoordChange,
  handleRibsChange,
}) {
  return (
    <div>
      <TextField
        value={structureParameters.ribs} onChange={handleRibsChange}
        style={style.field} inputStyle={style.input}
        floatingLabelText="Number of ribs" type="number"
      />
      <TextField
        value={structureParameters.beamCoord} onChange={handleBeamCoordChange}
        style={style.field} inputStyle={style.input}
        floatingLabelText="Beam postion (over 1)" type="number"
      />
    </div>
  )
}

WingParametersControls.propTypes = propTypes

export default WingParametersControls
