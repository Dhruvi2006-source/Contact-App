const express = require('express')
const app = express();
const mongoose = require('mongoose')
const Contact = require('./Model/Contact')

mongoose.connect('mongodb://localhost:27017/contacts-crud').then(()=>console.log("Database is connected"))

//Middle ware

app.set('view engine' , 'ejs')
app.use(express.urlencoded({extended:false}))
app.use(express.static('public'))

//Routes

app.get('/'  , async(req , res) =>{

   const contact = await Contact.find();
//    res.json(contact); 
    // res.send("Home page")
    res.render('home' , {contact})
})

app.get('/show_contact/:id' , async (req , res) =>{

    const contact = await Contact.findOne({_id : req.params.id})

    res.render('show_contact' , {contact} )
})

app.get('/add_contact' ,  (req , res) =>{
    res.render('add_contact')
})

// app.post('/add_contact' , async (req , res) =>{
    
//     const contact = await Contact.insertOne({
//         first_name : req.body.first_name,
//         last_name : req.body.last_name,
//         city : req.body.city,
//         phone : req.body.phone,
//         address : req.body.address
//     })
//     res.redirect("/")
// })

app.post('/add_contact', async (req, res) => {
  await Contact.create({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    city: req.body.city,
    phone: req.body.phone,
    address: req.body.address
  });
  res.redirect("/");
});


app.get('/update_contact/:id' , async (req , res) =>{

    const contact = await Contact.findOne({_id : req.params.id})

    res.render('update_contact' , {contact})
})

app.post('/update_contact' , async (req , res) =>{
    
    const contact = await Contact.updateOne({
        first_name :req.body.first_name,
        last_name :req.body.last_name,
        city : req.body.city,
        phone : req.body.phone,
        address : req.body.address
    })
    res.redirect("/")

    // res.send("Home page")
})
app.get('/delete_contact/:id' ,  async (req , res) =>{

    await Contact.deleteOne()
    
    res.redirect("/")

    // res.render('show_contact')
})


app.listen(3000 , ()=>{
    console.log("Server is started")
})

