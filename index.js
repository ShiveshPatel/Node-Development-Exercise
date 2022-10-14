const express = require('express');
const app = express();
require('./db');
const cors = require('cors')

const port = 3000;

//middleware
app.use(cors())
app.use(express.json())
//routes
app.use('/api/auth',require('./routes/auth'))
app.use('/api/lists',require('./routes/lists'))

app.listen(port, () => {
  console.log(`Node backend listening on http://localhost:${port}...`)
})
