const cloudinary = require('cloudinary');
const config = require('../config');

cloudinary.config({
    cloud_name: config.image_manager_cloud_name,
    api_key: config.image_manager_api_key,
    api_secret: config.image_manager_api_secret
});

const upload = (file, transformations, res) => {

    // file -- local path || url || io stream || file data
    // transformation -- {
    //     public_id: 'sample_id', 
    //     crop: 'limit',
    //     width: 2000,
    //     height: 2000,
    //     eager: [
    //       { width: 200, height: 200, crop: 'thumb', gravity: 'face',
    //         radius: 20, effect: 'sepia' },
    //       { width: 100, height: 150, crop: 'fit', format: 'png' }
    //     ],                                     
    //     tags: ['special', 'for_homepage']
    //   } 

    transformations = transformations || {};

    cloudinary.uploader.upload(file, function (result) {
        if (res) res.send(result);
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