
import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

// Components
import AirfoilControls from './subgroups/AirfoilControls'
import DisplayControls from './subgroups/DisplayControls'
import MeshControls from './subgroups/MeshControls'
import StructuresParametersControls from './subgroups/StructuresParametersControls'
import WingParametersControls from './subgroups/WingParametersControls'
import Paper from 'material-ui/Paper'
import Foldable from '../interface/Foldable'
import DownloadBtn from '../downloadBtn/DownloadBtn'

// Actions
import { changeGeometryParameter, changeAirfoil } from '../../actions/geometry'
import { changeDisplayParameter } from '../../actions/display'

// Styles
import * as style from './Controls.style'

// Shapes
import geometryShape from '../../shapes/geometry'
import displayShape from '../../shapes/display'

const propTypes = {
  height: React.PropTypes.number,
  geometry: geometryShape,
  display: displayShape,
  airfoils: React.PropTypes.array,
  changeGeometryParameter: React.PropTypes.func,
  changeAirfoil: React.PropTypes.func,
  changeDisplayParameter: React.PropTypes.func,
}

function mapStateToProps (state) { // eslint-disable-line no-unused-vars
  return {
    height: state.display.height,
    geometry: state.geometry,
    airfoils: state.data.airfoils,
    display: state.display,
  }
}

function mapDispatchToProps (dispatch) { // eslint-disable-line no-unused-vars
  return {
    changeGeometryParameter: bindActionCreators(changeGeometryParameter, dispatch),
    changeDisplayParameter: bindActionCreators(changeDisplayParameter, dispatch),
    changeAirfoil: bindActionCreators(changeAirfoil, dispatch),
  }
}

function proccessInputVal (value, min, max) {
  const val = parseFloat(value.replace(',', '.'), 10)
  if (isNaN(val)) {
    return 0
  } else if (typeof min !== 'undefined' && val < min) {
    return min
  } else if (typeof max !== 'undefined' && val > max) {
    return max
  }
  return val
}

class Controls extends React.Component {
  constructor (props) {
    super(props)

    this.handleRibsChange = this.handleRibsChange.bind(this)
    this.handleLengthChange = this.handleLengthChange.bind(this)
    this.handleRootChange = this.handleRootChange.bind(this)
    this.handleTipChange = this.handleTipChange.bind(this)
    this.handleSweepChange = this.handleSweepChange.bind(this)
    this.handleBeamCoordChange = this.handleBeamCoordChange.bind(this)
    this.handleInternalTypeChange = this.handleInternalTypeChange.bind(this)
    this.handleInternalThicknessChange = this.handleInternalThicknessChange.bind(this)
    this.handleExternalTypeChange = this.handleExternalTypeChange.bind(this)
    this.handleExternalThicknessChange = this.handleExternalThicknessChange.bind(this)
    this.handleAirfoilTypeChange = this.handleAirfoilTypeChange.bind(this)
    this.handleAirfoilNPointsChange = this.handleAirfoilNPointsChange.bind(this)
    this.handleAirfoilDistributionChange = this.handleAirfoilDistributionChange.bind(this)
    this.handleAirfoilInterpolationChange = this.handleAirfoilInterpolationChange.bind(this)
    this.handleAirfoilChange = this.handleAirfoilChange.bind(this)
    this.handleDisplayInternalMaterialChange = this.handleDisplayInternalMaterialChange.bind(this)
    this.handleDisplayExternalMaterialChange = this.handleDisplayExternalMaterialChange.bind(this)
    this.handleDisplayInternalMeshViewChange = this.handleDisplayInternalMeshViewChange.bind(this)
    this.handleDisplayExternalMeshViewChange = this.handleDisplayExternalMeshViewChange.bind(this)
  }

  handleLengthChange (e) {
    this.props.changeGeometryParameter('wingParameters.length',
      proccessInputVal(e.target.value, 0))
  }
  handleRootChange (e) {
    this.props.changeGeometryParameter('wingParameters.root',
      proccessInputVal(e.target.value, 0))
  }
  handleTipChange (e) {
    this.props.changeGeometryParameter('wingParameters.tip',
      proccessInputVal(e.target.value, 0))
  }
  handleSweepChange (e) {
    this.props.changeGeometryParameter('wingParameters.sweep',
      proccessInputVal(e.target.value, -90, 90))
  }
  handleRibsChange (e) {
    this.props.changeGeometryParameter('structureParameters.ribs',
      proccessInputVal(e.target.value, 2))
  }
  handleBeamCoordChange (e) {
    this.props.changeGeometryParameter('structureParameters.beamCoord',
      proccessInputVal(e.target.value, 0, 1))
  }
  handleInternalTypeChange (e, index, value) {
    this.props.changeGeometryParameter('internal.type', value)
  }
  handleInternalThicknessChange (e) {
    this.props.changeGeometryParameter('internal.thickness',
      proccessInputVal(e.target.value, 0))
  }
  handleExternalTypeChange (e, index, value) {
    this.props.changeGeometryParameter('external.type', value)
  }
  handleExternalThicknessChange (e) {
    this.props.changeGeometryParameter('external.thickness',
      proccessInputVal(e.target.value, 0))
  }
  handleAirfoilTypeChange (e, index, value) {
    this.props.changeGeometryParameter('airfoil.type', value)
  }
  handleAirfoilNPointsChange (e) {
    this.props.changeGeometryParameter('airfoil.nPoints',
      proccessInputVal(e.target.value, 0, 5000))
  }
  handleAirfoilDistributionChange (e, index, value) {
    this.props.changeGeometryParameter('airfoil.distribution', value)
  }
  handleAirfoilInterpolationChange (e, index, value) {
    this.props.changeGeometryParameter('airfoil.interpolation', value)
  }
  handleDisplayInternalMaterialChange (e, index, value) {
    this.props.changeDisplayParameter('internalMesh.material', value)
  }
  handleDisplayExternalMaterialChange (e, index, value) {
    this.props.changeDisplayParameter('externalMesh.material', value)
  }
  handleDisplayInternalMeshViewChange (e, val) {
    this.props.changeDisplayParameter('internalMesh.visible', val)
  }
  handleDisplayExternalMeshViewChange (e, val) {
    this.props.changeDisplayParameter('externalMesh.visible', val)
  }

  handleAirfoilChange (e, index, value) {
    if (this.props.geometry.airfoil.type === 'fromFile') {
      const airfoil = this.props.airfoils.find((item) => (item.filename === value))
      this.props.changeAirfoil(value, airfoil)
    } else {
      throw new Error('This airfoil type has not been implemented yet')
    }
  }

  render () {
    const { airfoils, display } = this.props
    const { wingParameters, structureParameters, internal, external, airfoil } = this.props.geometry

    return (
      <div style={style.scrollContainer(this.props.height)}>
        <Paper style={style.container}>
          <Foldable
            nom="Wing parameters"
          >
            <WingParametersControls
              wingParameters={wingParameters}
              handleLengthChange={this.handleLengthChange}
              handleRootChange={this.handleRootChange}
              handleTipChange={this.handleTipChange}
              handleSweepChange={this.handleSweepChange}
            />
          </Foldable>
          <Foldable
            nom="Structures parameters"
          >
            <StructuresParametersControls
              structureParameters={structureParameters}
              handleRibsChange={this.handleRibsChange}
              handleBeamCoordChange={this.handleBeamCoordChange}
            />
          </Foldable>
          <Foldable
            nom="Airfoil"
            obert
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
            nom="Display settings"
          >
            <DisplayControls display={display}
              handleDisplayInternalMaterialChange={this.handleDisplayInternalMaterialChange}
              handleDisplayExternalMaterialChange={this.handleDisplayExternalMaterialChange}
              handleDisplayInternalMeshViewChange={this.handleDisplayInternalMeshViewChange}
              handleDisplayExternalMeshViewChange={this.handleDisplayExternalMeshViewChange}
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
        <div style={style.actionBtnContainer}>
          <DownloadBtn circle />
        </div>
      </div>
    )
  }
}

Controls.propTypes = propTypes

export default connect(mapStateToProps, mapDispatchToProps)(Controls)
