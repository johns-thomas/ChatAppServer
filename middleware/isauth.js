const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const authHeader = req.get('Authorization');
  console.log( req.get('Authorization'))
  if (!authHeader) {
    const error = new Error('Not authenticated.');
    error.statusCode = 401;
    throw error;
  }
  const token = authHeader.split(' ')[1];
  let decodedToken=null;
  try {
    //console.log(token + " gnu")
    decodedToken = jwt.verify(token, 'jesuschrististhesavioursaveme');
  } catch (err) {
    err.statusCode = 500;
    throw err;
  }
/*
console.log(token)
  jwt.verify(token, 'jesuschrististhesavioursaveme',(decodedToken)=>{
    console.log(decodedToken)
    if (!decodedToken) {
      const error = new Error('Not authenticated.');
      error.statusCode = 401;
      throw error;
    }*/
    req.userId = decodedToken.userId;
    next();
  //})


  
};
