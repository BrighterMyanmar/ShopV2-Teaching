const Redis = require('./redis');

let liveUser = async (socketId, user) => {
   user["socketId"] = socketId;
   await Redis.setObj(socketId, user._id);
   await Redis.setObj(user._id, user);
}

let initialize = async (io, socket) => {
   socket["currentUserId"] = socket.userData._id;
   console.log(socket.id);
   console.log(socket.userData);
   await liveUser(socket.id, socket.userData);

   socket.on('message', data => {
      console.log(data);
   });

   // message 
   // unread 
   // load-more
}

module.exports = {
   initialize
}