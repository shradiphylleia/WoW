const express = require('express')
const app = express()

const PORT=process.env.PORT|| 3000;

//firt route
app.get('/', function (req, res) {
  res.send('Hi there');
})

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });