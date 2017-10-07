module.exports = {
    getProjects: (req,res,next) => {
        const db = req.app.get('db');
        
        db.get_projects()
            .then(projects => res.status(200).json(projects))
            .catch( () => res.status(500).json())
    }
}