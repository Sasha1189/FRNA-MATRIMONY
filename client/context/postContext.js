import axios from "axios";
import React, { createContext, useState, useEffect } from "react";

const PostContext = createContext();

const PostProvider = ({ children }) => {
  //state
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);

  // to get all posts
  const getAllPosts = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get("/post/get-all-posts");
      setLoading(false);
      setPosts(data?.posts);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  // Initial posts loading
  useEffect(() => {
    getAllPosts();
  }, []);

  return (
    <PostContext.Provider value={[posts, setPosts, getAllPosts]}>
      {children}
    </PostContext.Provider>
  );
};

export { PostContext, PostProvider };
