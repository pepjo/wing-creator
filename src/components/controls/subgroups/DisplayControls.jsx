
import React from 'react'

// Components
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import Toggle from 'material-ui/Toggle'

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
  handleDisplayFluidBoxMaterialChange: React.PropTypes.func,
  handleDisplayFluidBoxMeshViewChange: React.PropTypes.func,
}

function AirfoilControls ({
  display,
  handleDisplayInternalMaterialChange,
  handleDisplayExternalMaterialChange,
  handleDisplayInternalMeshViewChange,
  handleDisplayExternalMeshViewChange,
  handleDisplayFluidBoxMeshViewChange,
  handleDisplayFluidBoxMaterialChange,
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
      <h3>Fluid box</h3>
      <Toggle
        toggled={display.fluidBoxMesh.visible}
        onToggle={handleDisplayFluidBoxMeshViewChange}
        label="Visible"
      />
      <SelectField
        value={display.fluidBoxMesh.material}
        onChange={handleDisplayFluidBoxMaterialChange}
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
