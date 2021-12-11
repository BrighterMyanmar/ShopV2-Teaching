
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());

let users = [
   { id: 1, name: "Moung Moung", age: 20 },
   { id: 2, name: "Aung Aung", age: 21 },
   { id: 3, name: "Tun Tun", age: 22 },
   { id: 4, name: "Su Su", age: 23 },
   { id: 5, name: "Mya Mya", age: 24 },
];

app.get('/users', (req, res) => {
   res.json({ msg: "All User", users });
});
app.get('/user/:id', (req, res) => {
   let user = users.find(usr => usr.id == req.params.id);
   res.json({ msg: "Single User", user })
})
app.post('/user', (req, res) => {
   users.push(req.body);
   res.json({ msg: "New User Added!" });
});
app.put('/user/:id', (req, res) => {
   let userId = req.params.id;
   let user = users.find(usr => usr.id == userId);
   user.id = req.body.id;
   user.name = req.body.name;
   user.age = req.body.age;
   res.json({ msg: "User Updated!" });
});
app.patch('/user/:id', (req, res) => {
   let user = users.find(usr => usr.id == req.params.id);
   user.name = req.body.name;
   res.json({ msg: "User Patched!" });
});
app.delete('/user/:id', (req, res) => {
   users = users.filter(usr => usr.id != req.params.id);
   res.json({ msg: "User Deleted!" });
});

app.use((req, res) => { // Fallback Route
   res.json({ con: false, msg: "No route Buddy!" });
});

app.listen(3000, () => console.log("Server is Running on Port 3000"));

