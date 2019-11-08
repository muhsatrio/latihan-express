const http = require('http');
const express = require('express');
const app = express();

// Answer for task 2

app.use((req, res, next) => {
    console.log('Hello1');
});

app.use((req, res, next) => {
    console.log('Hello2');
    res.send('Hello2');
});

// Answer for task 3

// app.use('/', (req, res, next) => {
//     console.log('This is home!');
//     res.send('<h1>This is Home</h1>');
// });

// app.use('/users', (req, res, next) => {
//     console.log('This is users!');
//     res.send('<h1>This is Users</h1>');
// });
app.listen(3000);