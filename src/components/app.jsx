
require('perfnow') // Polyfill performane.now

import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import axios from 'axios'

// Components
import AppBar from './interface/AppBar'
import Viewer from './simpleViewer/simpleViewer'
import Controls from './controls/Controls'
import Container from './container'
import Tutorial from './tutorial/Tutorial'

// Actions
import { replaceAirfoils } from '../actions/data'
import { changeTutorialState } from '../actions/display'

// Sytles
import * as style from './app.style.js'

const propTypes = {
  replaceAirfoils: React.PropTypes.func,
  changeTutorialState: React.PropTypes.func,
}

function mapStateToProps () {
  return {}
}

function mapDispatchToProps (dispatch) {
  return {
    replaceAirfoils: bindActionCreators(replaceAirfoils, dispatch),
    changeTutorialState: bindActionCreators(changeTutorialState, dispatch),
  }
}

class App extends React.Component {
  constructor (props) {
    super(props)
    this.loadAirfoils = this.loadAirfoils.bind(this)
  }

  componentDidMount () {
    if (window.location.hostname === 'loalhost') {
      setInterval(() => { this.loadAirfoils() }, 10000)
    }
  }

  loadAirfoils () {
    axios.get('/api/airfoils')
    .then((response) => {
      try {
        this.props.replaceAirfoils(response.data)
      } catch (err) {
        console.log(err.stack)
      }
    })
    .catch(() => {
      console.error('ERROR LOADING AIRFOILS')
    })
  }

  render () {
    return (
      <Container>
        <AppBar
          changeTutorialState={this.props.changeTutorialState.bind(undefined, true)} // eslint-disable-line
        />
        <Viewer />
        <Controls />
        <Tutorial />
        <footer style={style.footer}>
          Built by <em>Pep Rodeja Ferrer</em><br />
          for my <em>UPC BarcelonaTech</em> final degree project
        </footer>
      </Container>
    )
  }
}

App.propTypes = propTypes

export default connect(mapStateToProps, mapDispatchToProps)(App)
