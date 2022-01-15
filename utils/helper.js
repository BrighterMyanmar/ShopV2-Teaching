const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

let fMsg = (res, msg, result = undefined) => {
   res.status(200).json({ con: true, msg, result });
}

let getToken = (req, next) => {
   if (req.headers.authorization) return req.headers.authorization.split(" ")[1];
   else next(new Error("Tokenization Error"));
}

let verifyToken = async (req, next) => {
   let token = getToken(req,next);
   let user = "";
   try{
      user = jwt.verify(token, process.env.SECRET_KEY);
      req.body.user = user;
   }catch(error){
      next(new Error('Token Validation Error'));
   }finally{
      next();
   }
}

module.exports = {
   fMsg,
   encode: password => bcrypt.hashSync(password, 10),
   comparePass: (plain, hash) => bcrypt.compareSync(plain, hash),
   makeToken: payload => jwt.sign(payload, process.env.SECRET_KEY),
   verifyToken,
   getToken
}