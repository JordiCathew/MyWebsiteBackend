require('dotenv').config();
const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');
const mongoose = require("mongoose");

const app = express();
mongoose.connect(process.env.MONGO_CONNECTION);

const postSchema = new mongoose.Schema({
    title: {
      type: String,
      required: true
    },
    content: {
      type: String,
      required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const Post = mongoose.model("Post", postSchema);

app.get("/", (req, res) => {
  console.log("Hello from Firebase!");
  res.send("Hello from Firebase!");
});

// The async/await syntax is used here to make the database query asynchronous,
// so that it doesn't block the main thread of the application.
app.get('/api', async (req, res) => {
    try {
      const posts = await Post.find();
      res.json(posts);
    } catch (error) {
      console.error(error);
      res.status(500).send("Server error");
    }
});

app.get('/api/:postsId', async (req, res) => {
  const postId = req.params.postsId;

  try {
    const post = await Post.findOne({"_id": postId});

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    res.json(post);
    
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

app.listen(process.env.PORT || 5000, () => { 
  console.log("Server started on port process.env.port or 5000.")
});
