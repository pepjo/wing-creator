
import React from 'react'

// Components
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import Toggle from 'material-ui/Toggle'

// Styles
import * as style from '../Controls.style'

// Shapes
import exportSettingsShape from '../../../shapes/exportSettings'

const propTypes = {
  exportSettings: exportSettingsShape,
  handleProblemTypeChange: React.PropTypes.func,
  handleExportDifferentVerticesChange: React.PropTypes.func,
  handleExportExternalMeshChange: React.PropTypes.func,
  handleExportInternalMeshChange: React.PropTypes.func,
  handleExportFluidBoxMeshChange: React.PropTypes.func,
}

function WingParametersControls ({
  exportSettings,
  handleProblemTypeChange,
  handleExportDifferentVerticesChange,
  handleExportExternalMeshChange,
  handleExportInternalMeshChange,
  handleExportFluidBoxMeshChange,
}) {
  return (
    <div>
      <SelectField
        style={style.field}
        value={exportSettings.problemType} onChange={handleProblemTypeChange}
        floatingLabelText="GID project problem type"
      >
        <MenuItem
          value="KRATOS_structural"
          primaryText="KRATOS structural"
        />
        <MenuItem
          value="NONE"
          primaryText="No problem type defined"
        />
      </SelectField>
      <Toggle
        toggled={exportSettings.differentVertices}
        onToggle={handleExportDifferentVerticesChange}
        label="Export separate vertices"
      />
      <Toggle
        toggled={exportSettings.externalMesh}
        onToggle={handleExportExternalMeshChange}
        label="Export external mesh"
      />
      <Toggle
        toggled={exportSettings.internalMesh}
        onToggle={handleExportInternalMeshChange}
        label="Export internal mesh"
      />
      <Toggle
        toggled={exportSettings.fluidBoxMesh}
        onToggle={handleExportFluidBoxMeshChange}
        label="Export fluid box"
      />
    </div>
  )
}

WingParametersControls.propTypes = propTypes

export default WingParametersControls
