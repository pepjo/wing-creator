
import React from 'react'

// Components
import TextField from 'material-ui/TextField'

// Styles
import * as style from '../Controls.style'

// Shapes
import { wingParametersShape } from '../../../shapes/geometry'

const propTypes = {
  wingParameters: wingParametersShape,
  handleRibsChange: React.PropTypes.func,
  handleLengthChange: React.PropTypes.func,
  handleRootChange: React.PropTypes.func,
  handleTipChange: React.PropTypes.func,
  handleSweepChange: React.PropTypes.func,
}

function WingParametersControls ({
  wingParameters,
  handleRibsChange,
  handleLengthChange,
  handleRootChange,
  handleTipChange,
  handleSweepChange,
}) {
  return (
    <div>
      <TextField
        value={wingParameters.ribs} onChange={handleRibsChange}
        style={style.field} inputStyle={style.input}
        floatingLabelText="Number of ribs" type="number"
      />
      <TextField
        value={wingParameters.length} onChange={handleLengthChange}
        style={style.field} inputStyle={style.input}
        floatingLabelText="Length [m]" type="number"
      />
      <TextField
        value={wingParameters.root} onChange={handleRootChange}
        style={style.field} inputStyle={style.input}
        floatingLabelText="RootChord [m]" type="number"
      />
      <TextField
        value={wingParameters.tip} onChange={handleTipChange}
        style={style.field} inputStyle={style.input}
        floatingLabelText="TipChord [m]" type="number"
        disabled
      />
      <TextField
        value={wingParameters.sweep} onChange={handleSweepChange}
        style={style.field} inputStyle={style.input}
        floatingLabelText="Sweep angle [º]" type="number"
        disabled
      />
    </div>
  )
}

WingParametersControls.propTypes = propTypes

export default WingParametersControls
