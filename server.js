const express = require('express')
const bodyParser= require('body-parser')
const app = express()

// template engine that renders our data on the DOM
app.set('view engine', 'ejs')

app.use(express.static('public'))

// use stylesheet
app.use(express.static(__dirname + '/styles'))


// 'urlencoded' method tells body-parser to extract data from the <form> element
// and add them to the body property in the request object.
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

// Install mongodb and require it on server
const MongoClient = require('mongodb').MongoClient
// variable to allow us to use the database when we handle requests from the browser
var db

MongoClient.connect('mongodb://johann:johann@ds217360.mlab.com:17360/simplecrud', (err, client) => {
  if (err) return console.log(err)
  db = client.db('simplecrud') // database name
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
  db.collection('quotes').find().toArray((err, result) => {
  // send HTML file populated with quotes here
    if (err) return console.log(err)
    // display data on the DOM as ejs
    res.render('index.ejs', {quotes: result})
  })
})


// CREATE || POST

app.post('/quotes', (req, res) => {
  db.collection('quotes').save(req.body, (err, result) => {
    if (err) return console.log(err)
    console.log('saved to database')
    res.redirect('/')
  })
})

// UPDATE || PUT

app.put('/quotes', (req, res) => {
  db.collection('quotes')
  .findOneAndUpdate({name: 'quotes'}, {
    $set: {
      name: req.body.name,
      quote: req.body.quote
    }
  }, {
    sort: {_id: -1},
    upsert: true
  }, (err, result) => {
    if (err) return res.send(err)
    res.send(result)
  })
})

// DELETE

app.delete('/quotes', (req, res) => {
  db.collection('quotes').findOneAndDelete({name: req.body.name}, (err, result) => {
    if (err) return res.send(500, err)
    res.send('bye quote')
  })
})
