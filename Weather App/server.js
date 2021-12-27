const express = require('express');
const https = require('https');
const {response} = require("express");
const  bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.urlencoded({extended:true}));
const port = 3000;

app.get('/', (req, res) => {
    res.sendFile(__dirname+"/index.html");
});

app.post('/', function (req, res){

    const query = req.body.cityName;
    const apikey = "2529f1adb0d24bbb562807a6beb6bc3d";
    const url = "api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apikey;
    https.get(url, function (res){
        response.on("data", function (data){
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const weatherDes = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const imageUrl = "http://openweathermap.org/img/wn/"+icon+"@2x.png";
            res.write("The weather is currently" + weatherDes);
            res.write("The temp in"+ query +"is"+temp);
            res.write("<img src="+imageUrl+">");
            res.send();
        })
    });
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
})