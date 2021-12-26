const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:true} ));
const port = 3000;

app.get('/', (req, res) => {
    res.sendFile(__dirname+"/index.html");
})

app.post('/', function (req, res){
    var result = Number(req.body.num1)+Number(req.body.num2);
    res.send("Result:"+result);
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
})