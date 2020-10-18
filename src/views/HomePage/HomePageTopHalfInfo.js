import React, {useContext, useEffect, useState, useRef} from "react"
import "./HomePage.scss"
import {DownArrow} from "../../components/DownArrow";
import useWindowDimensions from "./useWindowDimensions";
import {StyledText, FittedText} from "../../components/Text";
import Button from '@material-ui/core/Button';
import {colorScheme} from "../../constants";
import {pageToPathName} from "../../constants";

//"raleway-regular"
// "raleway-italic"
//"raleway-bold-italic"

const HomePageTopHalfInfo = () => {

    return <div style={{
        border: `1px solid grey`,
        height: "30vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "5px"
    }}>

        <div style={{display:"flex",justifyContent:"space-between", alignItems:"center",flexDirection: "column",height:"100%"}}>
            <div style={{maxWidth:"500px",width: "60vw", justifyContent:"center", alignItems:"center",border: `1px solid grey`}}>
                <FittedText style={{ fontFamily: "scope-one-regular"}}>
                    Malki Real Estate <br/>
                    Unparalled Success.
                </FittedText>
            </div>

                <Button size={"small"} variant="contained" href={pageToPathName["CurrentListingsPage"]}
                        style={{
                    border: `2px solid ${colorScheme.primary.light}`,
                    color: colorScheme.primary.dark,
                    bottom: 0,
                    position:"relative",
                    marginTop: "40px",
                    fontFamily: "airbnb-book",
                }}>
                    View Our Open Homes
                </Button>

        </div>
    </div>
};


export default HomePageTopHalfInfo;