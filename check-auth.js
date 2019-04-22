const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try{
    const decoded = jwt.verify(req.headers.authorization, process.env.JWT_KEY);
    console.log(req.headers)
    req.userData = decoded;
    req.body.userId = req.userData.sub
    console.log(req.userData);
  } catch (error) {
    return res.status(401).json({
      message: 'Auth failed'
    });
  }
  
  next();
}