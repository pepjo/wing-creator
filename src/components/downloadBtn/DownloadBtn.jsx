
import React from 'react'

// Functions
import downloadGid from './downloadGIDfile'

// Components
import IconButton from 'material-ui/IconButton'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import DownloadIcon from 'material-ui/svg-icons/file/file-download'

// Styles
import * as style from './DownloadBtn.style.js'

const propTypes = {
  circle: React.PropTypes.bool,
}

function DownloadBtn (props) {
  if (props.circle) {
    return (
      <FloatingActionButton onClick={downloadGid}>
        <DownloadIcon />
      </FloatingActionButton>
    )
  }
  return (
    <IconButton
      style={style.barIcon} tooltip="Download GID .geo"
      touch tooltipPosition="bottom-left"
      onClick={downloadGid}
    >
      <DownloadIcon color="white" />
    </IconButton>
  )
}

DownloadBtn.propTypes = propTypes

export default DownloadBtn
