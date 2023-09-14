const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  commenterEmail:{
    type: String,
  },
  commentData: {
    type: String,
  },
  
})

const postSchema = new mongoose.Schema({
  objectId: {
    type: mongoose.Types.ObjectId,
  },
  email: {
    type: String,
    required: true,
  },
  numberOfComments: {
    type: Number,
    default: 0,
  },
  likes: {
    type: Number,
    default: 0,
  },
  comments: [commentSchema],

  postImage: {
    type: String, // You can store the image URL or use a file storage system
    required: true,
  },
  postCaption: {
    type: String,
    required: true,
  },
});



module.exports = mongoose.model('Post', postSchema);
