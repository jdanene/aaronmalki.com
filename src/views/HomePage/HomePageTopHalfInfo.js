import React from "react"
import "./HomePage.scss"
import {FittedText} from "../../components/Text";
import parseMultiPartTextToArray from "../../components/Utility/parseMultiPartTextToArray";
//"raleway-regular"
// "raleway-italic"
//"raleway-bold-italic"


const HomePageTopHalfInfo = ({pageTitle}) => {


    const titleArray = parseMultiPartTextToArray(pageTitle);
    return <div style={{
        minHeight: "200px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "5px",
        width: "100%"
    }}>

        <div style={{
            bottom: 0,
            width: "100%",
            position: "relative",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexDirection: "column",
            height: "100%"
        }}>
            <div style={{
                maxWidth: "500px",
                width: "60%",
                justifyContent: "center",
                alignItems: "center",/*border: `1px solid grey`*/
            }}>
                <FittedText style={{fontFamily: "airbnb-bold", display: "flex"}}>
                    {titleArray.map((val, idx) => {
                        if (idx === titleArray.length - 1) {
                            return <React.Fragment key={idx}>
                                {val}
                            </React.Fragment>
                        } else {
                            return <React.Fragment key={idx}>
                                {val} <br/>
                            </React.Fragment>
                        }
                    })}
                </FittedText>
            </div>

            {/*<Button size={"small"} variant="contained" href={pageToPathName["CurrentListingsPage"]}
                        style={{
                    border: `2px solid ${colorScheme.primary.light}`,
                    color: colorScheme.primary.dark,
                    bottom: 0,
                    position:"relative",
                    marginTop: "40px",
                    fontFamily: "airbnb-book",

                }}>
                    View Our Open Homes
                </Button>*/}

        </div>
    </div>
};


export default HomePageTopHalfInfo;