//required library
const mongoose = require('mongoose');
//connecting to database
mongoose.connect('mongodb://localhost/untitlrd1_db');

//acquire the connection to check if it is success
const db = mongoose.connection;

//error handle
db.on('error', console.error.bind(console, 'error connecting to db'));
//up and running
db.once('open', function (){
    console.log("connected to database");
});
