import React, { useState } from 'react';

const CreatePost = () => {
  const [user, setUser] = useState('');
  const [email, setEmail] = useState('');
  const [postCaption, setPostCaption] = useState('');
  const [postImage, setPostImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('user', user);
    formData.append('email', email);
    formData.append('postCaption', postCaption);
    formData.append('postImage', postImage);

    try {
      const response = await fetch('http://localhost:8080/posts', {
        method: 'POST',
        body: formData,
      });

      if (response.status === 201) {
        // Handle success, e.g., clear form fields or show a success message
      } else {
        // Handle error, e.g., display an error message to the user
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Create a Post</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>User:</label>
          <input type="text" value={user} onChange={(e) => setUser(e.target.value)} />
        </div>
        <div>
          <label>Email:</label>
          <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div>
          <label>Post Caption:</label>
          <textarea value={postCaption} onChange={(e) => setPostCaption(e.target.value)} />
        </div>
        <div>
          <label>Image:</label>
          <input type="file" accept="image/*" onChange={(e) => setPostImage(e.target.files[0])} />
        </div>
        <button type="submit">Create Post</button>
      </form>
    </div>
  );
};

export default CreatePost;
