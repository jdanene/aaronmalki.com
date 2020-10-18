import React, {useContext, useEffect, useState, useRef, Suspense} from "react"
import "./HomePage.scss"
import {DownArrow} from "../../components/DownArrow";
import useWindowDimensions from "./useWindowDimensions";
import HomePageTopHalfInfo from "./HomePageTopHalfInfo";
import {useImage} from 'react-image'
import {CardMedia} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Image from 'react-image-resizer';
import {useMediaQuery} from "@material-ui/core";
import {FittedText, StyledText} from "../../components/Text";
import { useTheme } from '@material-ui/core/styles';
import {useWindowSize} from "../../components/useWindowSize";
import {colorScheme} from "../../constants";
import HomePageBottomHalfInfo from "./HomePageBottomHalfInfo";

function ProfilePicture({mobileBreak}) {

    return <div style={{width: mobileBreak ? "100%" : "49%",height:mobileBreak ? "50%": "100%", borderRadius:'1%'}} className={"homepage__img_container"}><img
        style={{borderRadius:'1%'}} className={"homepage__img"} alt={"Aaron Malki"} src={require("./headshot.jpg")}/></div>


}


const NameHeading = ({mobileBreak})=>{
        const theme = useTheme();

    return (
        <div style={{width:'100%',marginTop:mobileBreak?'45px':'10px',marginBottom:'12.5px',fontFamily: "'raleway-regular', serif", fontSize:"16px", paddingTop:"12.5px", borderTop:`1px solid ${theme.palette.text.secondary}`}}>
            <StyledText style={{fontSize:"25px",fontWeight:'bold',fontFamily: "'raleway-regular', serif",color:colorScheme.primary.dark}}>
                Aaron Malki
            </StyledText>
            <StyledText style={{fontFamily: "'raleway-thin', serif",color:colorScheme.primary.primary, marginTop:"3px"}}>
                CEO, Founder
            </StyledText>
        </div>
    )

};
const HomePage = () => {
    const id = "id123";
    const inputRef = useRef();
    const mobileBreak = useMediaQuery("only screen and (max-width: 600px)");
    const tabletBreak = useMediaQuery("only screen and (max-width: 1050px)");

    const theme = useTheme();

    const [topHalf_bottomPosn, setTopHalf_bottomPosn] = useState(undefined);


    useEffect(() => {

        inputRef.current && setTopHalf_bottomPosn(inputRef.current.getBoundingClientRect().bottom);
        console.log(topHalf_bottomPosn);

    }, [inputRef.current, topHalf_bottomPosn]);

    //https://www.pluralsight.com/tech-blog/getting-size-and-position-of-an-element-in-react/
//https://stackoverflow.com/questions/32667847/get-divs-offsettop-positions-in-react
    return <div className={"homepage__container"}>
        <div id={"id123"} ref={inputRef} className={"homepage_generalInfo__container_top"}>
            <HomePageTopHalfInfo/>
            <DownArrow posnOfContainter={topHalf_bottomPosn}/>
        </div>
        <div style={{paddingTop: mobileBreak? "45px": "50px", paddingBottom: mobileBreak? "45px": "50px"}} className={"homepage_generalInfo__container_bottom"}>
        <HomePageBottomHalfInfo/>
        </div>
    </div>

};

export default HomePage;