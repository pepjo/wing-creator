
import React from 'react'

// Components
import TextField from 'material-ui/lib/text-field'
import Paper from 'material-ui/lib/paper'

// Styles
import * as style from './index.style'

const propTypes = {

}

function Controls () {
  return (
    <Paper style={style.container}>
      <TextField
        style={style.field} inputStyle={style.input}
        floatingLabelText="Project name"
      />
      <TextField
        style={style.field} inputStyle={style.input}
        floatingLabelText="Airfoil"
      />
      <TextField
        style={style.field} inputStyle={style.input}
        floatingLabelText="Number of ribs"
        type="number"
      />
      <TextField
        style={style.field} inputStyle={style.input}
        floatingLabelText="Length [m]"
        type="number"
      />
      <TextField
        style={style.field} inputStyle={style.input}
        floatingLabelText="RootChord [m]"
        type="number"
      />
      <TextField
        style={style.field} inputStyle={style.input}
        floatingLabelText="TipChord [m]"
        type="number"
        disabled
      />
      <TextField
        style={style.field} inputStyle={style.input}
        floatingLabelText="Sweep angle [º]"
        type="number"
        disabled
      />
    </Paper>
  )
}

Controls.propTypes = propTypes

export default Controls
