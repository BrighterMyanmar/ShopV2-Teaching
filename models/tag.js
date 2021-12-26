const mongoose = require('mongoose');
const { Schema } = mongoose;
const TagSchema = new Schema({
   name: { type: String, unique: true, require: true },
   image: { type: String, require: true },
   created: { type: Date, default: Date.now }
});
const Tag = mongoose.model('tag', TagSchema);

module.exports = Tag;
