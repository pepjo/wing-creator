
'use strict' // eslint-disable-line strict

const express = require('express')
const reactRender = require('./middleware/react-render')
const loadAirfoils = require('./middleware/load-airfoils')

const router = express.Router() // eslint-disable-line new-cap
router.use(loadAirfoils)
router.use(reactRender)

/*
 *    Loads main page
 */
router.get('/', (req, res) => {
  res.reactRender({
    lang: 'ca',
    pageinfo: {
      title: 'Home page',
      name: 'Home page',
      description: 'Home page',
      keywords: 'Home page',
    },
    initial: {
      data: {
        airfoils: req.airfoils,
      },
    },
  })
})

module.exports = router
