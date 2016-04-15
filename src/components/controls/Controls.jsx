
import React from 'react'
import { connect } from 'react-redux'

// Components
import TextField from 'material-ui/lib/text-field'
import Paper from 'material-ui/lib/paper'

// Styles
import * as style from './Controls.style'

const propTypes = {
  height: React.PropTypes.number,
}

function mapStateToProps (state) { // eslint-disable-line no-unused-vars
  return {
    height: state.display.height,
  }
}

function mapDispatchToProps (dispatch) { // eslint-disable-line no-unused-vars
  return {
    // action: bindActionCreators(action, dispatch),
  }
}

function Controls ({ height }) {
  return (
    <div style={style.scrollContainer(height)}>
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
    </div>
  )
}

Controls.propTypes = propTypes

export default connect(mapStateToProps, mapDispatchToProps)(Controls)
