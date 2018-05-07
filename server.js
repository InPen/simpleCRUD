const express = require('express');
const app = express();

// create a server where browsers can connect to.
// We can do so with the help of a listen method
// provided by Express:
app.listen(3000, function() {
  console.log('listening on 3000')
})
// console.log('May the Node odds be ever in thy favor')

// Routes:

// GET || READ

// Note: request and response are usually written as
// req and res respectively.
// app.get('/', function (request, response) {
//   // do something here
//   res.send('Hello World')
// })
// ES6 syntax below:
app.get('/', (req, res) => {
  // res.send('Hi Mom!')
  res.sendFile(__dirname + '/index.html')
  // Note: __dirname is directory that contains the JavaScript
  // source code.
})

// CREATE || POST

app.post('/quotes', (req, res) => {
  console.log('Hellooooooooooooooooo!')
})
