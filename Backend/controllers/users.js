const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Users = require('../models').Users;
const authenticationmiddleware = require('../middlewares/authentication');
exports.getUsers = [
  authenticationmiddleware,
  async (req, res) => {
    try {
      const users_list = await Users.findAll();
      return res.send({ status: 200, users_list });
    } catch (error) {
      return res.send({ status: 500, data: error.message });
    }
  },
];
exports.loginUser = async (req, res) => {
  const { username, password } = req.body;
  try {
    const userOb = await Users.findOne({ where: { username } });
    if (userOb) {
      const passCorrect = await bcrypt.compareSync(password, userOb.password);
      if (!passCorrect) {
        res.status(400).json({ error: 'user credentials wrong' });
      } else {
        const payload = {
          userOb: {
            username: username,
            password: password,
          },
        };
        const token = jwt.sign(payload, 'secret_string', { expiresIn: 1200 });
        res.status(200).json({ token, userOb });
      }
    } else {
      res.status(400).json({ error: 'username not exist' });
    }
  } catch (error) {
    res.status(500).json({ error: 'temporary error in backend' });
  }
};
exports.getUserById = [
  authenticationmiddleware,
  async (req, res) => {
    const id = req.params.id;
    try {
      const findUser = await Users.findOne({
        where: { id },
      });
      return res.send({ status: 200, book_data: findUser });
    } catch (err) {
      return res.send({ status: 500, data: error.message });
    }
  },
];
