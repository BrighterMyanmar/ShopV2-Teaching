require('dotenv').config();
const express = require('express'),
   app = express(),
   bodyParser = require('body-parser'),
   mongoose = require('mongoose'),
   path = require('path'),
   fileUpload = require('express-fileupload');

app.use(bodyParser.json());
app.use(fileUpload());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

mongoose.connect(`mongodb://127.0.0.1:27017/${process.env.DB_NAME}`);


let catRouter = require('./routes/category');

app.use('/cats', catRouter);

app.use((err, req, res, next) => {
   err.status = err.status || 303;
   res.status(err.status).json({ con: false, "msg": err.message });
});

app.use((req, res) => {
   res.json({ con: false, msg: "No route Buddy!" });
});

app.listen(process.env.PORT, () => console.log(`Server is running at port ${process.env.PORT}`));

