
import React from 'react'
import { connect } from 'react-redux'
import JSZip from 'jszip'
import saveAs from 'browser-saveas'

// Functions
import GIDobject from './GIDfunctions/GIDobject'

// TODO: DELETE THIS
import * as data from './GIDfunctions/__test__/GIDobject.data'

// Components
import IconButton from 'material-ui/IconButton'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import DownloadIcon from 'material-ui/svg-icons/file/file-download'

// Styles
import * as style from './DownloadBtn.style.js'

// Shapes
import geometryShape from '../../shapes/geometry'

const propTypes = {
  circle: React.PropTypes.bool,
  geometry: geometryShape,
  airfoilShell: React.PropTypes.object,
}

function mapStateToProps (state) {
  return {
    geometry: state.geometry,
    airfoilShell: state.meshes.airfoilShell,
  }
}

function mapDispatchToProps () {
  return {}
}

class DownloadBtn extends React.Component {
  constructor (props) {
    super(props)

    this.downloadGid = this.downloadGid.bind(this)
  }

  downloadGid () {
    const zip = new JSZip()

    const vertices = this.props.airfoilShell.vertices.map((airfoil) => (
      [airfoil.x, airfoil.y, airfoil.z]
    ))

    const GITobj = new GIDobject([{
      vertices,
      segments: vertices.map((vertex, j) => {
        if (vertices.length - 1 === j) {
          return [j, 0]
        }
        return [j, j + 1]
      }),
      faces: [],
      volumes: [],
    }])
    const file = GITobj.generateFile()

    const gid = zip.folder('GIDwing.gid')
    gid.file('GIDwing.geo', file)

    zip.generateAsync({ type: 'blob' })
    .then((content) => {
      saveAs(content, 'GIDwing.zip')
    })
  }

  render () {
    if (this.props.circle) {
      return (
        <FloatingActionButton onClick={this.downloadGid}>
          <DownloadIcon />
        </FloatingActionButton>
      )
    }
    return (
      <IconButton
        style={style.barIcon} tooltip="Download GID .geo"
        touch tooltipPosition="bottom-left"
        onClick={this.downloadGid}
      >
        <DownloadIcon color="white" />
      </IconButton>
    )
  }
}

DownloadBtn.propTypes = propTypes

export default connect(mapStateToProps, mapDispatchToProps)(DownloadBtn)
