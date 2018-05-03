const imageManager = require('./image_manager/image_manager');

module.exports = {
    getImage: (req, res, next) => {

        let { id, height, width } = req.query;

        // sample query
        // id=1234&height=1000&width=1000

        // in production, id will need to come from note in db

        let transformations = {crop: "fill"}
        if (height) transformations.height = height;
        if (width) transformations.width = width;

        imageManager.getImage(id, transformations, res);
    },
    getVideo: (req, res, next) => {

        let { id, height, width } = req.query;

        // sample query
        // id=1234&height=1000&width=1000

        // in production, id will need to come from note in db

        let transformations = {crop: "fill"}
        if (height) transformations.height = height;
        if (width) transformations.width = width;

        imageManager.getVideo(id, transformations, res);
    },
    getTicket: (req, res, next) => {
        let dbInstance = req.app.get('db');

        // read from DB
    },
    createTicket: (req, res, next) => {
        let dbInstance = req.app.get('db');

        // read from DB
    },
    updateTicket: (req, res, next) => {
        let dbInstance = req.app.get('db');

        // read from DB
    },
    deleteTicket: (req, res, next) => {
        let dbInstance = req.app.get('db');

        // read from DB
    },
    getOwnerTickets: (req, res, next) => {
        let dbInstance = req.app.get('db');

        // read from DB
    },
    getMaintenanceTickets: (req, res, next) => {
        let dbInstance = req.app.get('db');

        // read from DB
    },
    getTenantTickets: (req, res, next) => {
        let dbInstance = req.app.get('db');

        // read from DB
    },
    getNotes: (req, res, next) => {
        let dbInstance = req.app.get('db');

        // read from DB
    },
    createNote: (req, res, next) => {
        let dbInstance = req.app.get('db');

        let { name, file } = req.body;

        let transformations = {
            public_id: name // WHEN ALL IS WORKING --> save a new note in database and use the attachment id for public_id instead of "name"
        }

        imageManager.upload(file, transformations, res);

        // read from DB
    },
    updateNote: (req, res, next) => {
        let dbInstance = req.app.get('db');

        // read from DB
    },
    deleteNote: (req, res, next) => {
        let dbInstance = req.app.get('db');

        // read from DB
    }
}