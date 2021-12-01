import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SiAddthis } from "react-icons/all";
import Postcontainer from "../Components/Postcontainer";
import PostForm from "../Components/PostForm";
import axios from "axios";


const Main = () => {
  const [isVisibleForm, setIsVisibleForm] = useState(false);
  const navigate = useNavigate();
  const user = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const [whoami, setWhoami] = useState("");

  useEffect(() => {
    async function getIdentity() {
      const { data } = await axios.get(
        "https://posts-pw2021.herokuapp.com/api/v1/auth/whoami",
        {
          headers: {
            Authorization: `Bearer ${user}`,
          },
        }
      );
      setWhoami(data.username);
    }

    getIdentity();
    
    if (user == null) {
      navigate("/login");
      return;
    }
  
  }, []);

  return (
    <div>
      {role === "admin" && (
        <div className="px-8">
          {isVisibleForm && <PostForm />}
          <button
            onClick={() => setIsVisibleForm(!isVisibleForm)}
            type="button"
            className="w-full text-center flex justify-center mt-3 py-4 "
          >
            <SiAddthis className="stroke text-white h-6 w-6 " />
          </button>
        </div>
      )}
      <Postcontainer username={whoami} />
    </div>
  );
};

export default Main;
