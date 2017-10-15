angular.module('myApp').service('projectService', function($http, $q){

    this.projects = () => $http.get('/api/projects')


    this.addProject = function(project, userid){
        // console.log(project)
        
        return $http.post('/api/projects/createProject', [project.last, project.first, project.company, project.units, project.shortDesc, project.type, userid.userid])
    }, 

    this.deleteProject = function(project){
        // console.log(project)
        return $http.post('/api/projects', [project.projectid])
    },

    this.deleteBid = function(bids){
        return $http.post('/api/bids/deleteBid', [bids.bidid])
    }

    this.singleProject = function(id){
        // console.log(id)
        return $http.get('/api/projects/singleProject/' + id)
     },

     this.mySingleProject = function(id){
         
         return $http.get('/api/projects/mySingleProject/' + id)
     }

     this.myProjectBids = function(id){
         return $http.get('/api/bids/myProjectBids/' + id)
     }

     this.singleBid = function(id){
         return $http.get('/api/bids/singleBid/' + id)
     }

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

    this.images = () => $http.get('/api/projects/images');


    this.getUsers = () => $http.get('/api/users').then(response => response.data);


    this.myProjects = (userid) => $http.post('/api/projects/myProjects', [userid.userid])

    this.myBids = (userid) => $http.post('/api/bids/myBids', [userid.userid])

    this.addBid = function(bid, userid, proid){
       
       $http.post('/api/bids/newBid', [bid.company, bid.myBid, userid.userid, proid.projectid])
    }





//***********************      NEW AUTH           ****************************************** */

        this.createUser = (user) => {
          
          $http.post('/api/users/create', [user.username, user.password])
          .then(response=>response);
  }


  this.login = (user)=>{
    
    return $http.post('/api/login', user)
        .then((res)=>{
        if (!res.data.user){
            return 'Either Username or Password are wrong';
        }
          console.log(res.data.user)
          return res.data.user;                
        });
  }


  this.logOut = ()=>{
     return $http.get('/logout');
  }

  this.getUser = () => $http.get('/authcheck');





        ///****************************** */

        let currentTitle = 'Welcome';
        this.getTitle = function () {
          return currentTitle;
        };
        this.setTitle = (newTitle) => {
          currentTitle = newTitle;
        };
    

})