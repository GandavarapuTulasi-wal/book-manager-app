const Borrowed_details = require('../models').Borrowed_details;
const Books = require('../models').Books;
const Users = require('../models').Users;
const authenticationmiddleware = require('../middlewares/authentication');
exports.getBorrowedBooks = [
  authenticationmiddleware,
  async (req, res) => {
    try {
      const borrow_list = await Borrowed_details.findAll();
      return res.send({ status: 200, borrow_list });
    } catch (error) {
      return res.send({ status: 500, data: error.message });
    }
  },
];
exports.assignStatus = [
  authenticationmiddleware,
  async (req, res) => {
    const { user_id, book_id } = req.body;
    try {
      await Borrowed_details.create({ user_id, book_id, return_status: false });
      return res.send({ status: 200, data: `Book Borrowed by the user!` });
    } catch (error) {
      return res.send({ status: 500, data: error.message });
    }
  },
];
exports.returnStatus = [
  authenticationmiddleware,
  async (req, res) => {
    const id = req.params.id;
    try {
      const findBookStatus = await Borrowed_details.findOne({
        where: { id },
      });
      findBookStatus.user_id = req.body.user_id;
      findBookStatus.book_id = req.body.book_id;
      findBookStatus.return_status = true;

      await findBookStatus.save();
      return res.send({ status: 200, data: 'Book returned successfully' });
    } catch (error) {
      return res.send({ status: 500, data: error.message });
    }
  },
];
exports.getAssignStatusBooks = [
  authenticationmiddleware,
  async (req, res) => {
    try {
      const statusInfo = await Borrowed_details.findAll({
        where: {
          return_status: false,
        },
        include: [
          {
            model: Books,
            attributes: ['title'],
          },
          {
            model: Users,
            attributes: ['username', 'email'],
          },
        ],
      });
      return res.send({ status: 200, data: statusInfo });
    } catch (error) {
      return res.send({ status: 500, data: error.message });
    }
  },
];
exports.borrowBookById = [
  authenticationmiddleware,
  async (req, res) => {
    const id = req.params.id;
    try {
      const findBorrowedBook = await Borrowed_details.findOne({
        where: { id },
      });
      return res.send({ status: 200, borrowed_data: findBorrowedBook });
    } catch (err) {
      return res.send({ status: 500, data: error.message });
    }
  },
];
exports.deleteBorrowedBook = [
  authenticationmiddleware,
  async (req, res) => {
    const id = req.params.id;
    try {
      const findBorrowedBook = await Borrowed_details.findOne({
        where: { id },
      });
      await findBorrowedBook.destroy();
      return res.json({
        status: 200,
        data: 'borrowed data Deleted successfully',
      });
    } catch (error) {
      return res.send({ status: 500, data: error.message });
    }
  },
];
