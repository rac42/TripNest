const cloudinary = require("cloudinary").v2;

cloudinary.config({
    cloud_name: 'ddcowusnc',
    api_key:'498557317963771',
    api_secret:'P9qINHa7sLkMfkyEYTMaeVXj7gY'
});

module.exports = cloudinary;