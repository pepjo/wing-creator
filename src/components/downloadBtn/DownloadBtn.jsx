
import React from 'react'
import { connect } from 'react-redux'
import JSZip from 'jszip'
import saveAs from 'browser-saveas'

// Files
import kratoskmdb from './GIDfunctions/auxiliar-files/kratos.kmdb'
import kratosspd from './GIDfunctions/auxiliar-files/kratos.spd'

// Functions
import GIDobject from './GIDfunctions/GIDobject'

// Components
import IconButton from 'material-ui/IconButton'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import DownloadIcon from 'material-ui/svg-icons/file/file-download'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'

// Styles
import * as style from './DownloadBtn.style.js'

const propTypes = {
  circle: React.PropTypes.bool,
  meshes: React.PropTypes.object,
  exportSettings: React.PropTypes.object,
}

function mapStateToProps (state) {
  return {
    meshes: state.meshes,
    exportSettings: state.exportSettings,
  }
}

function mapDispatchToProps () {
  return {}
}

class DownloadBtn extends React.Component {
  constructor (props) {
    super(props)

    this.downloadGid = this.downloadGid.bind(this)
    this.handleCloseDialog = this.handleCloseDialog.bind(this)

    this.state = {
      open: false,
    }
  }

  downloadGid () {
    this.setState({ open: true })

    const exportMeshes = []
    const zip = new JSZip()

    if (this.props.exportSettings.internalMesh) {
      const internalVertices = this.props.meshes.internalMesh.vertices.map((vertex) => (
        [vertex.x, vertex.y, vertex.z]
      ))

      exportMeshes.push({
        layer: 'Internal 0 1 0 0 0',
        vertices: internalVertices,
        segments: this.props.meshes.internalMesh.segments,
        faces: this.props.meshes.internalMesh.facesFromSegments,
        volumes: [],
      })
    }

    if (this.props.exportSettings.externalMesh) {
      let useVerticesFrom
      const externalVertices = this.props.meshes.externalMesh.vertices.map((vertex) => (
        [vertex.x, vertex.y, vertex.z]
      ))

      if (
        this.props.exportSettings.externalMesh &&
        this.props.exportSettings.internalMesh &&
        !this.props.exportSettings.differentVertices
      ) {
        useVerticesFrom = 0
      }

      exportMeshes.push({
        layer: 'External 0 1 255 0 0',
        vertices: externalVertices,
        segments: this.props.meshes.externalMesh.segments,
        faces: this.props.meshes.externalMesh.facesFromSegments,
        volumes: [],
        useVerticesFrom,
      })
    }

    const GITobj = new GIDobject(exportMeshes, this.props.exportSettings.problemType)
    const file = GITobj.generateFile()

    const gid = zip.folder('GIDwing.gid')
    gid.file('GIDwing.geo', file)

    if (this.props.exportSettings.problemType === 'KRATOS_structural') {
      gid.file('GIDwing.kmdb', kratoskmdb)
      gid.file('GIDwing.spd', kratosspd)
    }

    zip.generateAsync({ type: 'blob' })
    .then((content) => {
      saveAs(content, 'GIDwing.zip')
    })
  }

  handleCloseDialog () {
    this.setState({ open: false })
  }

  render () {
    let btn

    if (this.props.circle) {
      btn = (
        <FloatingActionButton onClick={this.downloadGid}>
          <DownloadIcon />
        </FloatingActionButton>
      )
    } else {
      btn = (
        <IconButton
          style={style.barIcon} tooltip="Download GID .geo"
          touch tooltipPosition="bottom-left"
          onClick={this.downloadGid}
        >
          <DownloadIcon color="white" />
        </IconButton>
      )
    }

    const actions = [
      <FlatButton
        label="Ok"
        primary
        keyboardFocused
        onTouchTap={this.handleCloseDialog}
      />,
    ]

    return (
      <span>
        {btn}
        <Dialog
          title="Downloading..."
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >
          If you have an airfoil selected the download should start any moment.<br /><br />
          You will need GID 12 or newer; grab your free copy here:
          <FlatButton style={{ position: 'relative', top: -2 }}
            primary
            label="Download GID"
            onClick={() => {
              window.open('http://www.gidhome.com/download')
            }}
          />
         <br /><br />
          If you have problems downloading try using the last version of Chrome.
        </Dialog>
      </span>
    )
  }
}

DownloadBtn.propTypes = propTypes

export default connect(mapStateToProps, mapDispatchToProps)(DownloadBtn)
