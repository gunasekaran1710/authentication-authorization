const express=require('express');
const routes=require('../jwt-c/routes/userRoutes');
const bodyparser=require('body-parser');
const mongoose=require('mongoose');
const app=express();
app.use(bodyparser.json());
mongoose.connect('mongodb://localhost:27017/mydatabase',{
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(()=>{
    console.log('connected with database');
}).catch(err=>{
    console.log('database connection error');
});
app.use('/go',routes);
const PORT=3000;
app.listen(PORT,()=>{
    console.log('server is running on port number 3000');
});
