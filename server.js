const express = require('express')
const bodyParser= require('body-parser')
const app = express()

// 'urlencoded' method tells body-parser to extract data from the <form> element
// and add them to the body property in the request object.
app.use(bodyParser.urlencoded({extended: true}))

// Install mongodb and require it on server

const MongoClient = require('mongodb').MongoClient
// variable to allow us to use the database when we handle requests from the browser
var db

MongoClient.connect('mongodb://johann:johann@ds217360.mlab.com:17360/simplecrud', (err, client) => {
  if (err) return console.log(err, 'you fucked up')
  db = client.db('simplecrud') // whatever your database name is
  app.listen(3000, () => {
    console.log('listening on 3000')
  })
})

// create a server where browsers can connect to.
// We can do so with the help of a listen method
// provided by Express:
// app.listen(3000, function() {
//   console.log('listening on 3000')
// })
// port above becomes obsolete after 'mongo.connect' has been installed

// *Routes*:

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
  db.collection('quotes').save(req.body, (err, result) => {
    if (err) return console.log(err)

    console.log('saved to database')
    res.redirect('/')
  })
})

// READ || GET

app.get('/', (req, res) => {
  var cursor = db.collection('quotes').find()
  console.log(cursor)
})
