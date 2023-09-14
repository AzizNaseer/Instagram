// postController.js
const Post = require("../Models/Post"); // Correct the import statement

// Controller to create a new post with image upload
exports.createPost = async (req, res) => {
  try {
    const { email, caption } = req.body;
    const image = req.file.path; // Multer adds a 'file' property to the request object

    const newPost = new Post({
      user: { email },
      image,
      caption,
    });

    const savedPost = await newPost.save();
    res.status(201).json(savedPost);
  } catch (error) {
    res.status(500).json({ error: "Error creating post" });
  }
};

exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ error: "Error fetching posts" });
  }
};

exports.createComment = async (req, res) => {
  try {
    const { comment, id, email } = req.body;
    console.log(id);
    const DBpost = await Post.findById(id);
    console.log(DBpost);
    if (!DBpost) {
      return res.status(404).json({ error: "Post Not found" });
    }

    // Create a new comment object
    const newComment = {
      commenterEmail: email,
      commentData: comment,
    };

    // Push the new comment into the comments array
    DBpost.comments.push(newComment);

    // Update the numberOfComments field
    DBpost.numberOfComments = DBpost.comments.length;

    await DBpost.save();
    return res.status(200).json(DBpost);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error while creating comment" });
  }
};

exports.getCommentsByID = async (req, res) => {
  try {
    const { id } = req.params; // Access id from URL parameters
    console.log(id);
    const DBpost = await Post.findById(id);
    console.log(DBpost);
    if (!DBpost) {
      return res.status(404).json({ error: "Post Not found" });
    }

    console.log(DBpost.comments);

    return res.status(200).json(DBpost.comments);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error while fetching comments" });
  }
};

exports.createLike = async (req, res) => {
  try {
    const { id } = req.params; // Access id from URL parameters
    console.log(id);
    const DBpost = await Post.findById(id);
    console.log(DBpost);
    if (!DBpost) {
      return res.status(404).json({ error: "Post Not found" });
    }

     // Increment the likes by one
    DBpost.likes += 1;

    // Save the updated post
    await DBpost.save();

    
    return res.status(200).json(DBpost.comments);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error while fetching comments" });
  }
};
