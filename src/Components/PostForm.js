import axios from "axios";
import React from "react";
import { MdOutlinePublishedWithChanges } from "react-icons/all";

const PostForm = () => {
  async function onSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const body = Object.fromEntries(formData.entries());
    const validation = Array.from(formData.values());

    const isValid = validation.every((it) => it !== "");

    if (!isValid) return alert("Complete todos los campos para continuar");

    const res = await axios.post(
      "https://posts-pw2021.herokuapp.com/api/v1/post/create",
      { ...body, active: body.active === "on" },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
  }

  return (
    <form
      id="form"
      onSubmit={onSubmit}
      className="bg-white bg-opacity-20 mt-3 p-3 text-gray-200 font-bol space-y-3"
    >
      <div className="flex flex-col text-sm ">
        <label htmlFor="title">Title</label>
        <input
          className="text-gray-600 px-2 py-1 my-1"
          type="text"
          name="title"
          id="title"
        />
      </div>
      <div className="flex flex-col text-sm ">
        <label htmlFor="description">Description</label>
        <input
          className="text-gray-600 px-2 py-1 my-1"
          type="text"
          name="description"
          id="description"
        />
      </div>
      <div className="flex flex-col text-sm ">
        <label htmlFor="image">Image</label>
        <input
          className="text-gray-600 px-2 py-1 my-1"
          type="text"
          name="image"
          id="image"
        />
      </div>
      <div className="flex flex-col text-sm ">
        <label htmlFor="active">Active</label>
        <input
          className="text-red-500 w-4 h-4 mr-2 focus:ring-red-500 focus:ring-opacity-25 border border-gray-200 rounded  "
          type="checkbox"
          name="active"
          id="active"
        />
      </div>
      <button
        type="submit"
        className="bg-green-500 w-full rounded-2xl text-center items-center flex py-2 justify-center font-bold"
      >
        <MdOutlinePublishedWithChanges className="mr-5 h-6 w-6" />
        Publish
      </button>
    </form>
  );
};
export default PostForm;
