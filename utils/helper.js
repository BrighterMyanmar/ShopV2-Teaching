
let fMsg = (res, msg, result = undefined) => {
   res.status(200).json({ con: true, msg, result });
}

module.exports = {
   fMsg,
}