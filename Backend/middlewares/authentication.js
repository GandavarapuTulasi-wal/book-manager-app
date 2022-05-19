const jwt = require('jsonwebtoken');
module.exports = (req, res, next) => {
  const token = req.header('token');
  if (!token) {
    res.status(401).json({ debug_msg: 'Please login' });
  }
  try {
    const decodedToken = jwt.verify(token, 'secret_string');
    console.log(decodedToken);
    next();
  } catch (error) {
    res.status(500).json({ debug_msg: 'Token sent is not valid' });
  }
};
