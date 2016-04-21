
import React from 'react'
import { pure } from 'recompose'

// Components
import Toolbar from 'material-ui/Toolbar'
import ToolbarGroup from 'material-ui/Toolbar/ToolbarGroup'
import DownloadBtn from '../downloadBtn/DownloadBtn'
import IconButton from 'material-ui/IconButton'
import IconSVG from 'material-ui/svg-icons/image/assistant'

// Styles
import * as style from './AppBar.style.js'

const propTypes = {
  changeTutorialState: React.PropTypes.func,
}

function AppBar ({ changeTutorialState }) {
  return (
    <div style={style.container}>
      <Toolbar style={style.bar}>
        <ToolbarGroup firstChild float="left">
          <span style={style.title}>Wing creator and mesh utility</span>
        </ToolbarGroup>
        <ToolbarGroup lastChild float="right">
          <IconButton
            style={style.barIcon} tooltip="See instructions" touch tooltipPosition="bottom-left"
            onClick={changeTutorialState}
          >
            <IconSVG color="white" />
          </IconButton>
          <DownloadBtn circle={false} />
        </ToolbarGroup>
      </Toolbar>
    </div>
  )
}

AppBar.propTypes = propTypes

export default pure(AppBar)
