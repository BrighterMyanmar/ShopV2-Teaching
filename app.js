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
let subcatRouter = require('./routes/subcat');
let chidcatRouter = require('./routes/childcat');
let tagRouter = require('./routes/tag');
let permitRouter = require('./routes/permit');
let roleRouter = require('./routes/role');

app.use('/cats', catRouter);
app.use('/subcats', subcatRouter);
app.use('/childcats', chidcatRouter);
app.use('/tags', tagRouter);
app.use('/permits', permitRouter);
app.use('/roles', roleRouter);

app.use((err, req, res, next) => {
   err.status = err.status || 303;
   res.status(err.status).json({ con: false, "msg": err.message });
});

app.use((req, res) => {
   res.json({ con: false, msg: "No route Buddy!" });
});

app.listen(process.env.PORT, () => console.log(`Server is running at port ${process.env.PORT}`));

