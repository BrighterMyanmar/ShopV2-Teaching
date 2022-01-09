const bcrypt = require('bcryptjs');

let fMsg = (res, msg, result = undefined) => {
   res.status(200).json({ con: true, msg, result });
}

module.exports = {
   fMsg,
   encode: password => bcrypt.hashSync(password, 10),
   comparePass:(plain,hash) => bcrypt.compareSync(plain,hash)
}