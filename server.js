const express = require('express');
const app = express();
const PORT = process.env.PORT;
const Data=require('./src/data/weather.json');
const cors=require('cors');

app.use(cors())

class Forecast {

  constructor(date,discription){

  this.date=date;
  this.discription=discription;
  }

  display=()=>{

    return {Discription:this.date,Date:this.discription}
  }

}





app.get('/', (req, res) => {
    res.send(  Data.map((value)=>value.city_name))
  })



app.get('/weather',(req,res)=>{

      

  Data.find((value)=>{

        if (value.city_name === req.query.city){

          let Weather=value.data[0].weather.description;
          let Date=value.data[0].valid_date;
          let forecast=new Forecast(Weather,Date);
          return res.send(forecast.display());
                  }
      })

  


})






  
  
app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`)
  })