
import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

// Components
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import {
  Step,
  Stepper,
  StepLabel,
  div,
} from 'material-ui/Stepper'
import RaisedButton from 'material-ui/RaisedButton'

// Actions
import { changeTutorialState } from '../../actions/display'

const propTypes = {
  openTutorial: React.PropTypes.bool,
  changeTutorialState: React.PropTypes.func,
}

function mapStateToProps (state) { // eslint-disable-line no-unused-vars
  return {
    openTutorial: state.display.tutorial,
  }
}

function mapDispatchToProps (dispatch) { // eslint-disable-line no-unused-vars
  return {
    changeTutorialState: bindActionCreators(changeTutorialState, dispatch),
  }
}

class ComponentName extends React.Component {
  constructor (props) {
    super(props)
    this.handleNext = this.handleNext.bind(this)
    this.handlePrev = this.handlePrev.bind(this)
    this.handleOpen = this.handleOpen.bind(this)
    this.handleClose = this.handleClose.bind(this)
    this.renderStepActions = this.renderStepActions.bind(this)

    this.state = {
      finished: false,
      stepIndex: 0,
    }
  }

  handleNext () {
    const { stepIndex } = this.state
    this.setState({
      stepIndex: stepIndex + 1,
      finished: stepIndex >= 3,
    })
  }

  handlePrev () {
    const { stepIndex } = this.state
    if (stepIndex > 0) {
      this.setState({ stepIndex: stepIndex - 1 })
    }
  }

  handleOpen () {
    this.props.changeTutorialState(true)
  }

  handleClose () {
    this.props.changeTutorialState(false)
  }

  renderStepActions (step) {
    const { stepIndex } = this.state

    return (
      <div style={{ margin: '12px 0' }}>
        <RaisedButton
          label={stepIndex === 3 ? 'Finish' : 'Next'}
          disableTouchRipple
          disableFocusRipple
          primary
          onTouchTap={this.handleNext}
          style={{ marginRight: 12 }}
        />
        {step > 0 && (
          <FlatButton
            label="Back"
            disabled={stepIndex === 0}
            disableTouchRipple
            disableFocusRipple
            onTouchTap={this.handlePrev}
          />
        )}
      </div>
    )
  }

  render () {
    const { finished, stepIndex } = this.state

    const actions = [
      <FlatButton
        label="Close"
        primary
        onTouchTap={this.handleClose}
      />,
    ]

    const stepStyle = {
      marginLeft: 25,
      borderLeft: '1px solid #bbb',
      paddingLeft: 10,
    }

    return (
      <div>
        <Dialog
          title="App design workflow"
          actions={actions}
          modal={false}
          open={this.props.openTutorial}
          onRequestClose={this.handleClose}
          bodyStyle={{ overflowY: 'auto' }}
        >
          <p>
            This software has been designed as a tool for my final degree tesis. It is not concieved
            as a final product and thus it may have errors especially on edge cases.
          </p>
          <p>
            You may just use it to generate some wing geometry, but this app has been designed to
            work with the following workflow:
          </p>
          <div style={{ position: 'relative' }}>
            <Stepper activeStep={stepIndex} orientation="vertical">
              <Step>
                <StepLabel>Create a wing</StepLabel>
                <div style={Object.assign({}, stepStyle, {
                  display: stepIndex === 0 ? 'block' : 'none',
                })}
                >
                  <p>
                    Use the different settings to create your wing
                  </p>
                  {this.renderStepActions(0)}
                </div>
              </Step>
              <Step>
                <StepLabel>Export a Kratos fluid problem</StepLabel>
                <div style={Object.assign({}, stepStyle, {
                  display: stepIndex === 1 ? 'block' : 'none',
                })}
                >
                  <p>
                    Select Kratos Fluid problem under export and make sure to export the fluid box
                  </p>
                  {this.renderStepActions(1)}
                </div>
              </Step>
              <Step>
                <StepLabel>Import the solution</StepLabel>
                <div style={Object.assign({}, stepStyle, {
                  display: stepIndex === 2 ? 'block' : 'none',
                })}
                >
                  <p>
                    Import the solution of your fluid problem
                  </p>
                  {this.renderStepActions(2)}
                </div>
              </Step>
              <Step>
                <StepLabel>Export a Kratos structure problem</StepLabel>
                <div style={Object.assign({}, stepStyle, {
                  display: stepIndex === 3 ? 'block' : 'none',
                })}
                >
                  <p>
                    Under export, change problem type to Kratos structural and export. You will have
                    the pressure condition over the exterior surface already applied
                  </p>
                  {this.renderStepActions(3)}
                </div>
              </Step>
            </Stepper>
          </div>
          {finished && (
            <p style={{ margin: '20px 0', textAlign: 'center' }}>
              <a
                href="#"
                onClick={(event) => {
                  event.preventDefault()
                  this.setState({ stepIndex: 0, finished: false })
                }}
              >
                Click here
              </a> to reset the instructions.
            </p>
          )}
        </Dialog>
      </div>
    )
  }
}

ComponentName.propTypes = propTypes

export default connect(mapStateToProps, mapDispatchToProps)(ComponentName)
