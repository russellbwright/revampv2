angular.module('myApp').service('projectService', function($http, $q){

    this.projects = () => $http.get('/api/projects')


    this.addProject = function(project){
        // console.log(project)
        return $http.post('/api/projects/createProject', [project.last, project.first, project.company, project.units, project.shortDesc, project.type])
    }, 

    this.deleteProject = function(project){
        // console.log(project)
        return $http.post('/api/projects', [project.projectid])
    },

    this.singleProject = function(id){
        // console.log(id)
        return $http.get('/api/projects/singleProject/' + id)
     },

     this.uploadImage = (file) => {
        const storageRef = firebase.storage().ref();
        const uploadTask = storageRef.child('images/' + file.name).put(file);
        uploadTask.on('state_changed', (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
            switch (snapshot.state) {
                case firebase.storage.TaskState.RUNNING: // or 'running'
                    console.log('Upload is running');
                        break;
                }
        }, function(error) {
    
        }, function() {
            let downloadURL = [uploadTask.snapshot.downloadURL];
            console.log(downloadURL)
            return $http.post(`/api/projects/image`, downloadURL);
            });
    
    },

    this.images = () => $http.get('/api/projects/images'),


    this.getUsers = () => $http.get('/api/users').then(response => response.data);







    //************************************************************ */
        //AUTH*****************

        let currentUser;
        const that = this;
        this.currentUser = { username: '', type: '' };
        
        this.login = (username, password) =>
          $http.post('/auth/login', { username, password }).then((response) => {
              console.log(response);
            currentUser = response.data.passport.user;
            that.currentUser.type = response.data.passport.user.type;
            that.currentUser.username = response.data.passport.user.username;
          });
        this.register = (username, password) => $http.post('/auth/register', { username, password });
        this.logout = () => $http.get('/auth/logout');
        this.getCurrentUser = function () {
          const defer = $q.defer();
          if (!currentUser) {
            $http
              .get('/authcheck')
              .then((response) => {
                currentUser = response.data;
      
                that.currentUser.type = response.data.type;
                that.currentUser.username = response.data.username;
                console.log('that', that.currentUser);
      
                defer.resolve(currentUser);
              })
              .catch(err => defer.resolve());
          } else {
            defer.resolve(currentUser);
          }
          return defer.promise;
        };    

        ///****************************** */

        let currentTitle = 'Welcome';
        this.getTitle = function () {
          return currentTitle;
        };
        this.setTitle = (newTitle) => {
          currentTitle = newTitle;
        };
    

})