angular.module('myApp').service('projectService', function($http, $q){

    this.projects = () => $http.get('/api/projects')


    this.addProject = function(project, userid){
        // console.log(project)
        
        return $http.post('/api/projects/createProject', [project.last_name, project.first_name, project.email, project.com_name, project.proj_address, project.state, project.zip, project.main_proj, project.budget, project.type, project.units, project.short_desc, project.long_desc, project.proj_name, project.city, userid.userid])
        then(response => response.data)
    }, 

    this.deleteProject = function(project){
        // console.log(project)
        return $http.post('/api/projects', [project.projectid])
    },

    this.deleteBid = function(bids){
        return $http.post('/api/bids/deleteBid', [bids.bidid])
    }

    this.deleteBids = function(projid){
        console.log(projid)
        return $http.post('/api/bids/deleteBids', [projid])
    }

    this.singleProject = function(id){
        // console.log(id)
        return $http.get('/api/projects/singleProject/' + id)
     },

     this.mySingleProject = function(id){
            console.log(id)
         return $http.get('/api/projects/mySingleProject/' + id)
     }

    //  this.getBoth = function(id){
    //      return $http.get('/api/both/getBoth/' + id)
    //  }

     this.myProjectBids = function(id){
         return $http.get('/api/bids/myProjectBids/' + id)
     }

     this.singleBid = function(id){
         return $http.get('/api/bids/singleBid/' + id)
     }

     this.uploadImage = (file, id, userid) => {
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
            // let downloadURL = [uploadTask.snapshot.downloadURL];
            
            return $http.post(`/api/projects/image`, [uploadTask.snapshot.downloadURL, id.projectid, userid.userid]);
            });
    
    },

    this.images = () => $http.get('/api/projects/images');


    this.getUsers = () => $http.get('/api/users').then(response => response.data);


    this.myProjects = (userid) => $http.post('/api/projects/myProjects', [userid.userid])

    this.myBids = (userid) => $http.post('/api/bids/myBids', [userid.userid])

    this.addBid = function(bid, userid, proid){
       
       $http.post('/api/bids/newBid', [bid.company, bid.myBid, bid.email, bid.name, bid.bidname, userid.userid, proid.projectid])
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
            return false;
        }
          
          return res.data.user;                
        });
  }


  this.logOut = ()=>{
     return $http.get('/logout');
  }

  this.getUser = () => $http.get('/authcheck');





        ///****************************** */

        


      
    

})