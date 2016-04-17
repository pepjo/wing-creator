
import React from 'react'
import { pure } from 'recompose'

// Functions
import downloadGid from '../simpleViewer/dowloadGIDfile'

// Components
import Toolbar from 'material-ui/Toolbar'
import ToolbarGroup from 'material-ui/Toolbar/ToolbarGroup'
import IconButton from 'material-ui/IconButton'
import DownloadIcon from 'material-ui/svg-icons/file/file-download'

// Styles
import * as style from './AppBar.style.js'

const propTypes = {
}

function AppBar () {
  return (
    <div style={style.container}>
      <Toolbar style={style.bar}>
        <ToolbarGroup firstChild float="left">
          <span style={style.title}>Wing creator and mesh utility</span>
        </ToolbarGroup>
        <ToolbarGroup lastChild float="right">
          <IconButton
            style={style.icon} tooltip="Download GID .geo"
            touch tooltipPosition="bottom-left"
            onClick={downloadGid}
          >
            <DownloadIcon color="white" />
          </IconButton>
        </ToolbarGroup>
      </Toolbar>
    </div>
  )
}

AppBar.propTypes = propTypes

export default pure(AppBar)
