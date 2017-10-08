module.exports = {
    getProjects: (req,res,next) => {
        const db = req.app.get('db');
        
        db.get_projects()
            .then(projects => res.status(200).json(projects))
            .catch( () => res.status(500).json())
    },

    createProject: (req,res,next) => {
        const db = req.app.get('db');
        const {company, units, description, type, budget, last_name, first_name, long_desc} = req.body;

        db.create_project([company, units, description, type, budget, last_name, first_name, long_desc]).then(
            () => res.status(200).json() )
            .catch( ()=> res.status(500).json() )
    },

}