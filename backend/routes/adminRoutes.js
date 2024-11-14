const express = require("express");
const {resolveQuery} = require("../controllers/queryController");
const authMiddleware = require("../middlewares/authMiddleware");
const {addFlight} = require('../controllers/flightController');
const {uploadMiddleware, uploadMultipleImagesAndGetUrls} = require('../controllers/fileUpload')

const router = express.Router();

router.put('/resolveQuery/:queryId', authMiddleware, resolveQuery);
router.post('/addFlight', addFlight);
router.post('/upload-images', uploadMiddleware, uploadMultipleImagesAndGetUrls)

module.exports = router;