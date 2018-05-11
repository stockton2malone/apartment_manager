const imageManager = require('../image_manager/image_manager');

module.exports = {
    getUser: (req, res, next) => {
        let dbInstance = req.app.get('db');
        let { id } = req.params;

        dbInstance.readUser([id])
        .then(user => {
            if (user.length) res.status(200).send(user[0]);
            else res.status(404).send(null)
        })
        .catch(e => res.status(500).send(e))
    }
}