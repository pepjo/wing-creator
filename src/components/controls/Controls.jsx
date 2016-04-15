
import React from 'react'
import { connect } from 'react-redux'

// Components
import TextField from 'material-ui/lib/text-field'
import Paper from 'material-ui/lib/paper'
import Foldable from '../interface/Foldable'

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
        <Foldable
          nom="Wing parameters"
          obert
        >
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
        </Foldable>
        <Foldable
          nom="Airfoil"
          obert
        >
          <TextField
            style={style.field} inputStyle={style.input}
            floatingLabelText="Name"
            type="number"
          />
          <TextField
            style={style.field} inputStyle={style.input}
            floatingLabelText="Number of discretitzation points"
            type="number"
          />
          <TextField
            style={style.field} inputStyle={style.input}
            floatingLabelText="Point interpolation mechanism"
            type="number"
          />
          <TextField
            style={style.field} inputStyle={style.input}
            floatingLabelText="Point distribuiton mechanism"
            type="number"
            disabled
          />
        </Foldable>
        <Foldable
          nom="Internal structure"
          obert
        >
          <TextField
            style={style.field} inputStyle={style.input}
            floatingLabelText="Type"
            type="number"
          />
          <TextField
            style={style.field} inputStyle={style.input}
            floatingLabelText="Thickness [mm]"
            type="number"
          />
        </Foldable>
        <Foldable
          nom="External structure"
          obert
        >
        <TextField
          style={style.field} inputStyle={style.input}
          floatingLabelText="Type"
          type="number"
        />
        <TextField
          style={style.field} inputStyle={style.input}
          floatingLabelText="Thickness [mm]"
          type="number"
        />
        </Foldable>
      </Paper>
    </div>
  )
}

Controls.propTypes = propTypes

export default connect(mapStateToProps, mapDispatchToProps)(Controls)
