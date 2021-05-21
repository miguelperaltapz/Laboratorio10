const { render } = require('ejs');
const express = require('express');
const router = express.Router();
const Post = require('../model/post');


router.get('/', async function(req,res){
  var posts = await Post.find();
  res.render('index', {posts});
});


router.get('/newPost', async (req,res) =>{
  res.render('newPost');
});

router.post('/newPost', async (req, res) => {
  var posts = new Post(req.body);
  await posts.save();
  res.redirect('/');
});

router.get('/edit/:id', async(req, res) => {
  var posts = await Post.findById(req.params.id);
  res.render('edit', {posts});
});

router.post('/edit/:id', async(req, res) => {
  var id = req.params.id;
  await Post.update({_id: id}, req.body);
  res.redirect('/');
});

router.get('/delete/:id', async(req, res) => {
  var posts = await Post.findById(req.params.id);
  res.render('delete', {posts});
});

router.post('/delete/:id', async(req, res) => {
  var id = req.params.id;
  await Post.deleteOne({_id: id});
  res.redirect('/');
});



module.exports = router;