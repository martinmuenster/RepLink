// index.js
const fetchUrl = require("fetch").fetchUrl;
const path = require('path')  
const express = require('express')  
const exphbs = require('express-handlebars')
const hbs = require('handlebars')
const port = 3000
const app = express()

app.engine('.hbs', exphbs({  
  defaultLayout: 'main',
  extname: '.hbs',
  layoutsDir: path.join(__dirname, 'views/layouts')
}))
app.set('view engine', '.hbs')  
app.set('views', path.join(__dirname, 'views'))  
app.get('/', (request, response) => {
  response.render('home', {
    name: 'John'
  })
})
app.get('/zipcode/:zipcode', (request, response) => {
  fetchUrl("http://congress.api.sunlightfoundation.com/legislators/locate?zip=" + request.params.zipcode, function(error, meta, body){
    response.render('results', {
       congressData: JSON.parse(body).results
    })
  });	
})
app.listen(port, (err) => {  
  if (err) {
    return console.log('something bad happened', err)
  }

  console.log(`server is listening on ${port}`)
})
app.use(express.static('public'))
hbs.registerHelper("isRep", function(title, options) {
    return title === 'Rep' ? options.fn(this) : options.inverse(this);
});