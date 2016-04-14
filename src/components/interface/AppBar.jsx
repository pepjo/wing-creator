
import React from 'react'
import { pure } from 'recompose'

// Components
import Toolbar from 'material-ui/lib/toolbar/toolbar'
import ToolbarGroup from 'material-ui/lib/toolbar/toolbar-group'

// Styles
import * as style from './AppBar.style.js'

const propTypes = {
}

function AppBar () {
  return (
    <Toolbar>
      <ToolbarGroup firstChild float="left">
        <span style={style.title}>Wing creator and mesh utility</span>
      </ToolbarGroup>
    </Toolbar>
  )
}

AppBar.propTypes = propTypes

export default pure(AppBar)
