var express = require('express');
var router = express.Router();
var multer = require('multer');
const cors = require('cors')
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');

module.exports = router;

router.use(bodyParser.text());

router.post('/', function (req, res) {
    // Generate image with python from word
    // return image
    const letters = req.body;
    console.log(letters);
    // const letters = "hello";
    const spawn = require("child_process").spawn;
    const pythonProcess = spawn('python',["/root/AiSL/Backend/aisl-express/routes/generator.py"]);
    pythonProcess.stdout.on('data', (data) => {
      res.send(data.toString());
    });
    // console.log("hello");
    pythonProcess.on('error', (err) => {
      console.log(err);
    });
    res.sendFile('/root/AiSL/Backend/aisl-express/routes/generated/generatedGif.gif');
})