const express = require('express');
const massive = require('massive');
const bodyParser = require('body-parser');
const cors = require('cors');
const session = require('express-session');

// const passport = require('./passport');


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
// secret: config.session.secret;

// app.use(session({
//     secret,
//     saveUninitialized: true,
//     resave: true
//   }));


// // setting up passport
// app.use(passport.initialize());
// app.use(passport.session());





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