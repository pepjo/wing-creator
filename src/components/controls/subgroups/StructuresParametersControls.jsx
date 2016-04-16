
import React from 'react'

// Components
import TextField from 'material-ui/lib/text-field'

// Styles
import * as style from '../Controls.style'

// Shapes
import { structureParametersShape } from '../../../shapes/geometry'

const propTypes = {
  structureParameters: structureParametersShape,
  handleBeamCoordChange: React.PropTypes.func,
}

function WingParametersControls ({
  structureParameters,
  handleBeamCoordChange,
}) {
  return (
    <div>
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
