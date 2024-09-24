const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const app = express();
app.use('/static', express.static(path.join(__dirname, 'asset')));

const url = 'mongodb://localhost:27017/Project';
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

// ตั้งค่า limit ขนาดข้อมูล
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

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
app.use('/login', require('./routes/login'));
app.use('/api', require('./routes/users'));
app.use('/profile', require('./routes/profile'));
app.use('/question', require('./routes/question'));
app.use('/answer', require('./routes/answer'));
app.use('/comment',require('./routes/comment'))


app.listen(3000, function() {
    console.log('Listening on port 3000');
});
