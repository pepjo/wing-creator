
import React from 'react'

// Components
import Root from './root'

// Redux
import configureStore from './root/configureStore'

export default function (userAgent) {
  const store = configureStore()
  return {
    component: (storeInstance) => (
      <Root store={storeInstance} userAgent={userAgent} />
    ),
    store,
    configureStore,
  }
}
