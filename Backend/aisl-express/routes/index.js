var express = require('express');
var router = express.Router();
var multer = require('multer');
const cors = require('cors')
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.use(bodyParser.json({ limit: '10mb', extended: true }));
router.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));

router.use(cors())

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // specify the upload directory
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // generate unique filename
  }
});

const upload = multer({ storage: storage });

module.exports = router;

router.post('/', function (req, res) {
    if (!req.body.imageSrc) {
        return res.status(400).send('No image data found.');
    }
    // console.log(req.body)
    const imageData = req.body.imageSrc.replace(/^data:image\/jpeg;base64,/, "");
    const filePath = path.join(__dirname, 'uploads', 'image.jpg');
    fs.writeFile(filePath, imageData, 'base64', (err) => {
      if (err) {
        console.error('Error saving image:', err);
        res.status(500).send('Error saving image');
      } else {
        console.log('Image saved successfully');
      }
    });
    const spawn = require("child_process").spawn;
    const pythonProcess = spawn('python',["/root/AiSL/Backend/aisl-express/routes/test.py"]);
    pythonProcess.stdout.on('data', (data) => {
      console.log(data.toString());
      res.send(data.toString());
    });
    // console.log("hello");
    pythonProcess.on('error', (err) => {
      console.log(err);
    });
    // res.send("End of Message");
    // res.status(403);
})