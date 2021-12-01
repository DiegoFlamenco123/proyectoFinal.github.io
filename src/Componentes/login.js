import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import React, {useRef} from "react";
import { FaUserAstronaut, BsFillShieldLockFill} from 'react-icons/all';

const Login = () =>{
    const username = useRef(null);
    const password = useRef(null); 
    
  async function onSubmit(e){
        e.preventDefault();

        const usernameValue = username.current.value;
        const passwordValue = password.current.value;

        if(!usernameValue || !passwordValue) {
            toast('Ingrese sus credenciales',{ type:'error' });
            return;
        }
    
    

    try{    
        const response = await axios.post('https://posts-pw2021.herokuapp.com/api/v1/auth/signin',
        {username: usernameValue, password: passwordValue});
        
      
        if(response.status === 200){
            localStorage.setItem('token', response.data.token);
        }
    } catch (error){
        
        const{response} = error;
        
        let mess = '';

        if (response.status === 401) mess = 'Datos Erroneos, intente de nuevo';
        else if (response.status === 500)  mess = 'Error con el servidor';
        else if (response.status === 404)  mess = 'Usuario inexistente';
        toast(mess, { type: 'warning' }); 
        } 
    }   
    return (
          <form className="text-white flex flex-col justify-center items-center mx-auto  w-80 max-w-screen-sm h-screen md:w-auto"
          onSubmit={onSubmit}
          >
            
            <ToastContainer/>
             <div className="space-y-5">
                <div className="flex flex-col space-y-2">
                   <label className="text-lg font-medium text-center" htmlFor="L-username">
                       <FaUserAstronaut className="h-5 w-5 items-center inline-flex mr-3"/>
                       Username</label>
                   <input className="rounded-lg px-2 py-1 text-gray-600" id="L-username" type="text" placeholder="Username" ref={username}/>
                 </div>

                 <div className="flex flex-col space-y-2">
                     <label className="text-lg font-medium text-center" htmlFor="L-password">
                         <BsFillShieldLockFill  className="h-5 w-5 items-center inline-flex mr-3"/>
                         Password</label>
                     <input className="rounded-lg px-2 py-1 text-gray-600" id="L-password" type="password" placeholder="Password" ref={password}/>
                 </div>
                 <button className="rounded-2xl w-full bg-gray-500 py-2" type="submit">Login</button>
             </div>
          </form>
    )
};

export default Login;