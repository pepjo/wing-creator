
'use strict' // eslint-disable-line strict

const express = require('express')
const loadAirfoils = require('./middleware/load-airfoils')

const router = express.Router() // eslint-disable-line new-cap
router.use(loadAirfoils)

/*
 *    Returns the airfoils
 */
router.get('/airfoils', (req, res) => {
  res.json(req.airfoils)
})

module.exports = router
