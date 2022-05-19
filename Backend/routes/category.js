const express = require('express');
const categoryController = require('../controllers/category');
const router = express.Router();
router.get('/', categoryController.getCategory);
router.post('/', categoryController.addCategory);
router.put('/:id', categoryController.editCategory);
router.delete('/:id', categoryController.deleteCategory);
router.get('/:id', categoryController.categoryById);

module.exports = router;
