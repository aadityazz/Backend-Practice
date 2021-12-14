const express = require('express');
const path = require('path');
const port = 8001;

const db = require('./config/mongoose');
const Contact = require('./models/contact')

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded());
app.use(express.static('assets'));

var contactList = [
    {
        name: "Coding",
        phone: "12131321321"
    }
]

app.get('/practice', function(req, res){
    return res.render('practice', {
        title: "Let us play with ejs"
    });
});


app.get('/', function(req, res){
    Contact.find({}, function(err, contacts){
        if(err){
            console.log("error in fetching contacts from db");
            return;
        }
        return res.render('home',{
            title: "Contact List",
            contact_list: contacts
        });
    })
})
app.post('/create-contact', function(req, res){
    Contact .create({
        name: req.body.name,
        phone: req.body.phone
    }, function(err, newContact){
        if(err){console.log('error occur');
        return;}
        console.log('*****', newContact);
        return res.redirect('/');
    });
});

app.listen(port, function(err){
    if (err) {
        console.log("Error in running the server", err);
    }
    console.log('Yup!My Server is running on Port', port);
})


app.get('/delete-contact/', function(req, res){
    //getting id from query in url
    let id = req.query.id;
    //find contact in db using id and delete
    Contact.findByIdAndDelete(id, function (err){
       if(err){
           console.log('error');
           return;
       }
        return res.redirect('back');
    });
});
