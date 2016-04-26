
import React from 'react'

// Components
import DropFile from 'react-dropzone'
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
  handleFileDrop: React.PropTypes.func.isRequired,
}

function WingParametersControls ({
  exportSettings,
  handleProblemTypeChange,
  handleExportDifferentVerticesChange,
  handleExportExternalMeshChange,
  handleExportInternalMeshChange,
  handleExportFluidBoxMeshChange,
  handleFileDrop,
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
          value="KRATOS_fluid"
          primaryText="KRATOS fluid"
        />
        <MenuItem
          value="NONE"
          primaryText="No problem type defined"
        />
      </SelectField>
      <DropFile
        onDrop={handleFileDrop} dropEffect="copy"
        style={{
          width: 365, margin: '10px 0', padding: 5, border: '1px dashed #999', textAlign: 'center',
        }}
        activeStyle={{
          border: '1px dashed #333', backgroundColor: '#ddd',
        }}
      >
        {(() => {
          if (exportSettings.fluidSimulation) {
            return (
              <span>File correctly uploaded (drag to replace)</span>
            )
          } else if (exportSettings.fluidSimulation === false) {
            return (
              <span>That was not a directory or your browser is not supported</span>
            )
          }
          return (
            <span>Drag here the .gid folder after the fluid simulation (only works on Chrome)</span>
          )
        })()}
      </DropFile>
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
