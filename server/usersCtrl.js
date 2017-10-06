module.exports = {
    getUsers: (req,res,next) => {
        const db = req.app.get('db');
        
        db.get_users()
            .then(users => res.status(200).json(users))
            .catch( () => res.status(500).json())
    }
}