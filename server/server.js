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











// *********** Trying to Add Login **************
// setting up express sessions



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
    done(null, { username: user.username, type: user.type, userid: user.id });
  });
  passport.deserializeUser((obj, done) => {
    done(null, obj);
  });

  passport.use(new LocalStrategy(function (username, password, done) {
    const db = app.get('db');
    db.users.findOne({ username }).then(function (user) {
      if (!user) {
        return done(null, false);
      }
      const authenticated = bcrypt.compareSync(password, user.password);
  
      if (!authenticated) {
        return done(null, false);
      }
      return done(null, user);
    });
  }));

  const isLoggedIn = function (req, res, next) {
    if (!req.user) {
      console.log('not logged in');
      return res.status(401).json('not logged in');
    }
    return next();
  };






  //************************************************* */
  //******* AUTH ENDPOINTS */
  app.get('/authcheck', isLoggedIn, (req, res) => res.json(req.user));
  
  app.post('/auth/login', passport.authenticate('local', { failureFlash: true }), (req, res) =>
    res.send(req.session));
  
  app.post('/auth/register', (req, res) => {
    const db = req.app.get('db');
    console.log(req.body)
    bcrypt.hash(req.body.password, 10).then((hash) => {
      db
        .add_user([req.body.username, hash])
        .then(() => passport.authenticate('local'))
        .then(() => res.send(req.session));
    });
  });
  
  app.get('/auth/logout', (req, res) => {
    req.logout();
    res.json('ok');
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




app.listen(port, () => {
    console.log(`Listening on port: ${port}`)
})