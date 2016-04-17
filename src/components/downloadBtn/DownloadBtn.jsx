
import React from 'react'
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

const propTypes = {
  circle: React.PropTypes.bool,
}

class DownloadBtn extends React.Component {
  constructor (props) {
    super(props)

    this.downloadGid = this.downloadGid.bind(this)
  }

  downloadGid () {
    const zip = new JSZip()

    const GITobj = new GIDobject([data.objectData[0]])
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

export default DownloadBtn
