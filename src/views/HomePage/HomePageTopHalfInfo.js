import React, { useContext, useEffect, useState, useRef } from "react"
import "./HomePage.scss"
import {DownArrow} from "../../components/DownArrow";
import useWindowDimensions from "./useWindowDimensions";
import {StyledText} from "../../components/Text";
import Button from '@material-ui/core/Button';
import {colorScheme} from "../../constants";


const HomePageTopHalfInfo = ()=>{

    return <div style={{border: `1px solid grey`, height: "50vh", display:"flex",flexDirection:"column", justifyContent:"space-between", padding: "5px"}}>
        <StyledText>
            Aaron Malki Real Estate <br/>
            Unparalled Success.
        </StyledText>

              <Button variant="contained" style={{paddingRight: "60px", paddingLeft:"60px", border:`2px solid ${colorScheme.primary.light}`, color:colorScheme.primary.dark}}>View Our Open Homes</Button>

    </div>
};

export default HomePageTopHalfInfo;