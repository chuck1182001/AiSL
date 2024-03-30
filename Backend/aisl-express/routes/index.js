const express = require('express')
const app = express()
const port = 3001

app.get('/', (req, res) => {
  // console.log(req.socket.localPort);
  const spawn = require("child_process").spawn;
  const pythonProcess = spawn('python',["./test.py"]);
  pythonProcess.stdout.on('data', (data) => {
    console.log(data);
  });
  console.log(req.socket.remotePort);
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})