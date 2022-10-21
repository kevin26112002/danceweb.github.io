
const express = require("express");
const path = require("path");
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
// const { nextTick } = require("process");
const DB = 'mongodb+srv://kevin:kevinp@cluster0.n5kocwg.mongodb.net/?retryWrites=true&w=majority'
main().catch(err => console.log(err));

async function main() {
  await mongoose.connect(DB,{ useNewUrlParser: true ,useUnifiedTopology: true});
    console.log("We are connecting bro...")
}
// mongoose.connect(DB, {
//     useNewUrlParser:true,
//     useCreateIndexes:true,
//     useUnifiedTopology:true,
//     useFindAndModify:false
// }).then(()=>{
//     console.log(`connection sucessfully established`);
// }).catch((err) => console.log(`no connection`));
// mongoose.connect('mongodb+srv://kevin:kevin@26112002@cluster0.0p0ehyn.mongodb.net/test',{useNewUrlParser: true});


const middleware = (req, res, next) =>{
    console.log(`hello my middleware`);
    next();
}




// define mongoose schema 
const contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    desc: String
  });

const contact = mongoose.model('contact', contactSchema);


// express spacific stuff
app.use('/static',express.static('static'))
app.use(express.urlencoded())

// pug specific stuff
app.set('view engine', 'pug');
app.set('views', path.join(__dirname,'views')) 

// endpoint

app.get('/',(req,res)=>{
    const params = {}
    res.status(200).render('home.pug',params);

})
app.get('/contact',middleware,(req,res)=>{
    const params = {}
    res.status(200).render('contact.pug',params);

})
app.post('/contact',(req,res)=>{
    var muydata = new contact(req.body);
    muydata.save().then(()=>{
        res.send("this item has been saved to the database");
    }).catch(()=>{
        res.status(400).send("item was not saved to the database");
    })
    // res.status(200).render('contact.pug');
})

// start the server
app.listen(8000, ()=>{
    console.log(`the application started succesfully on port 8000`);
});