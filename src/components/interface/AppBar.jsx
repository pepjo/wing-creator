
import React from 'react'
import { pure } from 'recompose'

// Components
import Toolbar from 'material-ui/Toolbar'
import ToolbarGroup from 'material-ui/Toolbar/ToolbarGroup'
import DownloadBtn from '../downloadBtn/DownloadBtn'

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
          <DownloadBtn circle={false} />
        </ToolbarGroup>
      </Toolbar>
    </div>
  )
}

AppBar.propTypes = propTypes

export default pure(AppBar)
