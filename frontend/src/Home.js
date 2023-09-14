import React, { useCallback, useState, useEffect, useContext } from "react";

import axios from "axios";
import { UserContext } from "./Hooks/AuthContext";

export default function Home() {
  const { userEmail, name } = useContext(UserContext);

  const [PostCreated, setPostCreated] = useState(false);
  const [postCaption, setPostCaption] = useState("");
  const [postImage, setPostImage] = useState(null);
  const [posts, setPost] = useState([]);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [selectedPostId, setSelectedPostId] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("email", userEmail);
    formData.append("postCaption", postCaption);
    formData.append("postImage", postImage);
    try {
      const response = await fetch("http://localhost:8080/posts", {
        method: "POST",
        body: formData,
      });

      if (response.status === 201) {
        handleModalClose();
        setPostCreated(true);
        fetchAllPost();
        setTimeout(() => {
          setPostCreated(false);
        }, 5000);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const [isOpen, setIsOpen] = useState(false);

  const handleModalOpen = () => {
    setIsOpen(true);
  };

  const handleModalClose = () => {
    setIsOpen(false);
  };
  const createPost = useCallback(async (id) => {
    try {
      const reponse = await axios.post("http://localhost:8080/createComment", {
        id: id,
        email: userEmail,
        comment: newComment,
      });
      console.log(reponse.data);
      setNewComment("");
      fetchAllPost();
    } catch (error) {
      console.log(error);
    }
  });

  const fetchAllPost = useCallback(async () => {
    try {
      const reponse = await axios.get("http://localhost:8080/getAllPosts");
      console.log(reponse.data);
      setPost(reponse.data);
    } catch (error) {
      console.log(error);
    }
  });

  const getCommentsByID = useCallback(
    async (id) => {
      try {
        const response = await axios.get(
          `http://localhost:8080/getCommentByID/${id}`
        );
        console.log("All comments");
        console.log(response.data);
        setSelectedPostId(id);
        // Update the comments state with the fetched comments
        setComments(response.data);
      } catch (error) {
        console.log(error);
      }
    },
    [setComments]
  );

  const addLike = useCallback(async (id) => {
    try {
      const response = await axios.post(`http://localhost:8080/addLike/${id}`);
      console.log("Like");
      console.log(response.data);
      fetchAllPost();
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    fetchAllPost();
  }, []);

  return (
    <div>
      <h1 className=" mb-2 ml-[520px] text-3xl font-extrabold ">
        Hello {name}
      </h1>

      <h1 className=" mb-2 ml-[520px] text-2xl font-extrabold ">Home Screen</h1>

      {PostCreated && (
        <>
          <div
            className="ml-96 w-96  animate-jump-in rounded border border-green-400 bg-green-100 px-4 py-3 text-green-700 animate-ease-in-out"
            role="alert"
          >
            <strong className="font-bold">
              Your Post Uploaded Suncessfully
            </strong>
          </div>
        </>
      )}
      <button
        type="button"
        onClick={() => {
          handleModalOpen(true);
        }}
        class="ml-[720px] mr-2 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700"
      >
        Add Post
      </button>

      {posts.map((post) => (
        <a
          key={post._id}
          class=" ml-[440px] mt-6 block max-w-sm rounded-lg border border-gray-200 bg-white p-6 shadow "
        >
          <div className="flex">
            <p>User Name:</p>
          <p className="mb-2 ml-5 text-lg font-bold tracking-tight text-gray-900 dark:text-white">
            {post.email}
          </p>

          </div>
          <img
            src={`http://localhost:8080/getImage/${encodeURIComponent(
              post.postImage
            )}`}
            className="ml-20 h-56 w-40 text-3xl"
            alt="Post Image"
          />
          <div className="flex">
            <p className="mt-5">Caption: </p>
          <p className="mt-5 ml-5 text-lg font-bold tracking-tight text-gray-900 dark:text-white">{post.postCaption}</p>

          </div>
          <div className="flex">
            <svg
              onClick={() => addLike(post._id)}
              viewBox="0 0 1024 1024"
              fill="currentColor"
              height="3em"
              width="2em"
              className="mt-3 cursor-pointer"
            >
              <path d="M923 283.6a260.04 260.04 0 00-56.9-82.8 264.4 264.4 0 00-84-55.5A265.34 265.34 0 00679.7 125c-49.3 0-97.4 13.5-139.2 39-10 6.1-19.5 12.8-28.5 20.1-9-7.3-18.5-14-28.5-20.1-41.8-25.5-89.9-39-139.2-39-35.5 0-69.9 6.8-102.4 20.3-31.4 13-59.7 31.7-84 55.5a258.44 258.44 0 00-56.9 82.8c-13.9 32.3-21 66.6-21 101.9 0 33.3 6.8 68 20.3 103.3 11.3 29.5 27.5 60.1 48.2 91 32.8 48.9 77.9 99.9 133.9 151.6 92.8 85.7 184.7 144.9 188.6 147.3l23.7 15.2c10.5 6.7 24 6.7 34.5 0l23.7-15.2c3.9-2.5 95.7-61.6 188.6-147.3 56-51.7 101.1-102.7 133.9-151.6 20.7-30.9 37-61.5 48.2-91 13.5-35.3 20.3-70 20.3-103.3.1-35.3-7-69.6-20.9-101.9zM512 814.8S156 586.7 156 385.5C156 283.6 240.3 201 344.3 201c73.1 0 136.5 40.8 167.7 100.4C543.2 241.8 606.6 201 679.7 201c104 0 188.3 82.6 188.3 184.5 0 201.2-356 429.3-356 429.3z" />
            </svg>
            <svg
              onClick={() => getCommentsByID(post._id)}
              fill="currentColor"
              viewBox="0 0 16 16"
              height="2em"
              width="2em"
              className="ml-[15px] mt-[20px] cursor-pointer"
            >
              <path d="M2.678 11.894a1 1 0 01.287.801 10.97 10.97 0 01-.398 2c1.395-.323 2.247-.697 2.634-.893a1 1 0 01.71-.074A8.06 8.06 0 008 14c3.996 0 7-2.807 7-6 0-3.192-3.004-6-7-6S1 4.808 1 8c0 1.468.617 2.83 1.678 3.894zm-.493 3.905a21.682 21.682 0 01-.713.129c-.2.032-.352-.176-.273-.362a9.68 9.68 0 00.244-.637l.003-.01c.248-.72.45-1.548.524-2.319C.743 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7-3.582 7-8 7a9.06 9.06 0 01-2.347-.306c-.52.263-1.639.742-3.468 1.105z" />
            </svg>
          </div>

          <div className="flex">
            <p className="ml-3">{post.likes}</p>
            <p className="ml-6">{post.numberOfComments}</p>
          </div>
          <div>
            <div className="mt-5">
              {post._id === selectedPostId &&
                (comments.length > 0 ? (
                  comments.map((data, index) => (
                    <div key={index} className="flex">
                      <p className="mb-2 text-lg font-bold tracking-tight text-gray-900 dark:text-white">
                        {data.commenterEmail}
                      </p>
                      <p className="ml-5 font-normal text-gray-700 dark:text-gray-400">
                        {data.commentData}
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500">No comments yet.</p>
                ))}
            </div>

            <form>
              <label
                for="search"
                class="sr-only mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Search
              </label>
              <div class="relative">
                <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <svg
                    fill="currentColor"
                    viewBox="0 0 16 16"
                    height="2em"
                    width="2em"
                    class="h-4 w-4 text-gray-500 dark:text-gray-400"
                  >
                    <path d="M2.678 11.894a1 1 0 01.287.801 10.97 10.97 0 01-.398 2c1.395-.323 2.247-.697 2.634-.893a1 1 0 01.71-.074A8.06 8.06 0 008 14c3.996 0 7-2.807 7-6 0-3.192-3.004-6-7-6S1 4.808 1 8c0 1.468.617 2.83 1.678 3.894zm-.493 3.905a21.682 21.682 0 01-.713.129c-.2.032-.352-.176-.273-.362a9.68 9.68 0 00.244-.637l.003-.01c.248-.72.45-1.548.524-2.319C.743 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7-3.582 7-8 7a9.06 9.06 0 01-2.347-.306c-.52.263-1.639.742-3.468 1.105z" />
                  </svg>
                </div>
                <input
                  type="search"
                  id="search"
                  value={newComment}
                  onChange={(e) => {
                    setNewComment(e.target.value);
                  }}
                  class="mt-10 block w-full rounded-lg border border-gray-300 bg-gray-50 p-4 pl-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                  placeholder="Add Comment"
                  required
                />
                <button
                  type="button"
                  onClick={() => createPost(post._id)}
                  class="absolute bottom-2.5 right-2.5 rounded-lg bg-blue-700 px-4 py-2 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Add
                </button>
              </div>
            </form>
          </div>
        </a>
      ))}

      {isOpen && (
        <div className="fixed inset-0 z-50 flex animate-jump-in items-center justify-center overflow-auto">
          <div className="modal-overlay absolute h-full w-full bg-transparent "></div>

          <div className="modal-container z-50  rounded bg-slate-50 shadow-lg ">
            <div className="modal-content px-6 py-4 text-left">
              {/* Modal header */}
              <div className="flex flex-row-reverse items-center pb-3">
                <button
                  onClick={handleModalClose}
                  className="modal-close z-50 cursor-pointer"
                >
                  <svg
                    className="fill-current text-black"
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                  >
                    <path
                      d="M1.39 1.393a1 1 0 011.414 0L9 7.586l6.197-6.193a1 1 0 111.414 1.414L10.414 9l6.197 6.197a1 1 0 11-1.414 1.414L9 10.414l-6.197 6.197a1 1 0 01-1.414-1.414L7.586 9 1.39 2.803a1 1 0 010-1.41z"
                      fillRule="evenodd"
                    ></path>
                  </svg>
                </button>
              </div>
              <h1 class="mb-4 text-base font-bold leading-none tracking-tight text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
                Create Post
              </h1>
              <form onSubmit={handleSubmit}>
                <div>
                  <label>Post Caption:</label>
                  <textarea
                    className="ml-5 mt-5"
                    value={postCaption}
                    onChange={(e) => setPostCaption(e.target.value)}
                  />
                </div>
                <div>
                  <label>Image:</label>
                  <input
                    className="mt-7"
                    type="file"
                    accept="image/*"
                    onChange={(e) => setPostImage(e.target.files[0])}
                  />
                </div>
                <button
                  className="mb-2 ml-52 mr-2 rounded-lg bg-gray-800 px-5 py-2.5 text-sm font-medium text-white hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
                  type="submit"
                >
                  Create Post
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
