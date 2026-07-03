import React from "react";
import { useParams } from "react-router-dom";

const Login = () => {
  const {newPerson} = useParams();
  console.log( newPerson);
  
  return  (<>
   <h1>Login - {newPerson}</h1>
   </>);
};

export default Login;
