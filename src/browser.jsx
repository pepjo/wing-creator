
require('babel-polyfill')

import injectTapEventPlugin from 'react-tap-event-plugin'
injectTapEventPlugin()

// Libraries
import React from 'react'
import ReactDom from 'react-dom'
import configureStore from './root/configureStore' // Redux

// Components
import Root from './root'

window.startApp = () => {
  // Our state
  const store = configureStore(window.__INITIAL_STATE__)

  ReactDom.render(
    <Root store={store} userAgent={navigator.userAgent} />,
    document.getElementById('react-content')
  )
}
