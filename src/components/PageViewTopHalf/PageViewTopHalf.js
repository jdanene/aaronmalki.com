import React, { useEffect, useState, useRef} from "react"
import "./HomePage.scss"
import {DownArrow} from "../../components/DownArrow";
import {FittedText} from "../../components/Text";
import {useMediaQuery} from "@material-ui/core";
import {makeStyles} from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import parseMultiPartTextToArray from "../Utility/parseMultiPartTextToArray";
import BuyerTopImg from "resources/images/buyerpage_top.png"
import clsx from "clsx";
import {DB_MULTIPART_TEXT_KEY} from "../../constants/contants";

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        flexDirection: 'column',
        backgroundPosition: "top center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",

    },
    info: {
        //border: 1px solid red;
        width: "100%",

        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
    }
}));

//"raleway-regular"
// "raleway-italic"
//"raleway-bold-italic"
//Buying a home, the easy way.
const Page_View_Top_Half = ({text, text2,titleArray}) => {

    return <div style={{
        minHeight: "200px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "5px",

       width: "100%"
    }}>

        <div style={{
            bottom: 0,
            position: "relative",
            display: "flex",
            width:'100%',

            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            height: "100%",
        }}>
            <div style={{
                maxWidth: "500px",
                width: "60%",
                justifyContent: "center",
                alignItems: "center"
            }}>
                <FittedText style={{fontFamily: "airbnb-bold", display: "flex"}}>
                    {titleArray.map((val, idx) => {
                        if (!(idx===titleArray.length-1)) {
                            return <React.Fragment key={idx}>
                                {val} <br/>
                            </React.Fragment>
                        }
                        else {
                            return <React.Fragment key={idx}>
                                {val}
                            </React.Fragment>
                        }
                    })}
                </FittedText>
            </div>

        </div>
    </div>
};


const PageViewTopHalf = ({className,pageTitle}) => {
    const inputRef = useRef();
    const mobileBreak = useMediaQuery("only screen and (max-width: 600px)");

    const classes = useStyles();

    const [topHalf_bottomPosn, setTopHalf_bottomPosn] = useState(undefined);

    const titleArray = parseMultiPartTextToArray(pageTitle);

    useEffect(() => {


        inputRef.current && setTopHalf_bottomPosn(inputRef.current.getBoundingClientRect().bottom);
        console.log(topHalf_bottomPosn);

    }, [inputRef.current, topHalf_bottomPosn]);

    //https://www.pluralsight.com/tech-blog/getting-size-and-position-of-an-element-in-react/
//https://stackoverflow.com/questions/32667847/get-divs-offsettop-positions-in-react
    return <div
        className={className}
    >
        <div ref={inputRef} style={{
            height: mobileBreak ? '60vh' : '100vh',
            minHeight: !mobileBreak && '500px', width:'100%',
        }}
             className={classes.info}>
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'space-between',
                width:'100%',
            }}>
                <Page_View_Top_Half mobileBreak={mobileBreak} titleArray={titleArray}/>
                {!mobileBreak && <DownArrow posnOfContainter={topHalf_bottomPosn}/>}
            </div>
        </div>

    </div>

};
//DB_MULTIPART_TEXT_KEY
PageViewTopHalf.propTypes = {
    pageTitle: PropTypes.shape({
        [DB_MULTIPART_TEXT_KEY.value]:PropTypes.string,
        [DB_MULTIPART_TEXT_KEY.secondaryValues]: PropTypes.array
    }),
    className: PropTypes.string.isRequired

};




export default PageViewTopHalf;