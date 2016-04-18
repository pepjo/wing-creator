
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
      title: 'Wing creator',
      name: 'Wing creator',
      description: 'This app allows to create wings and export them to GID',
      keywords: 'GID, wing, airfoil, creator',
    },
    initial: {
      data: {
        airfoils: req.airfoils,
      },
    },
  })
})

module.exports = router
