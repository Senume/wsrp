import React from "react";
import { RiAdminLine } from "react-icons/ri";
import { IoIosMusicalNote } from "react-icons/io";
import { CiUser } from "react-icons/ci";

import "./UserManagerBox.css"
const UserManagerBox = (props) => {

    return (
    <div className="UserManagerBox">
        <div className="title">{props.value.UserName}</div>
        <div className="buttons">
            <button onClick={() => props.handleadmin(props.value.UserName)} disabled={props.value.userType === "admin"}><RiAdminLine /></button>
            <button onClick={() => props.handleplaylist(props.value.UserName)} disabled={props.value.userType === "playlist-maker"} ><IoIosMusicalNote /></button>
            <button onClick={() => props.handleuser(props.value.UserName)} disabled={props.value.userType === "common"}><CiUser /></button>
        </div>
    </div>);
}

export default UserManagerBox