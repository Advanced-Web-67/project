const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');  // นำเข้า cors

const app = express();

const url = 'mongodb://localhost:27017';
const config = {
    autoIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
};

// ใช้ cors middleware
app.use(cors({
    origin: 'http://localhost:4200',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

app.use((req, res, next) => {
    mongoose.connect(url, config)
        .then(() => {
            console.log('Connected to MongoDB...');
        })
        .catch(err => {
            console.log('Cannot connect to MongoDB');
        });
    next();
});

app.use('/register', require('./routes/register'));
// app.use('/login', require('./routes/signin'));

app.listen(3000, function() {
    console.log('Listening on port 3000');
});
