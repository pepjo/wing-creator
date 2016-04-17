
import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

// Functions
import downloadGid from '../simpleViewer/dowloadGIDfile'

// Components
import AirfoilControls from './subgroups/AirfoilControls'
import DisplayControls from './subgroups/DisplayControls'
import MeshControls from './subgroups/MeshControls'
import StructuresParametersControls from './subgroups/StructuresParametersControls'
import WingParametersControls from './subgroups/WingParametersControls'
import Paper from 'material-ui/lib/paper'
import Foldable from '../interface/Foldable'
import FloatingActionButton from 'material-ui/lib/floating-action-button'
import DownloadIcon from 'material-ui/lib/svg-icons/file/file-download'

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
  handleBeamCoordChange (e) {
    let val = parseFloat(e.target.value.replace(',', '.'), 10)
    if (isNaN(val) || val < 0) {
      val = 0
    } else if (val > 1) {
      val = 1
    }
    this.props.changeGeometryParameter('structureParameters.beamCoord', val)
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
              handleRibsChange={this.handleRibsChange}
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
          <FloatingActionButton onClick={downloadGid}>
            <DownloadIcon />
          </FloatingActionButton>
        </div>
      </div>
    )
  }
}

Controls.propTypes = propTypes

export default connect(mapStateToProps, mapDispatchToProps)(Controls)
