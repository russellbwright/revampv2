angular.module('myApp').service('projectService', function($http){

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

    this.images = () => $http.get('/api/projects/images')

})