import shortid from "shortid";
import React, { useState } from "react";
import { AiOutlineHeart, FaCommentAlt, VscTrash, BsPencilFill } from "react-icons/all";
import axios from "axios";
import Comment from "./Comment";
import AddComment from "../Components/AddComment";
import Edit from "./Edit";


const Post = ({ username, post }) => {
  const { _id, title, description, image, user, createdAt, likes, comments } =
    post;

  const [ Visibility, setVisibility] = useState(false); 
  const [commentState, setCommentState] = useState(comments);
  const [liked, setliked] = useState(
    likes.some((user) => user.username === username)
  );
  const [likesCount, setLikes] = useState(likes.length);

  function addComment(comment) {
    setCommentState([...commentState, { ...comment, user: { username } }]);
  }

  async function likePost() {
    try {
      await axios.patch(
        `https://posts-pw2021.herokuapp.com/api/v1/post/like/${_id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (!liked) {
        setLikes(likesCount + 1);
        setliked(true);
      } else {
        setLikes(likesCount - 1);
        setliked(false);
      }
    } catch (err) {
      console.log(err);
    }
  }

    async function hideFunction() {
      try{
        const { data } = await axios.patch(
          `https://posts-pw2021.herokuapp.com/api/v1/post/toggle/${_id}`, null ,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }); 
          
          this.props.history.push('/');

    }catch(err){
      console.log(err);
    }
  }

  return (
    <div className="flex flex-col flex-initial bg-gray-200 bg-opacity-40 rounded-2xl md:w-8/12 p-3 text-white my-3">
      <div className="w-full flex space-around font-bold ">
        <h1 className="w-1/2">@{user?.username}</h1>
        <h2 className=" text-right w-1/2 ">
          {new Date(createdAt).toLocaleDateString()}
        </h2>
      </div>
      {
        <img
          className=" w-full h-30 object-cover my-2 rounded-2xl"
          src={image}
          alt={title}
        />
      }
      
      <div className="w-full flex flex-col font-medium rounded-2xl text-sm space-y-3">
        <h1 className="">{title}</h1>
        <h2 className="font-normal text-xs">{description}</h2>
      </div>
      <div className="w-full mt-4 flex justify-between	">
        
        <button
          onClick={likePost}
          type="button"
          className={`flex space-x-3 text-xs justify-center items-center w-1/2 ${
            liked ? " solid text-red-500" : ""
          } `}
        >
          <span>
            {" "}
            <AiOutlineHeart className="w-5 h-5 mr-3" />
          </span>
          {likesCount}
        </button>
        <button
          type="button"
          className="flex space-x-3 text-xs justify-center items-center w-1/2 "
        >
          <span>
            {" "}
            <FaCommentAlt className="w-4 h-4 mr-3  text-white " />
          </span>
          {commentState.length}
        </button>

          
        <button 
          className="flex space-x-3 text-xs justify-center items-center w-1/2"
          onClick={hideFunction}> 
        <span>
          {" "}
          <VscTrash className=" text-red-600 w-6 h-6 mr-3" />
        </span>
      </button>
          <div>
          {Visibility && <Edit id={_id}/>}
        <button 
          className="flex space-x-3 text-xs justify-center items-center w-1/2"
          onClick={()=>setVisibility(!Visibility)}>
        <span>
          {" "}
          <BsPencilFill className="text-white-600 w-6 h-6 mr-3" />
        </span>
      </button>
      </div>
      </div>
      <div>
        {commentState.map((comment) => (
          <Comment key={shortid.generate()} info={comment} />
        ))}
        <AddComment idPost={_id} afterSubmit={addComment} />
      </div>
    </div>
  );
};

export default Post;