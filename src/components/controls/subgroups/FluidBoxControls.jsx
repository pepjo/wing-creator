
import React from 'react'

// Components
import TextField from 'material-ui/TextField'

// Styles
import * as style from '../Controls.style'

// Shapes
import { fluidBoxShape } from '../../../shapes/geometry'

const propTypes = {
  fluidBox: fluidBoxShape,
  handleFluidBoxWidthChange: React.PropTypes.func.isRequired,
  handleFluidBoxLengthChange: React.PropTypes.func.isRequired,
  handleFluidBoxHeightChange: React.PropTypes.func.isRequired,
  handleFluidBoxXCoordChange: React.PropTypes.func.isRequired,
  handleFluidBoxAngleChange: React.PropTypes.func.isRequired,
}

function AirfoilControls ({
  fluidBox,
  handleFluidBoxWidthChange,
  handleFluidBoxLengthChange,
  handleFluidBoxHeightChange,
  handleFluidBoxXCoordChange,
  handleFluidBoxAngleChange,
}) {
  return (
    <div>
      <TextField
        value={fluidBox.width}
        onChange={handleFluidBoxWidthChange}
        style={style.field} inputStyle={style.input}
        floatingLabelText="Width [times wing length]" type="number"
      />
      <TextField
        value={fluidBox.length}
        onChange={handleFluidBoxLengthChange}
        style={style.field} inputStyle={style.input}
        floatingLabelText="Length [times wing length]" type="number"
      />
      <TextField
        value={fluidBox.height}
        onChange={handleFluidBoxHeightChange}
        style={style.field} inputStyle={style.input}
        floatingLabelText="Height [times wing length]" type="number"
      />
      <TextField
        value={fluidBox.x}
        onChange={handleFluidBoxXCoordChange}
        style={style.field} inputStyle={style.input}
        floatingLabelText="x [m]" type="number"
      />
      <TextField
        value={fluidBox.angle}
        onChange={handleFluidBoxAngleChange}
        style={style.field} inputStyle={style.input}
        floatingLabelText="Angle of attack [º]" type="number"
      />
    </div>
  )
}

AirfoilControls.propTypes = propTypes

export default AirfoilControls
