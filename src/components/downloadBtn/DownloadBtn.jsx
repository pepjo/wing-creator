
import React from 'react'
import { connect } from 'react-redux'
import JSZip from 'jszip'
import saveAs from 'browser-saveas'

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
    this.handleCloseDialog = this.handleCloseDialog.bind(this)

    this.state = {
      open: false,
    }
  }

  downloadGid () {
    this.setState({ open: true })

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
