const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userController = require('./Controllers/UserController');
const postController = require('./Controllers/PostController');

const multer = require('multer');
const Post = require('./Models/Post');

const app = express();
const port = 8080; // Use an environment variable for the port

const path = require('path');
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


app.get('/getImage/:filename', (req, res) => {
  const filename = req.params.filename;
  const imagePath = path.join(__dirname, filename); // Remove one "uploads"

  // Serve the image file
  res.sendFile(imagePath);
});




// Set up Multer for handling file uploads (you can configure it according to your needs)
const storage = multer.diskStorage({
  destination: './uploads', // Directory where uploaded files will be stored
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, Date.now() + ext); // Rename the file with a timestamp
  },
});

const upload = multer({ storage });

// Create a route to handle POST requests for creating a new post
app.post('/posts', upload.single('postImage'), async (req, res) => {
  try {
    const {  email, postCaption } = req.body;
    const postImage = req.file ? `/uploads/${req.file.filename}` : null;

    const post = new Post({
      email,
      postImage,
      postCaption,
    });

    await post.save();

    // Set CORS headers explicitly
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000'); // Replace with your frontend's URL
    res.status(201).json({ message: 'Post created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});


app.use(cors({
  origin: 'http://localhost:3000',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
}));

app.use(express.json());

app.post('/signup', userController.signup);
app.post('/login', userController.login);
app.get('/getAllPosts', postController.getAllPosts);
app.post('/createComment', postController.createComment);
app.post('/addLike/:id', postController.createLike);
app.get('/getCommentByID/:id', postController.getCommentsByID);





mongoose
  .connect('mongodb://127.0.0.1:27017/Instagram')
  .then(() => {
    app.listen(port, () => {
      console.log(`App is running on port ${port}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });

// Error Handling Middleware (Moved above mongoose.connect and app.listen)
app.use((err, req, res, next) => {
  console.error(err.stack);
  const statusCode = err.statusCode || 500;
  const mesg = err.message;
  const data = err.data;
  res.status(statusCode).json({ mesg, data });
});
