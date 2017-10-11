const express = require('express');
const massive = require('massive');
const bodyParser = require('body-parser');
const cors = require('cors');

const {dbUser, database, dbpass} = require('../config');
const connectionString = `postgres://${dbUser}:${dbpass}@localhost/${database}`


const port = 3000;
const app = express();

app.use(bodyParser.json());
// var corsOptions = {
//     origin: 'http://localhost: 3000'
// };
app.use(cors());
app.use(express.static(`${__dirname}/../public`));



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

app.post('/api/projects/createProject', projectCtrl.createProject);
app.get('/api/projects/singleProject/:id', projectCtrl.singleProject);
app.post('/api/projects', projectCtrl.deleteProject);






app.listen(port, () => {
    console.log(`Listening on port: ${port}`)
})