
import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import bezier from 'cubic-bezier'

// Components
import FluidBoxControls from './subgroups/FluidBoxControls'
import AirfoilControls from './subgroups/AirfoilControls'
import DisplayControls from './subgroups/DisplayControls'
import ExportControls from './subgroups/ExportControls'
import MeshControls from './subgroups/MeshControls'
import StructuresParametersControls from './subgroups/StructuresParametersControls'
import WingParametersControls from './subgroups/WingParametersControls'
import Paper from 'material-ui/Paper'
import Foldable from '../interface/Foldable'
import DownloadBtn from '../downloadBtn/DownloadBtn'

// Actions
import { changeGeometryParameter, changeAirfoil, changeAirfoilType } from '../../actions/geometry'
import { changeDisplayParameter } from '../../actions/display'
import { updateExportSetting } from '../../actions/exportSettings'

// Styles
import * as style from './Controls.style'

// Shapes
import geometryShape from '../../shapes/geometry'
import displayShape from '../../shapes/display'
import exportSettingsShape from '../../shapes/exportSettings'

const propTypes = {
  height: React.PropTypes.number,
  geometry: geometryShape,
  display: displayShape,
  exportSettings: exportSettingsShape,
  airfoils: React.PropTypes.array,
  changeGeometryParameter: React.PropTypes.func,
  changeAirfoil: React.PropTypes.func,
  changeAirfoilType: React.PropTypes.func,
  changeDisplayParameter: React.PropTypes.func,
  updateExportSetting: React.PropTypes.func,
}

function mapStateToProps (state) { // eslint-disable-line no-unused-vars
  return {
    height: state.display.height,
    geometry: state.geometry,
    exportSettings: state.exportSettings,
    airfoils: state.data.airfoils,
    display: state.display,
  }
}

function mapDispatchToProps (dispatch) { // eslint-disable-line no-unused-vars
  return {
    changeGeometryParameter: bindActionCreators(changeGeometryParameter, dispatch),
    changeDisplayParameter: bindActionCreators(changeDisplayParameter, dispatch),
    changeAirfoilType: bindActionCreators(changeAirfoilType, dispatch),
    changeAirfoil: bindActionCreators(changeAirfoil, dispatch),
    updateExportSetting: bindActionCreators(updateExportSetting, dispatch),
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

    this.handleToggle = this.handleToggle.bind(this)
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
    this.handleProblemTypeChange = this.handleProblemTypeChange.bind(this)
    this.handleExportDifferentVerticesChange = this.handleExportDifferentVerticesChange.bind(this)
    this.handleExportExternalMeshChange = this.handleExportExternalMeshChange.bind(this)
    this.handleExportInternalMeshChange = this.handleExportInternalMeshChange.bind(this)
    this.handleFluidBoxWidthChange = this.handleFluidBoxWidthChange.bind(this)
    this.handleFluidBoxLengthChange = this.handleFluidBoxLengthChange.bind(this)
    this.handleFluidBoxHeightChange = this.handleFluidBoxHeightChange.bind(this)
    this.handleFluidBoxXCoordChange = this.handleFluidBoxXCoordChange.bind(this)
    this.handleBeamExtensionChange = this.handleBeamExtensionChange.bind(this)
    this.handleDisplayFluidBoxMaterialChange = this.handleDisplayFluidBoxMaterialChange.bind(this)
    this.handleDisplayFluidBoxMeshViewChange = this.handleDisplayFluidBoxMeshViewChange.bind(this)
    this.handleExportFluidBoxMeshChange = this.handleExportFluidBoxMeshChange.bind(this)
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
  handleBeamExtensionChange (e) {
    this.props.changeGeometryParameter('structureParameters.beamExtension',
      proccessInputVal(e.target.value, 0))
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
    this.props.changeAirfoilType(value)
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
  handleDisplayFluidBoxMaterialChange (e, index, value) {
    this.props.changeDisplayParameter('fluidBoxMesh.material', value)
  }
  handleDisplayFluidBoxMeshViewChange (e, val) {
    this.props.changeDisplayParameter('fluidBoxMesh.visible', val)
  }
  handleDisplayExternalMeshViewChange (e, val) {
    this.props.changeDisplayParameter('externalMesh.visible', val)
  }
  handleProblemTypeChange (e, index, value) {
    this.props.updateExportSetting('problemType', value)
  }
  handleExportDifferentVerticesChange (e, val) {
    this.props.updateExportSetting('differentVertices', val)
  }
  handleExportExternalMeshChange (e, val) {
    this.props.updateExportSetting('externalMesh', val)
  }
  handleExportInternalMeshChange (e, val) {
    this.props.updateExportSetting('internalMesh', val)
  }
  handleExportFluidBoxMeshChange (e, val) {
    this.props.updateExportSetting('fluidBoxMesh', val)
  }
  handleFluidBoxWidthChange (e) {
    this.props.changeGeometryParameter('fluidBox.width',
      proccessInputVal(e.target.value, 0))
  }
  handleFluidBoxLengthChange (e) {
    this.props.changeGeometryParameter('fluidBox.length',
      proccessInputVal(e.target.value, 0))
  }
  handleFluidBoxHeightChange (e) {
    this.props.changeGeometryParameter('fluidBox.height',
      proccessInputVal(e.target.value, 0))
  }
  handleFluidBoxXCoordChange (e) {
    this.props.changeGeometryParameter('fluidBox.x',
      proccessInputVal(e.target.value))
  }

  handleAirfoilChange (e, index, value) {
    if (this.props.geometry.airfoil.type === 'fromFile') {
      const airfoil = this.props.airfoils.find((item) => (item.filename === value))
      this.props.changeAirfoil(airfoil, value)
    } else if (this.props.geometry.airfoil.type === 'fromNACA4') {
      this.props.changeAirfoil(e.target.value)
    } else {
      throw new Error('This airfoil type has not been implemented yet')
    }
  }

  handleToggle (el, open, height) {
    const top = el.getBoundingClientRect().top
    const displayHeight = this.props.display.height
    if (top + height + 100 > displayHeight && open) {
      const containerScroll = this.refs.scrollContainer
      const initialTime = performance.now()
      const goal = containerScroll.scrollTop + top + height + 150 - displayHeight
      const origin = containerScroll.scrollTop
      const totalTime = 200
      const easeIn = bezier(0, 0.02, 0.55, 1, 400)

      const animate = () => {
        const time = performance.now() - initialTime
        if (time > totalTime) {
          containerScroll.scrollTop = goal
        } else {
          containerScroll.scrollTop = origin + (goal - origin) * easeIn(time / totalTime)
          requestAnimationFrame(animate)
        }
      }

      animate()
    }
  }

  render () {
    const { airfoils, display, exportSettings } = this.props
    const {
      wingParameters, structureParameters, internal, external, fluidBox, airfoil,
    } = this.props.geometry

    return (
      <div
        ref="scrollContainer"
        style={style.scrollContainer(this.props.height)}
      >
        <Paper style={style.container}>
          <Foldable
            nom="Wing parameters"
            onToggle={this.handleToggle}
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
            onToggle={this.handleToggle}
          >
            <StructuresParametersControls
              structureParameters={structureParameters}
              handleRibsChange={this.handleRibsChange}
              handleBeamCoordChange={this.handleBeamCoordChange}
              handleBeamExtensionChange={this.handleBeamExtensionChange}
            />
          </Foldable>
          <Foldable
            nom="Airfoil"
            onToggle={this.handleToggle}
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
            onToggle={this.handleToggle}
          >
            <DisplayControls display={display}
              handleDisplayInternalMaterialChange={this.handleDisplayInternalMaterialChange}
              handleDisplayExternalMaterialChange={this.handleDisplayExternalMaterialChange}
              handleDisplayInternalMeshViewChange={this.handleDisplayInternalMeshViewChange}
              handleDisplayExternalMeshViewChange={this.handleDisplayExternalMeshViewChange}
              handleDisplayFluidBoxMaterialChange={this.handleDisplayFluidBoxMaterialChange}
              handleDisplayFluidBoxMeshViewChange={this.handleDisplayFluidBoxMeshViewChange}
            />
          </Foldable>
          <Foldable
            nom="Internal structure"
            onToggle={this.handleToggle}
          >
            <MeshControls meshProps={internal}
              handleTypeChange={this.handleInternalTypeChange}
              handleThicknessChange={this.handleInternalThicknessChange}
            />
          </Foldable>
          <Foldable
            nom="External structure"
            onToggle={this.handleToggle}
          >
            <MeshControls meshProps={external}
              handleTypeChange={this.handleExternalTypeChange}
              handleThicknessChange={this.handleExternalThicknessChange}
            />
          </Foldable>
          <Foldable
            nom="Fluid box"
            onToggle={this.handleToggle}
          >
            <FluidBoxControls fluidBox={fluidBox}
              handleFluidBoxWidthChange={this.handleFluidBoxWidthChange}
              handleFluidBoxLengthChange={this.handleFluidBoxLengthChange}
              handleFluidBoxHeightChange={this.handleFluidBoxHeightChange}
              handleFluidBoxXCoordChange={this.handleFluidBoxXCoordChange}
            />
          </Foldable>
          <Foldable
            nom="Export settings"
            onToggle={this.handleToggle}
          >
            <ExportControls exportSettings={exportSettings}
              handleProblemTypeChange={this.handleProblemTypeChange}
              handleExportDifferentVerticesChange={this.handleExportDifferentVerticesChange}
              handleExportExternalMeshChange={this.handleExportExternalMeshChange}
              handleExportInternalMeshChange={this.handleExportInternalMeshChange}
              handleExportFluidBoxMeshChange={this.handleExportFluidBoxMeshChange}
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
