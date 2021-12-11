require('dotenv').config();
const express = require('express'),
   app = express(),
   bodyParser = require('body-parser'),
   path = require('path');

app.use(bodyParser.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use((req, res) => { // Fallback Route
   res.json({ con: false, msg: "No route Buddy!" });
});

app.listen(process.env.PORT, () => console.log(`Server is running at port ${process.env.PORT}`));

