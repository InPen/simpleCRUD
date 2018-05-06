const express = require('express');
const app = express();

// create a server where browsers can connect to.
// We can do so with the help of a listen method
// provided by Express:
app.listen(3000, function() {
  console.log('listening on 3000')
})
console.log('May the Node odds be ever in thy favor')
