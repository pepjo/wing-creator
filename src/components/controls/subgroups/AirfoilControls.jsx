
import React from 'react'

// Components
import TextField from 'material-ui/TextField'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'

// Styles
import * as style from '../Controls.style'

// Shapes
import { airfoilShape } from '../../../shapes/geometry'

const propTypes = {
  airfoil: airfoilShape,
  airfoils: React.PropTypes.array,
  handleAirfoilTypeChange: React.PropTypes.func,
  handleAirfoilNPointsChange: React.PropTypes.func,
  handleAirfoilDistributionChange: React.PropTypes.func,
  handleAirfoilInterpolationChange: React.PropTypes.func,
  handleAirfoilChange: React.PropTypes.func,
}

function AirfoilControls ({
  airfoil,
  airfoils,
  handleAirfoilTypeChange,
  handleAirfoilNPointsChange,
  handleAirfoilDistributionChange,
  handleAirfoilInterpolationChange,
  handleAirfoilChange,
}) {
  return (
    <div>
      <SelectField
        style={style.field}
        value={airfoil.type} onChange={handleAirfoilTypeChange}
        floatingLabelText="Airfoil source"
      >
        <MenuItem value="fromFile" primaryText="From .dat file" />
        <MenuItem value="fromNACA4" primaryText="NACA 4" disabled />
        <MenuItem value="fromNACA5" primaryText="NACA 5" disabled />
        <MenuItem value="fromNACA6" primaryText="NACA 6" disabled />
      </SelectField>
      <SelectField
        style={style.field}
        value={airfoil.uid} onChange={handleAirfoilChange}
        floatingLabelText="Airfoil name"
      >
        {airfoils.map((airfoilItem) => (
          <MenuItem
            key={airfoilItem.filename}
            value={airfoilItem.filename}
            primaryText={airfoilItem.name}
          />
        ))}
      </SelectField>
      <TextField
        value={airfoil.nPoints}
        onChange={handleAirfoilNPointsChange}
        style={style.field} inputStyle={style.input}
        floatingLabelText="Number of discretitzation points" type="number"
      />
      <SelectField
        value={airfoil.distribution}
        onChange={handleAirfoilDistributionChange}
        style={style.field}
        floatingLabelText="Point distribuiton mechanism"
      >
        <MenuItem value="equal" primaryText="Equally distributed" />
        <MenuItem value="sin" primaryText="Sinusoidal distribution" />
      </SelectField>
      <SelectField
        value={airfoil.interpolation}
        onChange={handleAirfoilInterpolationChange}
        style={style.field}
        floatingLabelText="Point interpolation mechanism"
      >
        <MenuItem value="linear" primaryText="Lineal interpolation" />
        <MenuItem value="spline" primaryText="Cubic spline" />
      </SelectField>
    </div>
  )
}

AirfoilControls.propTypes = propTypes

export default AirfoilControls
