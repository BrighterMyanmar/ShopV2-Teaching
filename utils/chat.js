const Redis = require('./redis');
const MessageDB = require('../models/message');
const UnreadDB = require('../models/unread');

let liveUser = async (socketId, user) => {
   user["socketId"] = socketId;
   await Redis.setObj(socketId, user._id);
   await Redis.setObj(user._id, user);
}

let initialize = async (io, socket) => {
   socket["currentUserId"] = socket.userData._id;
   await liveUser(socket.id, socket.userData);

   socket.on('message', data => incommingMessage(io, socket, data));
   socket.on('unread', data => sendUnreadMsg(socket));
   socket.on('load-more', data => loadMore(socket, data));
}

let loadMore = async (socket, data) => {
   let limit = Number(process.env.MSG_LIMIT);
   let skip = data.page == 0 ? 0 : Number(data.page) * limit;
   let messages = await MessageDB.find({
      $or: [{ form: socket.currentUserId }, { to: socket.currentUserId }]
   }).sort({ created: -1 }).skip(skip).limit(limit).populate('from to', 'name _id');;

   socket.emit('messages', messages);
}

let incommingMessage = async (io, socket, message) => {
   let msg = await new MessageDB(message).save();
   let msgResult = await MessageDB.findOne({ _id: msg._id }).populate('from to', 'name _id');

   let toUser = await Redis.getObj(msgResult.to._id);

   if (toUser) {
      // let toSocket = io.of("/chat").connected[toUser.socketId];
      let toSocket = io.of("/chat").to(toUser.socketId);
      if (toSocket) {
         toSocket.emit("message", msgResult);
      }
   } else {
      await new UnreadDB({ from: msg.from, to: msg.to }).save();
   }
   socket.emit("message", msgResult);
}

let sendUnreadMsg = async (socket) => {
   let unreads = await UnreadDB.find({ to: socket.currentUserId });

   if (unreads.length > 0) {
      unreads.forEach(async (unread) => {
         await UnreadDB.findByIdAndDelete(unread._id);
      });
   }
   socket.emit('unread', { msg: unreads.length });
}



module.exports = {
   initialize
}