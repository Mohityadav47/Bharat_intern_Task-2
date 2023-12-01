const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost/blogwebsite', { useNewUrlParser: true, useUnifiedTopology: true });

// Create a Post model
const Post = mongoose.model('Post', {
    title: String,
    content: String
});

// Middleware
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

// Routes
app.get('/', async (req, res) => {
    const posts = await Post.find();
    res.render('index.ejs', { posts });
});

app.get('/create', (req, res) => {
    res.render('create.ejs');
});

app.post('/create', async (req, res) => {
    const { title, content } = req.body;
    const post = new Post({ title, content });
    await post.save();
    res.redirect('/');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
