import React from "react";
import UserNavbar from "./UserNavbar";
import { useHistory } from "react-router-dom";

export default function Welcome()
{
    const history = useHistory(); 
    
  const handleLogout = () => {
    history.push("/");
  };
    return(
        <div>
            <UserNavbar handleLogout={handleLogout} />
        </div>
    )
}