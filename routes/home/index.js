
'use strict' // eslint-disable-line strict

const express = require('express')
const reactRender = require('./middleware/react-render')

const router = express.Router() // eslint-disable-line new-cap
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
  })
})

module.exports = router
