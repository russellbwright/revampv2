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
       
        db.single_project(+req.params.id).then(result => 
            res.status(200).json(result)).catch( () => res.status(500).json())
            
    },

    addimage: (req,res,next) => {
        const db = req.app.get('db');
        console.log(req.body)
        db.add_image(req.body).then(response => 
            res.status(200).json(response)).catch( () => res.status(500).json())
        
    },

    getImages: (req,res,next) => {
        const db = req.app.get('db');
        console.log(req.body)
        db.get_images(req.body)
            .then(images => res.status(200).json(images))
            .catch( () => res.status(500).json())
    },

    myProjects: (req,res,next) => {
        const db = req.app.get('db');

        db.my_projects(req.body).then(
            (response) => res.status(200).json(response) )
            .catch( ()=> res.status(500).json() )
        
    },

    addBid: (req,res,next) => {
        const db = req.app.get('db');
        console.log(req.body)
        db.add_bid(req.body).then( 
            () => 
            res.status(200).json() )
            .catch( () => res.status(500).json() )
    },

    myBids: (req,res,next) => {
        const db = req.app.get('db');

        db.my_bids(req.body).then(
            (response) => res.status(200).json(response) )
            .catch( () => res.status(500).json() )
        
    },

    singleBid: (req,res,next) => {
        const db = req.app.get('db');
       console.log(req.params.id)
        db.single_bid(+req.params.id).then(result => 
            res.status(200).json(result)).catch( () => res.status(500).json())
            
    },

    deleteBid: (req,res,next) => {
        const db = req.app.get('db');

        db.delete_bid(req.body).then(
            () => 
            res.status(200).json() )
            .catch( () => res.status(500).json() )
    },

    mySingleProject: (req,res,next) => {
        const db = req.app.get('db');
       console.log(+req.params.id)
        db.my_single_project(+req.params.id).then(result => 
            res.status(200).json(result)).catch( () => res.status(500).json())
            
    },

    myProjectBids: (req,res,next) => {
        const db = req.app.get('db');

        db.my_project_bids(+req.params.id).then(result => res.status(200).json(result))
        .catch( () => res.status(500).json())
    },

    deleteBids: (req,res,next) => {
        const db = req.app.get('db');

        db.delete_bids(req.body).then(
            () => 
            res.status(200).json() )
            .catch( () => res.status(500).json() )
    }

    // getBoth: (req,res,next) => {
    //     const db = req.app.get('db');

    //     db.get_both(+req.params.id).then(result => res.status(200).json(result))
    //     .catch( () => res.status(500).json())
    // }










    // singleProject: (req,res,next) => {
    //     const db = req.app.get('db');
        
    //     db.single_project(req.body).then(
    //         (response)  => 
    //         res.status(200).json(response) 
    //          ).catch( () => res.status(500).json())

    //            }

}