const cloudinary = require('cloudinary');
const config = require('../config');

cloudinary.config({
    cloud_name: config.image_manager_cloud_name,
    api_key: config.image_manager_api_key,
    api_secret: config.image_manager_api_secret
});

const upload = (note, file, transformations, res) => {

    // note -- New note object from db
    // file -- local path || url || io stream || file data
    // transformation -- {
    //     public_id: 'sample_id', 
    // }

    transformations = transformations || {};

    cloudinary.uploader.upload(file, function (result) {
        if (res) res.status(201).send({ note: note, attachment: result });
        else console.log(result)
    }, transformations);
}

const getImage = (id, transformations, res) => {
    transformations = transformations || {};
    console.log(id, transformations)
    let src = cloudinary.image(id, transformations);
    if (res) res.send(src);
    else console.log(src);
}

const getVideo = (id, transformations, res) => {
    transformations = transformations || {};
    let src = cloudinary.image(id, transformations);
    if (res) res.send(src);
    else console.log(src);
}

module.exports = {
    upload,
    getImage,
    getVideo
}