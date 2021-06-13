//creating a server with different html files using express & middleware functions
const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');
const Blog = require('./models/blog');
const blogcontroller= require('./controllers/blogcontroller');
//connection to DB
const dbURI = 'mongodb+srv://mohamed:test123@cluster0.ddle4.mongodb.net/nodejs?retryWrites=true&w=majority';

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => app.listen(3000))
    .catch(e => { (console.log('connecteion faild' + e)) })


// make files puplic and accessable from fronend
app.use(express.static('public'));

// manual middleware logger function
app.use((req, res, next) => {
    console.log('request was made');
    console.log('host: ', req.hostname);
    console.log('path: ', req.path);
    console.log('method: ', req.method);
    next();

})
// 3rd party middleware package
app.use(morgan('dev'));

//creating new blog document
app.get('/add-blog',blogcontroller.add_blog);

// retrive all blogs
app.get('/all-blogs',blogcontroller.all_blogs);

// retrive a singel blog
app.get('/single-blog',blogcontroller.single_blog),

//retrive a single blog based on client request
app.get('/:id',blogcontroller.blog_ret);

// delete a blog based on client request
app.get('/delete/:id',blogcontroller.delete_blog);



app.get('/', (req, res) => {
    res.sendFile('./home.html', { root: __dirname });
});
app.get('/about', (req, res) => {
    res.sendFile('./about.html', { root: __dirname });
});
// Redirect
app.get('/about-us', (req, res) => {
    res.redirect('/about');
});
// Page not found
app.use((req, res) => {
    res.status(404).sendFile('../404.html', { root: __dirname });
})