// dependency
const jwt = require('jsonwebtoken');

// middleware that authenticates user's JSON web token
exports.authenticate = (req, res, next) => {
  // if token is in authorization header
  // it is saved into token variable
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  
  try {
    // throws error if no token is inputted
    if (token == null)
      throw new Error('Authentication Token is needed');

    // if token is input, verifies that token is valid
    jwt.verify(token, process.env.JWT_STRING, (err, id) => {

      // throws error if not valid
      if (err)
        throw err;
      
      req.id = id; // puts user information into request if token is valid
      next(); // allows request to move on
    });
  } catch (err) {
    res.status(403).json({ message: err.message });
  }
}