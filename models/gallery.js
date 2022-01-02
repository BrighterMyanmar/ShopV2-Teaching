const mongoose = require('mongoose');
const { Schema } = mongoose;

const GallerySchema = new Schema({
   name: { type: String, require: true },
   link: { type: String, require: true },
});
const Gallery = mongoose.model('gallary', GallerySchema);

module.exports = Gallery;
