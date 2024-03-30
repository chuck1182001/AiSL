const express = require('express')
const app = express()
const port = 3001

app.get('/', (req, res) => {
  // console.log(req.socket.localPort);
  console.log(req.socket.remotePort);
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})