import React, {useContext, useEffect, useState, useRef, Suspense} from "react"
import "./HomePage.scss"
import {useMediaQuery} from "@material-ui/core";
import {StyledText} from "../../components/Text";
import {useTheme} from '@material-ui/core/styles';
import {colorScheme} from "../../constants";
import {LinkedIn} from "@material-ui/icons";
import {IconButton} from "@material-ui/core";
import {makeStyles} from '@material-ui/core/styles';
import Link from "@material-ui/core/Link";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import parseMultiPartTextToArray from "../../components/Utility/parseMultiPartTextToArray";

const useStyles = makeStyles((theme) => ({

    icon_container: {
        "&:hover": {
            //you want this to be the same as the backgroundColor above
            backgroundColor: "rgba(112, 134, 144,.15)",
            boxShadow: '0 1.5px 3.5px rgba(0,0,0,0.12), 0 1.5px 2.5px rgba(0,0,0,0.24)'

        },

        //you want this to be the same as the backgroundColor above
        color: "#0e76a8",
        backgroundColor: "rgba(112, 134, 144,.1)",
        boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)'

    },

    icon: {
        "&:hover": {
            //you want this to be the same as the backgroundColor above
            backgroundColor: "transparent",
        },
        backgroundColor: "transparent",
        position: "absolute",
        top: 7.9,
        left: 7.9
    }


}));


function ProfilePicture({mobileBreak, profilePic}) {

    return <div style={{width: mobileBreak ? "100%" : "48%", height: mobileBreak ? "50%" : "100%", borderRadius: '1%'}}
                className={"homepage__img_container"}><img
        style={{borderRadius: '1%'}} className={"homepage__img"} alt={"Aaron Malki"} src={profilePic}/>
    </div>

}


const NameHeading = ({mobileBreak, linkedin, professionalTitle}) => {

    const theme = useTheme();
    const classes = useStyles();
    const preventDefault = event => event.preventDefault();

    const handleLinkedin = () => {
        // https://www.linkedin.com/in/aaron-malki-761b3165/
    };
    return (
        <div style={{
            flexDirection: "column",
            display: "flex",

            width: '100%',
            marginTop: mobileBreak ? '45px' : '0px',
            marginBottom: '12.5px',
            fontFamily: "'raleway-regular', serif",
            fontSize: "16px",
            paddingTop: mobileBreak ? "12.5px" : "0px",
            borderTop: `1px solid rgba(27, 48, 57,${mobileBreak ? ".25" : "0"})`,
            paddingBottom: "12.5px",
            borderBottom: `1px solid rgba(27, 48, 57,${mobileBreak ? "0" : ".25"})`
        }}>
            <div style={{display: "flex", justifyContent: "space-between", width: "100%"}}>
                <StyledText style={{
                    display: "flex",
                    fontSize: "25px",
                    fontWeight: 'bold',
                    fontFamily: "'raleway-regular', serif",
                    color: colorScheme.primary.dark,
                    alignItems: 'flex-start',
                }}>
                    Aaron Malki
                </StyledText>

                <Link href={linkedin}>
                    <Avatar className={classes.icon_container}>
                        <div style={{backgroundColor: "white", height: "17.5px", width: "16.3px"}}>
                            <LinkedIn className={classes.icon}
                                      href={linkedin}/>
                        </div>
                    </Avatar>
                </Link>
            </div>

            <div style={{
                display: "flex",
                fontFamily: "'raleway-thin', serif",
                color: colorScheme.primary.primary,
                marginTop: "0px",
                justifyContent: "space-between",
                alignItems: 'flex-start'

            }}>
                <StyledText /*style={{border: "1px solid black" }}*/>
                    {professionalTitle}
                </StyledText>


            </div>

        </div>
    )

};


const getBoldText = (text) => {
    let pat = /^(?<part1>.*):(?<part2>.*)$/;
    const {groups: {part1, part2}} = pat.exec(text);
    return (
        <React.Fragment>
            <b>{part1}:</b>{part2}
        </React.Fragment>
    )
};

const HomePageBottomHalfInfo = ({profilePic, professionalTitle, aboutMe, linkedin}) => {
    const inputRef = useRef();
    const mobileBreak = useMediaQuery("only screen and (max-width: 600px)");
    const tabletBreak = useMediaQuery("only screen and (max-width: 1050px)");
    const aboutMeTextArray = parseMultiPartTextToArray(aboutMe);
    const [topHalf_bottomPosn, setTopHalf_bottomPosn] = useState(undefined);


    useEffect(() => {

        inputRef.current && setTopHalf_bottomPosn(inputRef.current.getBoundingClientRect().bottom);
        console.log(topHalf_bottomPosn);

    }, [inputRef.current, topHalf_bottomPosn]);

    //https://www.pluralsight.com/tech-blog/getting-size-and-position-of-an-element-in-react/
//https://stackoverflow.com/questions/32667847/get-divs-offsettop-positions-in-react
    return <div style={{
        width: mobileBreak ? "95%" : (tabletBreak ? "90%" : "90%"),
        display: "flex",
        justifyContent: 'space-between',
        flexDirection: mobileBreak ? "column-reverse" : "row",


    }}>
        <div style={{
            width: mobileBreak ? "100%" : "48%",
            color: colorScheme.text.secondary,
            fontFamily: "'airbnb-book', serif",
            fontSize: "16px",
            alignSelf: "flex-start",

            textAlign: "left"
        }}>
            {!mobileBreak &&
            <NameHeading mobileBreak={mobileBreak} linkedin={linkedin} professionalTitle={professionalTitle}/>}
            <StyledText mode={"multi"}>

                {aboutMeTextArray.map((val, idx) => {
                    if (idx === 0) {
                        return <React.Fragment key={idx}>
                            {val}
                            <br/> <br/>
                        </React.Fragment>
                    } else {
                        return <React.Fragment key={idx}>
                            {getBoldText(val)} <br/>
                        </React.Fragment>
                    }
                })}

            </StyledText>
        </div>
        {mobileBreak &&
        <NameHeading mobileBreak={mobileBreak} linkedin={linkedin} professionalTitle={professionalTitle}/>}
        <ProfilePicture mobileBreak={mobileBreak} profilePic={profilePic}/>
    </div>

};

export default HomePageBottomHalfInfo;