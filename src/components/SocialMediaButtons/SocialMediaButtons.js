import React from "react"
import {Instagram, LinkedIn} from "@material-ui/icons";
import Avatar from '@material-ui/core/Avatar';

const SocialMediaButtons = () => {

    return (
        <div style={{
            top: "50%",
            position: "fixed",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            alignContent: "center",
            border: '1px solid purple',
            height: "95px",
            justifyContent: "space-between"
        }} aria-label="outlined primary button group">

            <Avatar>
                <Instagram style={{color: "#c32aa3"}}/>
            </Avatar>

            <Avatar>
                <LinkedIn/>
            </Avatar>


        </div>
    )

};

export default SocialMediaButtons;