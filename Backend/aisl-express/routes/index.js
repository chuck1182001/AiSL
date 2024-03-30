var express = require('express');
var router = express.Router();
var multer = require('multer');

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// router.post('/', function(req, res, next) {
//   const spawn = require("child_process").spawn;
//   const pythonProcess = spawn('python',["./test.py"]);
//   pythonProcess.stdout.on('data', (data) => {
//     console.log(data.toString());
//   });
//   pythonProcess.on('error', (err) => {
//     console.log(err);
//   });
//   const test = req.params.image;
//   console.log(req.params);
//   express.request.on('body', (data) => {
//     console.log(data);
//   });
//   res.send('Hello World!');
// });

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // specify the upload directory
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // generate unique filename
  }
});

const upload = multer({ storage: storage });

// Define route to handle POST request with image upload
router.post('/', upload.single('image'), (req, res) => {
  const spawn = require("child_process").spawn;
  const pythonProcess = spawn('python',["./test.py"]);
  pythonProcess.stdout.on('data', (data) => {
    console.log(data.toString());
  });
  console.log("hello");
  pythonProcess.on('error', (err) => {
    console.log(err);
  });

  // req.file contains information about the uploaded file

  if (!req.file) {
    return res.status(400).send('No files were uploaded.');
  }
  // You can access the file details like req.file.path, req.file.originalname, etc.
  // Here you can save the file path to a database or perform further processing

  res.send('File uploaded successfully.');
});

module.exports = router;