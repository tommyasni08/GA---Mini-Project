const express = require('express')
const router = express.Router()
const CategoryController = require('../controllers/categoryController.js')
const categoryValidator = require('../middlewares/validators/categoryValidator.js')

router.get('/action' , categoryValidator.category, CategoryController.action)
router.get('/comedy' , categoryValidator.category, CategoryController.comedy)
router.get('/drama' , categoryValidator.category, CategoryController.drama)
router.get('/animation' , categoryValidator.category, CategoryController.animation)
router.get('/biography' , categoryValidator.category, CategoryController.biography)
router.post('/' , categoryValidator.category, CategoryController.category)
router.get('/', categoryValidator.category, CategoryController.categoryAll)

module.exports = router;
