require('dotenv').config();
const express = require('express'),
   app = express(),
   bodyParser = require('body-parser'),
   mongoose = require('mongoose'),
   path = require('path');

app.use(bodyParser.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


// connect to database
mongoose.connect(`mongodb://127.0.0.1:27017/${process.env.DB_NAME}`);
// Category Schema Creation [ name , image ] ( _id  : autoGenerate )
// _id:"dfasdf",name:"Electronic","image":"www.asdf"
// _id:"dfasdf",name:"Clothing","image":"www.asdf"
// _id:"dfasdf",name:"Toys","image":"www.asdf"
// _id:"dfasdf",name:"Electronic","image":"www.asdf"

const { Schema } = mongoose;
const CategorySchema = new Schema({
   name: { type: String, unique: true, require: true },
   image: { type: String, require: true },
   created: { type: Date, default: Date.now }
});
const Category = mongoose.model('category', CategorySchema);


// CRUD for Category

app.get('/cats', async (req, res) => {
   let result = await Category.find();
   res.json({ con: true, msg: "All Categories", result });
});

app.get('/cats/:id', async (req, res) => {
   let id = req.params.id;
   let result = await Category.findById(id);
   res.json({ con: true, msg: "Single Category", result });
});

app.patch('/cats/:id', async (req, res) => {
   let id = req.params.id;
   let dbCat = await Category.findById(id);
   if (dbCat) {
      await Category.findByIdAndUpdate(dbCat.id, req.body);
      res.json({ con: true, msg: "Category Updated" });
   } else {
      res.json({ con: false, msg: "No Category with that id" });
   }
});

app.post('/cats', async (req, res) => {
   let cat = req.body;
   let saveCat = new Category(cat);
   let result = await saveCat.save();
   res.json({ con: true, msg: "Category Saved", result });
});

app.delete('/cats/:id', async (req, res) => {
   let id = req.params.id;
   let dbCat = await Category.findById(id);
   if (dbCat) {
      await Category.findByIdAndDelete(id);
      res.json({ con: true, msg: "Category Deleted" });
   } else {
      res.json({ con: false, msg: `No Category with that id of ${id}` });
   }
})


app.use((req, res) => {
   res.json({ con: false, msg: "No route Buddy!" });
});

app.listen(process.env.PORT, () => console.log(`Server is running at port ${process.env.PORT}`));

