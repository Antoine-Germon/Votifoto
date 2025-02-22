const express = require('express');
const mongoose = require('mongoose');
const Image = require('./models/imageModels')
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));

//routes

//main page
app.get('/', (req, res)=>{
    res.send("hello");
})

//second page
app.get('/blog', (req, res)=>{
    res.send("hello blog");
})

//get all image object in base
app.get('/voir', async(req, res)=>{
    try {
        const image = await Image.find({});
        res.status(200).json(image);
    } catch(error){
        res.status(500).json({message: error.message})
    }
})

//get one image in base by id
app.get('/voir/:id', async(req, res)=>{
    try {
        const {id} = req.params;
        const image = await Image.findById(id);
        res.status(200).json(image);
    } catch(error){
        res.status(500).json({message: error.message})
    }
})

//add an image to base
app.post('/imageRoute', async(req, res)=>{
    try {
        const image = await Image.create(req.body)
        res.status(200).json(image);
    } catch(error) {
        console.log(error.message);
        res.status(500).json({message: error.message})
    }
})

//update image
app.put('/image/:id', async(req, res)=>{
    try {
        const {id} = req.params;
        const image = await Image.findByIdAndUpdate(id, req.body);
        if(!image){
            return res.status(404).json({message : "cannot find image"});
        }
        const newimage = await Image.findById(id);
        res.status(200).json(newimage);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

//delete an immage
app.delete('/image/:id', async(req, res)=>{
    try {
        const {id} = req.params;
        const image = await Image.findByIdAndDelete(id);
        if(!image){
            return res.status(404).json({message : "cannot find image"});
        }
        res.status(200).json(image);
    } catch(error) {
        res.status(500).json({message: error.message})
    }
})

//connect to database
mongoose.set('strictQuery', false);
mongoose.connect('mongodb+srv://admin:admin@votifoto.4szd9p7.mongodb.net/voti-node?retryWrites=true&w=majority').then(() => {
    app.listen(3000, ()=>{
        console.log("votifoto : port 3000");
    })
    console.log("yes!");
}).catch(() => {
    console.log(error);
})