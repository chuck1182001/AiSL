var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/', function(req, res, next) {

  // const spawn = require("child_process").spawn;
  // const pythonProcess = spawn('python',["./test.py"]);
  // pythonProcess.stdout.on('data', (data) => {
  //   console.log(data.toString());
  // });
  // pythonProcess.on('error', (err) => {
  //   console.log(err);
  // });
  const test = req.params.image;
  console.log(test);
  res.send('Hello World!');
});

module.exports = router;