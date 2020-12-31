const express = require('express')
const router = express.Router()
const HomeController = require('../controllers/homeController.js')
const homeValidator = require('../middlewares/validators/homeValidator.js')

router.post('/searchBar', homeValidator.searchBar , HomeController.searchBar)
router.get('/carouselImages' , HomeController.carouselImages)

module.exports = router;
