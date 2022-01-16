require('dotenv').config();
const express = require('express'),
   app = express(),
   server = require('http').createServer(app),
   io = require('socket.io')(server),
   bodyParser = require('body-parser'),
   mongoose = require('mongoose'),
   path = require('path'),
   fileUpload = require('express-fileupload'),
   jwt = require('jsonwebtoken');

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
let deliveryRouter = require('./routes/delivery');
let warrantyRouter = require('./routes/warranty');
let productRouter = require('./routes/product');
let apiRouter = require('./routes/api');
let userRouter = require('./routes/user');

let { validateToken, validateRole } = require('./utils/validator');
const { required } = require('joi');

app.use('/cats', [validateToken(), validateRole("Owner"), catRouter]);
app.use('/subcats', [validateToken(), validateRole("Owner"), subcatRouter]);
app.use('/childcats', [validateToken(), validateRole("Owner"), chidcatRouter]);
app.use('/tags', [validateToken(), validateRole("Owner"), tagRouter]);
app.use('/permits', [validateToken(), validateRole("Owner"), permitRouter]);
app.use('/roles', [validateToken(), validateRole("Owner"), roleRouter]);
app.use('/deliveries', [validateToken(), validateRole("Owner"), deliveryRouter]);
app.use('/warranties', [validateToken(), validateRole("Owner"), warrantyRouter]);
app.use('/products', [validateToken(), validateRole("Owner"), productRouter]);
app.use('/users', [validateToken(), validateRole("Owner"), userRouter]);

app.use('/api', apiRouter);

app.use((err, req, res, next) => {
   err.status = err.status || 303;
   res.status(err.status).json({ con: false, "msg": err.message });
});

app.use((req, res) => {
   res.json({ con: false, msg: "No route Buddy!" });
});

io.of('/chat').use(async (socket, next) => {
   let token = socket.handshake.query.token;
   if (token) {
      let user = "";
      try {
         user = jwt.verify(token, process.env.SECRET_KEY);
         socket.userData = user;
      } catch (error) {
         next(new Error('Token Validation Error'));
      } finally {
         next();
      }
   }
}).on("connection", socket => {
   require('./utils/chat').initialize(io, socket);
})

server.listen(process.env.PORT, () => console.log(`Server is running at port ${process.env.PORT}`));

