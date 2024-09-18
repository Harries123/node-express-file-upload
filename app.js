const express = require('express');
const multer = require('multer');
const path = require('path');

// Initialize Express app
const app = express();

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // Save uploaded files directly to the 'public' directory
        cb(null, path.join(__dirname, 'public'));
    },
    filename: (req, file, cb) => {
        // Save with a unique filename based on the current timestamp
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Define POST route for file upload
app.post('/upload', upload.single('profile'), (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }
    console.log(req.file); // Log file details
    res.send('File uploaded successfully.');
});

// Start server
app.listen(4000, () => {
    console.log('Server up and running on port 4000');
});
