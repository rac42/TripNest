const cloudinary = require("../config/cloudinary")
const multer = require('multer')

const storage = multer.memoryStorage();
const upload = multer({storage});

exports.uploadMultipleImagesAndGetUrls = async (req, res) => {
    try {
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ message: "No files uploaded" });
        }

        // Upload each image to Cloudinary and store the URL
        const uploadPromises = req.files.map((file) =>
            new Promise((resolve, reject) => {
                cloudinary.uploader.upload_stream({ folder: 'flights' }, (error, result) => {
                    if (error) reject(error);
                    else resolve(result.secure_url);
                }).end(file.buffer);
            })
        );

        // Wait for all uploads to complete
        const imageUrls = await Promise.all(uploadPromises);

        res.status(200).json({ imageUrls });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Middleware to handle multiple file uploads
exports.uploadMiddleware = upload.array('images');  // Expect 'images' field in the request for multiple files