const category = require('../models').category;
const authenticationmiddleware = require('../middlewares/authentication');
exports.getCategory = [
  async (req, res) => {
    try {
      const category_list = await category.findAll();
      return res.send({ status: 200, category_list });
    } catch (error) {
      return res.send({ status: 500, data: error.message });
    }
  },
];
exports.addCategory = [
  authenticationmiddleware,
  async (req, res) => {
    try {
      await category.create(req.body);
      return res.send({ status: 200, data: 'category created successfully' });
    } catch (error) {
      return res.send({ status: 500, data: error.message });
    }
  },
];
exports.editCategory = [
  authenticationmiddleware,
  async (req, res) => {
    const id = req.params.id;
    try {
      const findCategory = await category.findOne({
        where: { id },
      });
      findCategory.category_name = req.body.category_name;

      await findCategory.save();
      return res.send({ status: 200, data: 'category updated successfully' });
    } catch (error) {
      return res.send({ status: 500, data: error.message });
    }
  },
];
exports.categoryById = [
  authenticationmiddleware,
  async (req, res) => {
    const id = req.params.id;
    try {
      const findCategory = await category.findOne({
        where: { id },
      });
      return res.send({ status: 200, category_data: findCategory });
    } catch (err) {
      return res.send({ status: 500, data: error.message });
    }
  },
];
exports.deleteCategory = [
  authenticationmiddleware,
  async (req, res) => {
    const id = req.params.id;
    try {
      const findCategory = await category.findOne({
        where: { id },
      });
      await findCategory.destroy();
      return res.json({
        status: 200,
        message: 'category Deleted successfully',
      });
    } catch (error) {
      return res.send({ status: 500, data: error.message });
    }
  },
];
