const express = require('express');
const massive = require('massive');
const bodyParser = require('body-parser');
const cors = require('cors');
const session = require('express-session');
const LocalStrategy = require('passport-local');
const bcrypt = require('bcryptjs');
const flash = require('connect-flash');

const passport = require('passport');


const { secret } = require('../config').session;
const {dbUser, database, dbpass} = require('../config').db;
const connectionString = `postgres://${dbUser}:${dbpass}@localhost/${database}`


const port = 3000;
const app = express();


//middlewares
app.use(bodyParser.json());
// var corsOptions = {
//     origin: 'http://localhost: 3000'
// };

app.use(cors());
app.use(express.static(`${__dirname}/../public`));








app.use(session({
    secret,
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

  

//   passport.use(new LocalStrategy(function (username, password, done) {
//     const db = app.get('db')
    
//     db.run('select * from users where username = $1', [username]).then(user=> {
//     if (!user) {
//       return done(null, false);
//     }
    
//     const authenticated = bcrypt.compareSync(password, user.password);

//     if (!authenticated) {
//       return done(null, false);
//     }
//     return done(null, user);
    
//   });
// }));





  //************************************************* */
  //******* AUTH ENDPOINTS */



  
//   app.post('/auth/register', (req, res) => {
//     const db = req.app.get('db');
//     console.log(req.body)
//     bcrypt.hash(req.body.password, 10).then((hash) => {
//       db
//         .add_user([req.body.username, hash])
//         .then(() => passport.authenticate('local'))
//         .then(() => res.send(req.session));
//     });
//   });



  
//   app.get('/auth/logout', (req, res) => {
//     req.logout();
//     res.json('ok');
//   });
  









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









//******* DB Connection *******//

const massiveConnection = massive(connectionString)
.then(db => {
    app.set('db', db);
})
.catch(err => {
    console.log(err);
});


const usersCtrl = require('./usersCtrl');
const projectCtrl = require('./projectCtrl');


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

// app.get('/api/both/getBoth/:id', projectCtrl.getBoth)


app.listen(port, () => {
    console.log(`Listening on port: ${port}`)
})