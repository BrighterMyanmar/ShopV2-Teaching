const asyncRedis = require("async-redis");
const RedisDB = asyncRedis.createClient();
module.exports = {
   setObj: async (id, obj) => await RedisDB.set(id.toString(), JSON.stringify(obj)),
   getObj: async (id) => JSON.parse(await RedisDB.get(id.toString())),
   delObj: async (id) => await RedisDB.del(id.toString())
}