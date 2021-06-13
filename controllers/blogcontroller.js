
const Blog = require('../models/blog');


const add_blog =(req,res)=>{
    const blog = new Blog({
        title: 'new blog-2',
        snippet: 'about new blog',
        body: 'more about new blog'
    });
    blog.save()
        .then((result) => {
            res.send(result)
               
        }) .catch((e) => {
            console.log(e);
        })
}

const all_blogs = (req,res)=>{
    Blog.find()
    .then((result) => {
        res.send(result)
    })
    .catch((e) => {
        console.log(e)
    })
}

const single_blog =(req,res)=>{
    Blog.findById('60c26d1819ef9e164808f511')
        .then((result) => {
            res.send(result)
        })
        .catch((e) => {
            console.log(e)
        })
}

const delete_blog =(req,res)=>{
    const id = req.params.id;
    Blog.findByIdAndDelete(id)
        .then((result) => {
            res.send('id ' + id + ' was deleted');
        })
        .catch((e) => {
            console.log(e);
        })
}

const blog_ret =(req,res)=>{
    const id = req.params.id;
    Blog.findById(id)
        .then((result) => {
            res.send(result);
        })
        .catch((e) => {
            console.log(e);
           
        })
}

module.exports={add_blog,all_blogs,single_blog,delete_blog,blog_ret};