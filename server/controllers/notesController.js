const imageManager = require('../image_manager/image_manager');

module.exports = {
    getImage: (req, res, next) => {

        let { id, height, width } = req.query;
        // sample query
        // id=1234&height=1000&width=1000

        let transformations = { crop: "fill" }
        if (height) transformations.height = height;
        if (width) transformations.width = width;

        imageManager.getImage(id, transformations, res);
    },
    getVideo: (req, res, next) => {

        let { id, height, width } = req.query;
        // sample query
        // id=1234&height=1000&width=1000

        let transformations = { crop: "fill" }
        if (height) transformations.height = height;
        if (width) transformations.width = width;

        imageManager.getVideo(id, transformations, res);
    },
    getNotes: (req, res, next) => {
        let dbInstance = req.app.get('db');
        let { id } = req.params;

        dbInstance.readNotesByTicketID([id])
            .then(notes => res.status(200).send(notes))
            .catch(err => res.status(500).send(err))
        // read from DB
    },
    createNote: (req, res, next) => {
        try{
        let dbInstance = req.app.get('db');
        let { description, file, id } = req.body;
        let createdBy;
        // where does createdBy id come from ????
        if (id) createdBy = id;
        else createdBy = req.session.passport.user.id;
        let ticketid = req.params.id;
        let createdTime = new Date();
        let notes_attachment_id = null;

        if (file) notes_attachment_id = Math.random().toString(36).substring(2, 13);

        console.log(description, ticketid, createdBy, createdTime, notes_attachment_id)
        dbInstance.createNote([description, ticketid, createdBy, createdTime, notes_attachment_id])
            .then(note => {
                note = note[0];
                if (file) {
                    let aID = notes_attachment_id ;
                    let transformations = { public_id: aID }
                    // image manager handles sending the response
                    imageManager.upload(note, file, transformations, res);
                }
                else {
                    res.status(201).send(note)
                }
            })
            .catch(err => res.status(500).send(err))
        }
        catch(e){res.send(e)}
    },
    updateNote: (req, res, next) => {
        let dbInstance = req.app.get('db');
        let { description } = req.body;
        let { note_id } = req.params;
        let now = new Date();
        dbInstance.updateNote([note_id, description, now])
            .then(note => { console.log(note); res.status(200).send(note) })
            .catch(err => res.status(500).send(err))
    },
    deleteNote: (req, res, next) => {
        let dbInstance = req.app.get('db');
        let { note_id } = req.params;
        dbInstance.deleteNote([note_id])
            .then(note => res.status(202).send(true))
            .catch(err => res.status(500).send(err))
    }
}