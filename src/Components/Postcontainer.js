import React, { useEffect, useState } from "react";
import axios from "axios";
import Loading from "./Loading";
import Post from "./Post";

const Postcontainer = ({ username }) => {
  const [posts, setPosts] = useState({
    loading: true,
    data: [],
  });

  useEffect(() => {
    async function getPosts() {
      const { data } = await axios.get(
        "https://posts-pw2021.herokuapp.com/api/v1/post/all?limit=30&page=0",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setPosts({ loading: false, data: data.data });
    }

    getPosts();
  }, []);

  if (posts.loading) return <Loading />;

  return (
    <div className="flex flex-wrap px-6 mt-2 justify-center items-center ">
      {posts.data.map((post) => (
        <Post key={post._id} username={username} post={post} />
      ))}
    </div>
  );
};

export default Postcontainer;
