const express = require('express');
const  bodyParser = require("body-parser");
const app = express();
let items = ["hello", "Bye", "food"];
let workitems= [];
app.set('views engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use[express.static("public")];
const port = 3000;

app.get('/', (req, res) => {
    let today = new Date();

    let options={
        weekday:"long",
        day:"numeric",
        month:"long"
    };
    let day = today.toLocaleDateString("en-US", options);
    res.render("view", {listtitle: day, newListItems: items});
});

app.post('/', function (req, res){
    let item = res.body.newItem;
    if(req.body.list === "work"){
        workitems.push(item);
        res.redirect("/work");
    }else{
        items.push(item);
        res.redirect("/");
    }
})

app.get("/work", function (req,res){
    res.render("list",{listtitle:"work list", newListItems: workitems});
})

app.post("/work", function (req, res){
    let item = req.body.newItem;
    workitems.push(item);
    res.redirect("/work");
})

app.get("/about", function (req, res){
    res.render("about");
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
})
