
require("dotenv").config();

const express = require('express');
const massive = require('massive');
const bodyParser = require('body-parser');
const cors = require('cors');
const session = require('express-session');
const LocalStrategy = require('passport-local');
const bcrypt = require('bcryptjs');
const flash = require('connect-flash');
const stripe = require('stripe')('sk_test_Q32LfkAIIjGXizGrArwOkSTS');
// const { address } = require('./config');


const passport = require('passport');


// const { secret } = require('./configs').session;
// require("dotenv").session;
// const {dbUser, database, dbpass} = require('../config').db;
// const connectionString = `postgres://${dbUser}:${dbpass}@localhost/${database}`
// const connectionString = `${ address }`





// const port = process.env.port;
// const port = 3000;
const app = express();


//******* DB Connection *******//

// const massiveConnection = 
massive(process.env.HEROKU_POSTGRESQL_URL)
.then(db => {
    app.set('db', db);
})
.catch(err => {
    console.log(err);
});


const usersCtrl = require('./server/usersCtrl');
const projectCtrl = require('./server/projectCtrl');





//middlewares
app.use(bodyParser.json());
// var corsOptions = {
//     origin: 'http://localhost: 3000'
// };

app.use(cors());
app.use('/', express.static(__dirname + '/public'));








app.use(session({
    secret: 'mysecret',
    saveUninitialized: true,
    resave: true
  }));



// setting up passport
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());



passport.serializeUser((user, done) => {
    done(null, user);
  });
  passport.deserializeUser((obj, done) => {
    done(null, obj);
  });

  





//***************************        NEW AUTH              */

app.post('/api/users/create', (req, res, next)=> {
  const db = req.app.get('db');
 console.log(req.body)
  
  db.add_user(req.body).then((users)=>{
      res.send(users);
  });
});



app.post('/api/login', (req, res, next)=>{
  const username = req.body.username;
  const password = req.body.password;
  const db = req.app.get('db');
  db.get_users().then((users)=>{
      const person = users.find(cur=>cur.username == username);
      if (!person) {
          res.send({ validUser: false }).redirect('/login');
          console.log('no user');
      }
      else if (person.password != password) {
          res.send({ validUser: false });
          console.log('wrong password');
      }
      req.session.user = person;
      res.send({ validUser: true, user: req.session.user });
  })
});



app.get('/authcheck', (req, res) => {
  if (!req.session.user) return res.status(401).json({err: 'User Not Authenticated'});
  res.status(200).json(req.session.user);
});



app.get('/logout', (req, res, next)=>{
  req.session.user = null;
  res.redirect('/');
});











//*********************** */
// ENDPOINTS





app.get('/api/users', usersCtrl.getUsers);
app.get('/api/projects', projectCtrl.getProjects);
app.get('/api/projects/images', projectCtrl.getImages);
app.get('/api/projects/singleProject/:id', projectCtrl.singleProject);

app.post('/api/projects/createProject', projectCtrl.createProject);
app.post('/api/projects', projectCtrl.deleteProject);

app.post('/api/projects/image', projectCtrl.addimage );
app.post('/api/projects/myProjects', projectCtrl.myProjects);

app.post('/api/bids/newBid', projectCtrl.addBid);
app.post('/api/bids/myBids', projectCtrl.myBids);
app.get('/api/bids/singleBid/:id', projectCtrl.singleBid);
app.post('/api/bids/deleteBid', projectCtrl.deleteBid);

app.get('/api/projects/mySingleProject/:id', projectCtrl.mySingleProject);

app.get('/api/bids/myProjectBids/:id', projectCtrl.myProjectBids);

app.post('/api/bids/deleteBids', projectCtrl.deleteBids)

// app.get('/api/both/getBoth/:id', projectCtrl.getBoth)



// app.post('/charge', function(req, res) {
//   let token = req.body.stripeToken;
//   let chargeAmount = req.body.chargeAmount;
//   let charge = stripe.charges.create({
//     amount: chargeAmount,
//     currency: "usd",
//     source: token
//   }, function (err, charge){
//     if(err & err.type === "StripeCardError"){
//       console.log("Your card was declined");
//     }
//   });
//   console.log("Your payment was successful")
//   res.redirect('/myProfile');
// })




app.listen(process.env.PORT, () => {
    console.log("hey this is working")
})

