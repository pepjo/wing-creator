
import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

// Components
import WingParametersControls from './subgroups/WingParametersControls'
import MeshControls from './subgroups/MeshControls'
import AirfoilControls from './subgroups/AirfoilControls'
import Paper from 'material-ui/lib/paper'
import Foldable from '../interface/Foldable'

// Actions
import { changeGeometryParameter, changeAirfoil } from '../../actions/geometry'

// Styles
import * as style from './Controls.style'

// Shapes
import geometryShape from '../../shapes/geometry'

const propTypes = {
  height: React.PropTypes.number,
  geometry: geometryShape,
  airfoils: React.PropTypes.array,
  changeGeometryParameter: React.PropTypes.func,
  changeAirfoil: React.PropTypes.func,
}

function mapStateToProps (state) { // eslint-disable-line no-unused-vars
  return {
    height: state.display.height,
    geometry: state.geometry,
    airfoils: state.data.airfoils,
  }
}

function mapDispatchToProps (dispatch) { // eslint-disable-line no-unused-vars
  return {
    changeGeometryParameter: bindActionCreators(changeGeometryParameter, dispatch),
    changeAirfoil: bindActionCreators(changeAirfoil, dispatch),
  }
}

class Controls extends React.Component {
  constructor (props) {
    super(props)

    this.handleRibsChange = this.handleRibsChange.bind(this)
    this.handleLengthChange = this.handleLengthChange.bind(this)
    this.handleRootChange = this.handleRootChange.bind(this)
    this.handleTipChange = this.handleTipChange.bind(this)
    this.handleSweepChange = this.handleSweepChange.bind(this)
    this.handleInternalTypeChange = this.handleInternalTypeChange.bind(this)
    this.handleInternalThicknessChange = this.handleInternalThicknessChange.bind(this)
    this.handleExternalTypeChange = this.handleExternalTypeChange.bind(this)
    this.handleExternalThicknessChange = this.handleExternalThicknessChange.bind(this)
    this.handleAirfoilTypeChange = this.handleAirfoilTypeChange.bind(this)
    this.handleAirfoilNPointsChange = this.handleAirfoilNPointsChange.bind(this)
    this.handleAirfoilDistributionChange = this.handleAirfoilDistributionChange.bind(this)
    this.handleAirfoilInterpolationChange = this.handleAirfoilInterpolationChange.bind(this)
    this.handleAirfoilChange = this.handleAirfoilChange.bind(this)
  }

  handleRibsChange (e) {
    this.props.changeGeometryParameter('wingParameters.ribs', parseInt(e.target.value, 10))
  }
  handleLengthChange (e) {
    this.props.changeGeometryParameter('wingParameters.length',
      parseFloat(e.target.value.replace(',', '.'), 10))
  }
  handleRootChange (e) {
    this.props.changeGeometryParameter('wingParameters.root',
      parseFloat(e.target.value.replace(',', '.'), 10))
  }
  handleTipChange (e) {
    this.props.changeGeometryParameter('wingParameters.tip',
      parseFloat(e.target.value.replace(',', '.'), 10))
  }
  handleSweepChange (e) {
    this.props.changeGeometryParameter('wingParameters.sweep',
      parseFloat(e.target.value.replace(',', '.'), 10))
  }
  handleInternalTypeChange (e, index, value) {
    this.props.changeGeometryParameter('internal.type', value)
  }
  handleInternalThicknessChange (e) {
    this.props.changeGeometryParameter('internal.thickness',
      parseFloat(e.target.value.replace(',', '.'), 10))
  }
  handleExternalTypeChange (e, index, value) {
    this.props.changeGeometryParameter('external.type', value)
  }
  handleExternalThicknessChange (e) {
    this.props.changeGeometryParameter('external.thickness',
      parseFloat(e.target.value.replace(',', '.'), 10))
  }
  handleAirfoilTypeChange (e, index, value) {
    this.props.changeGeometryParameter('airfoil.type', value)
  }
  handleAirfoilNPointsChange (e) {
    let val = parseInt(e.target.value, 10)
    if (isNaN(val)) {
      val = 0
    }
    if (val > 1000) {
      val = 1000
    }
    this.props.changeGeometryParameter('airfoil.nPoints', val)
  }
  handleAirfoilDistributionChange (e, index, value) {
    this.props.changeGeometryParameter('airfoil.distribution', value)
  }
  handleAirfoilInterpolationChange (e, index, value) {
    this.props.changeGeometryParameter('airfoil.interpolation', value)
  }

  handleAirfoilChange (e, index, value) {
    if (this.props.geometry.airfoil.type === 'fromFile') {
      const airfoil = this.props.airfoils.find((item) => (item.filename === value))
      this.props.changeAirfoil(value, airfoil)
    } else {
      console.warn('This airfoil type has not been implemented yet')
    }
  }

  render () {
    const { airfoils } = this.props
    const { wingParameters, internal, external, airfoil } = this.props.geometry

    return (
      <div style={style.scrollContainer(this.props.height)}>
        <Paper style={style.container}>
          <Foldable
            nom="Wing parameters"
          >
            <WingParametersControls
              wingParameters={wingParameters}
              handleRibsChange={this.handleRibsChange}
              handleLengthChange={this.handleLengthChange}
              handleRootChange={this.handleRootChange}
              handleTipChange={this.handleTipChange}
              handleSweepChange={this.handleSweepChange}
            />
          </Foldable>
          <Foldable
            nom="Airfoil"
          >
            <AirfoilControls
              airfoil={airfoil}
              airfoils={airfoils}
              handleAirfoilTypeChange={this.handleAirfoilTypeChange}
              handleAirfoilNPointsChange={this.handleAirfoilNPointsChange}
              handleAirfoilDistributionChange={this.handleAirfoilDistributionChange}
              handleAirfoilInterpolationChange={this.handleAirfoilInterpolationChange}
              handleAirfoilChange={this.handleAirfoilChange}
            />
          </Foldable>
          <Foldable
            nom="Internal structure"
          >
            <MeshControls meshProps={internal}
              handleTypeChange={this.handleInternalTypeChange}
              handleThicknessChange={this.handleInternalThicknessChange}
            />
          </Foldable>
          <Foldable
            nom="External structure"
          >
            <MeshControls meshProps={external}
              handleTypeChange={this.handleExternalTypeChange}
              handleThicknessChange={this.handleExternalThicknessChange}
            />
          </Foldable>
        </Paper>
      </div>
    )
  }
}

Controls.propTypes = propTypes

export default connect(mapStateToProps, mapDispatchToProps)(Controls)
