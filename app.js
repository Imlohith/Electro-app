const express = require('express')
const bodyParser = require('body-parser')

const app = express();

//use middleware 
app.use(bodyParser.json())

//basic routes 
app.get('/', (req, res, next) => {
    res.send('Welcome to basic home page')
})

app.listen(4000, () => {
  console.log(`App listening on port 4000`)
})