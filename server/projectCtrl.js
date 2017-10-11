module.exports = {
    getProjects: (req,res,next) => {
        const db = req.app.get('db');
        
        db.get_projects()
            .then(projects => res.status(200).json(projects))
            .catch( () => res.status(500).json())
    },


    createProject: (req,res,next) => {
        const db = req.app.get('db');
        // const {company, units, description, type, budget, last_name, first_name, long_desc} = req.body;
        console.log(req.body)
        db.create_project(req.body).then(
            (response) => 
            res.status(200).json(response) )
            .catch( ()=> res.status(500).json() )
    },

    
    deleteProject: (req,res,next) => {
        const db = req.app.get('db');
        console.log(req.body)
        db.delete_project(req.body).then(
            () => 
            res.status(200).json() )
            .catch( () => res.status(500).json() )
        
    },

    
    singleProject: (req,res,next) => {
        const db = req.app.get('db');
       console.log([req.params.id])
        db.single_project(req.params.id).then(result => 
            res.status(200).json(result))
            
    },

    // singleProject: (req,res,next) => {
    //     const db = req.app.get('db');
        
    //     db.single_project(req.body).then(
    //         (response)  => 
    //         res.status(200).json(response) 
    //          ).catch( () => res.status(500).json())

    //            }

}