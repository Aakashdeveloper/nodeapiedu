const express = require('express');
const app = express();
const port = 8800;
const mongo = require('mongodb');
const bodyParser = require('body-parser');
const MongoClient = mongo.MongoClient;
const mongourl = "mongodb://localhost:27017"
let db;
let col_name="nodeat8";

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

//Create
app.post('/adduser',(req,res) => {
    db.collection(col_name).insert(req.body,(err,result) =>{
        if(err) throw err;
        res.send('Data Added')
    })
})


//Read
app.get('/',(req,res) => {
    db.collection(col_name).find({isActive:true}).toArray((err,result) => {
        if(err) throw err;
        res.send(result)
    })
})

//Update
app.put('/updateUser',(req,res) => {
    db.collection(col_name)
    .update({_id:parseInt(req.body.id)},
        {
            $set:{
                name: req.body.name,
                city: req.body.city,
                phone: req.body.phone,
                isActive: req.body.isActive
            }
        },(err,result) =>{
        if(err) throw err;
        res.send('Data Updated')
    })
})

//Delete
app.delete('/deleteUser',(req,res) => {
    db.collection(col_name)
    .remove({_id:req.body.id},(err,result) =>{
        if(err) throw err;
        res.send('Data Deleted')
    })
})


///Db Connection
MongoClient.connect(mongourl,(err,client) => {
    if(err) throw err;
    db = client.db('classpractice');
    app.listen(port,(err) => {
        if(err) throw err;
        console.log(`Server is running on port 8800`)
    })
})

