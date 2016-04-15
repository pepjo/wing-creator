
import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import axios from 'axios'

// Components
import AppBar from './interface/AppBar'
import Viewer from './viewer/index'
import Controls from './controls/index'

// Actions
import { replaceAirfoils } from '../actions/data'

// Sytles
import * as style from './app.style.js'

const propTypes = {
  replaceAirfoils: React.PropTypes.func,
}

function mapStateToProps () {
  return {}
}

function mapDispatchToProps (dispatch) {
  return {
    replaceAirfoils: bindActionCreators(replaceAirfoils, dispatch),
  }
}

class App extends React.Component {
  constructor (props) {
    super(props)
    this.loadAirfoils = this.loadAirfoils.bind(this)
  }

  componentDidMount () {
    setInterval(() => { this.loadAirfoils() }, 10000)
  }

  loadAirfoils () {
    axios.get('/api/airfoils')
    .then((response) => {
      this.props.replaceAirfoils(response.data)
    })
    .catch(() => {
      console.error('ERROR LOADING AIRFOILS')
    })
  }

  render () {
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
}

App.propTypes = propTypes

export default connect(mapStateToProps, mapDispatchToProps)(App)
