const books = require('../models').Books;
const { body, validationResult } = require('express-validator');
const authenticationmiddleware = require('../middlewares/authentication');
const multer = require('multer');
const cron = require('node-cron');
let uniqueName = null;
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads');
  },
  filename: (req, file, cb) => {
    console.log(file);
    uniqueName = Date.now() + '-' + file.originalname;
    cb(null, uniqueName);
  },
});
const upload = multer({
  storage: storage,
  limits: { fieldNameSize: 1000, fileSize: 102400000 },
  fileFilter: (req, file, cb) => {
    console.log('File filter running..');
    if (
      file.mimetype == 'image/png' ||
      file.mimetype == 'image/jpg' ||
      file.mimetype == 'image/jpeg'
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error('Only .png .jpg and .jpeg are allwed'));
    }
  },
});

exports.getBooks = [
  async (req, res) => {
    try {
      const books_list = await books.findAll();
      return res.send({ status: 200, books_list });
    } catch (error) {
      return res.send({ status: 500, data: error.message });
    }
  },
];
exports.addBook = [
  authenticationmiddleware,
  upload.single('image'),
  body('title')
    .trim()
    .isLength({ min: 5, max: 100 })
    .withMessage('title should have length min 5 ,max 100 chars'),
  body('subject')
    .trim()
    .isLength({ min: 10, max: 500 })
    .withMessage('subject body should have range between 10 and 500'),
  body('author')
    .trim()
    .isLength({ min: 5, max: 50 })
    .withMessage('author name should have range from 5 to 50 chars'),
  async (req, res) => {
    const { title, author, subject, price, category_id, availability } =
      req.body;
    const newBook = {
      image: `uploads/${uniqueName}`,
      title,
      author,
      subject,
      price,
      category_id,
      availability,
    };
    const errors = validationResult(req);
    console.log(errors);
    if (!errors.isEmpty()) {
      res.json({ status: 0, debug_data: errors });
    } else {
      try {
        const findBook = await books.findOne({
          where: { title },
        });
        if (findBook) {
          return res.send({ status: 400, data: 'book already exist' });
        } else {
          await books.create(newBook);
          return res.send({ status: 200, data: 'book created successfully' });
        }
      } catch (error) {
        return res.send({ status: 500, data: error.message });
      }
    }
  },
];
exports.editBook = [
  authenticationmiddleware,
  body('title')
    .trim()
    .isLength({ min: 10, max: 100 })
    .withMessage('title should have length min 10 ,max 100 chars'),
  body('subject')
    .trim()
    .isLength({ min: 20, max: 500 })
    .withMessage('subject body should have range between 20 and 500'),
  body('author')
    .trim()
    .isLength({ min: 5, max: 50 })
    .withMessage('author name should have range from 5 to 50 chars'),
  async (req, res) => {
    const id = req.params.id;
    try {
      const findBook = await books.findOne({
        where: { id },
      });
      findBook.title = req.body.title;
      findBook.author = req.body.author;
      findBook.subject = req.body.subject;
      findBook.price = req.body.price;
      findBook.category_id = req.body.category_id;
      findBook.availability = req.body.availability;

      await findBook.save();
      return res.send({ status: 200, data: 'book updated successfully' });
    } catch (error) {
      return res.send({ status: 500, data: error.message });
    }
  },
];
exports.bookById = [
  authenticationmiddleware,
  async (req, res) => {
    const id = req.params.id;
    try {
      const findBook = await books.findOne({
        where: { id },
      });
      return res.send({ status: 200, book_data: findBook });
    } catch (err) {
      return res.send({ status: 500, data: error.message });
    }
  },
];
exports.deleteBook = [
  authenticationmiddleware,
  async (req, res) => {
    const id = req.params.id;
    try {
      const findBook = await books.findOne({
        where: { id },
      });
      await findBook.destroy();
      return res.json({ status: 200, message: 'book Deleted successfully' });
    } catch (error) {
      return res.send({ status: 500, data: error.message });
    }
  },
];
cron.schedule('0 0 19 * * * ', async () => {
  console.log('corn job is scheduled to add books on everyday at 7 PM');
  const newBook = {
    title: 'filename',
    author: 'abdul kalam',
    subject: 'inspirational book',
    price: '200',
    category_id: 3,
    availability: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  try {
    await books.create(newBook);
    return res.send({ status: 200, data: 'book created successfully' });
  } catch (error) {
    return res.send({ status: 500, data: error.message });
  }
});
