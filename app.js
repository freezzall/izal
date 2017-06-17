const express =require('express');
const path =require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');

//Database Connection String
mongoose.connect(config.database);

mongoose.connection.on('connected', ()=>{
    console.log('Terhubung ke Database '+config.database);
});

mongoose.connection.on('error', (err)=>{
    console.log('Database Error '+err);
});

const app = express();

const users = require('./routes/users');

//Inisiasi Nomor Port
const port =3000;

//CORS MODULE
app.use(cors());

//Set client folder
app.use(express.static(path.join(__dirname,'public')));

//Body Parser
app.use(bodyParser.json());

//passport
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

app.use('/users',users);

//Index Route
app.get('/', (req,res)=>{
   res.send('Halaman tidak ditemukan . . .') 
});

//Start Server
app.listen(port, () =>{
    console.log('Memulai Server Port : '+ port);
});