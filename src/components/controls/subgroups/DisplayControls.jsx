
import React from 'react'

// Components
import SelectField from 'material-ui/lib/select-field'
import MenuItem from 'material-ui/lib/menus/menu-item'
import Toggle from 'material-ui/lib/toggle'

// Styles
import * as style from '../Controls.style'

// Shapes
import displayShape from '../../../shapes/display'

const propTypes = {
  display: displayShape,
  handleDisplayInternalMaterialChange: React.PropTypes.func,
  handleDisplayExternalMaterialChange: React.PropTypes.func,
  handleDisplayInternalMeshViewChange: React.PropTypes.func,
  handleDisplayExternalMeshViewChange: React.PropTypes.func,
}

function AirfoilControls ({
  display,
  handleDisplayInternalMaterialChange,
  handleDisplayExternalMaterialChange,
  handleDisplayInternalMeshViewChange,
  handleDisplayExternalMeshViewChange,
}) {
  return (
    <div>
      <h3>Internal structure</h3>
      <Toggle
        toggled={display.internalMesh.visible}
        onToggle={handleDisplayInternalMeshViewChange}
        label="Visible"
      />
      <SelectField
        value={display.internalMesh.material}
        onChange={handleDisplayInternalMaterialChange}
        style={style.field}
        floatingLabelText="Visualitzation type"
      >
        <MenuItem value="solid" primaryText="Solid" />
        <MenuItem value="wireframe" primaryText="Wireframe" />
      </SelectField>
      <h3>External structure</h3>
      <Toggle
        toggled={display.externalMesh.visible}
        onToggle={handleDisplayExternalMeshViewChange}
        label="Visible"
      />
      <SelectField
        value={display.externalMesh.material}
        onChange={handleDisplayExternalMaterialChange}
        style={style.field}
        floatingLabelText="Visualitzation type"
      >
        <MenuItem value="solid" primaryText="Solid" />
        <MenuItem value="wireframe" primaryText="Wireframe" />
      </SelectField>
    </div>
  )
}

AirfoilControls.propTypes = propTypes

export default AirfoilControls
