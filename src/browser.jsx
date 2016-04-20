
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
  const savedSettings = JSON.parse(localStorage.getItem('savedSettings'))
  let initialState = window.__INITIAL_STATE__

  if (
    savedSettings &&
    savedSettings.version === process.env.version &&
    process.env.NODE_ENV !== 'development'
  ) {
    initialState = savedSettings
  }
  const store = configureStore(initialState)

  ReactDom.render(
    <Root store={store} userAgent={navigator.userAgent} />,
    document.getElementById('react-content')
  )
}
