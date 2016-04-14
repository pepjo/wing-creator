
import React from 'react'
import chai from 'chai'
import AppBar from '../AppBar.jsx'
import ReactTestUtils from 'react-addons-test-utils'

describe('AppBar', () => {
  it('should display the app\'s name', () => {
    const renderer = ReactTestUtils.createRenderer()
    renderer.render(<AppBar route={'/pep/nope'} />)
    const result = renderer.getRenderOutput()

    // Assert that the app name is displayed
  })

  it('should display path elements', () => {
    const renderer = ReactTestUtils.createRenderer()
    renderer.render(<AppBar route={'/pep/nope'} />)
    const result = renderer.getRenderOutput()

    // Assert that the path elements are displayed
  })
})
