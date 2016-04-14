
import React from 'react'

// Components
import AppBar from './interface/AppBar'
import Viewer from './viewer/index'
import Controls from './controls/index'

// Sytles
import * as style from './app.style.js'

const propTypes = {
}

function App () {
  return (
    <div>
      <AppBar />
      <Viewer />
      <Controls />
      <footer style={style.footer}>
        Built by <em>Pep Rodeja Ferrer</em><br />
        for my <em>UPC BarcelonaTech</em> final degree project
      </footer>
    </div>
  )
}

App.propTypes = propTypes

export default App
