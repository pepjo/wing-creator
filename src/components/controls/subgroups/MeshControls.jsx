
import React from 'react'

// Components
import TextField from 'material-ui/lib/text-field'
import SelectField from 'material-ui/lib/select-field'
import MenuItem from 'material-ui/lib/menus/menu-item'

// Styles
import * as style from '../Controls.style'

// Shapes
import { meshPropsShape } from '../../../shapes/geometry'

const propTypes = {
  meshProps: meshPropsShape,
  handleTypeChange: React.PropTypes.func,
  handleThicknessChange: React.PropTypes.func,
}

function MeshControls ({
  meshProps,
  handleTypeChange,
  handleThicknessChange,
}) {
  return (
    <div>
      <SelectField
        value={meshProps.type} onChange={handleTypeChange}
        style={style.field}
        floatingLabelText="Type"
      >
        <MenuItem value="shell" primaryText="Shell elements" />
        <MenuItem value="solid" primaryText="Solid elements" disabled />
      </SelectField>
      <TextField
        value={meshProps.thickness} onChange={handleThicknessChange}
        style={style.field} inputStyle={style.input}
        floatingLabelText="Thickness [mm]" type="number"
        errorText={meshProps.type === 'shell' && 'Ignored for shell elements'}
        errorStyle={style.warning}
      />
    </div>
  )
}

MeshControls.propTypes = propTypes

export default MeshControls
