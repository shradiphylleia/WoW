const express = require('express')
const app = express()
const fs = require('fs')
const csv = require('csv-parser')
const path = require('path');


app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));


const PORT=process.env.PORT|| 3000;

let wonderData = [];

//to load CSV data 
function loadCSVData() {
    fs.createReadStream('processed.csv')
        .pipe(csv())
        .on('data', (data) => wonderData.push(data))
        .on('end', () => {
            console.log('CSV file successfully processed and loaded');
        });
}

loadCSVData();

//firt route
app.get('/', (req, res)=> {
  res.render('landingPage');
})

app.get('/wonders',(req,res)=>{
  res.render('wonders', {wonderData});
})


app.get('/wonders/:name', (req, res) => {
  const wonderName = req.params.name;  
  const wonder = wonderData.find(w => w.Name === wonderName); 
  //through each that is for w in wonderData(python semantic reference)

  if (wonder) {
      res.render('wonderName',{wonder:wonder});
  } else {
      res.status(404).send('Wonder of the world not found');
  }
});


app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });