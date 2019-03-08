const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const cors = require('cors');

const app = express();

// require socket.io and jwt
const http = require('http').Server(app);
const io = require('socket.io')(http);
const users = require('./routes/api/users');

// app.use(
// //   cors({
// //     allowedHeaders: ['sessionId', 'Content-Type'],
// //     exposedHeaders: ['sessionId'],
// //     origin: '*',
// //     methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
// //     preflightContinue: false
// //   })
// // );

app.use(cors());

// app.use((req, res, next) => {
//   res.setHeader('Access-Control-Allow-Origin', 'http://localhost:2033');
//   res.setHeader(
//     'Access-Control-Allow-Methods',
//     'GET, POST, OPTIONS, PUT, PATCH, DELETE'
//   );
//   res.setHeader(
//     'Access-Control-Allow-Headers',
//     'X-Requested-With,content-type'
//   );
//   res.setHeader('Access-Control-Allow-Credentials', true);
//   next();
// });

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// DB Config
const db = require('./config/keys').mongoURI;

// Connect to MongoDB
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// Passport middleware
app.use(passport.initialize());

// Passport Config
require('./config/passport')(passport);

// Use Routes
app.use('/api/users', users);

const port = process.env.PORT || 5000;

// include socket.io functionality

const { jwtAuthSocket } = require('./socket/socket');
const { socketConnect } = require('./socket/socket');

// using socket middleware
io.use(jwtAuthSocket(true));

socketConnect(io);

// app.listen(port, () => console.log(`Server running on port ${port}`));
http.listen(port, () => console.log(`Server running on port ${port}`));

module.exports = io;
