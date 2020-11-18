import React, {useContext, useEffect, useState, useRef} from "react"
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
import {useTheme} from '@material-ui/core/styles';
import {useWindowSize} from "../../components/useWindowSize";
import {colorScheme, pageToPathName} from "../../constants";
import HomePageBottomHalfInfo from "./HomePageBottomHalfInfo";
import CssBaseline from '@material-ui/core/CssBaseline';
import {AppContext} from "../../context";
import {DB_NODES_PAGES, PUBLIC_PAGE_KEYS} from "../../constants/contants";
import {makeStyles} from '@material-ui/core/styles';
import SeoTags from "../../components/SeoTags/SeoTags";

function ProfilePicture({mobileBreak}) {

    return <div style={{width: mobileBreak ? "100%" : "49%", height: mobileBreak ? "50%" : "100%", borderRadius: '1%'}}
                className={"homepage__img_container"}><img
        style={{borderRadius: '1%'}} className={"homepage__img"} alt={"Aaron Malki"} src={require("./headshot.jpg")}/>
    </div>


}


const initial = {
    "homePage": {
        "backgroundPic": "https://picsum.photos/seed/picsum/400/400",
        "profilePic": "https://picsum.photos/seed/picsum/400/400",
        "professionalTitle": "Bitch",
        "aboutMe": {
            "value": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam eleifend felis et efficitur vehicula. Vivamus eget est vitae ex mattis aliquet vitae eu ipsum. Nulla sed urna purus. Morbi eu turpis non mauris vestibulum ullamcorper in sed nunc. Duis ut nisi est. Morbi quis efficitur nisi. Etiam libero neque, auctor at congue auctor, blandit non orci. Duis feugiat facilisis libero, ac aliquet libero congue condimentum. Proin volutpat est at nisi sollicitudin consequat. Cras facilisis pharetra finibus. Nullam aliquam in mi et lobortis. Suspendisse at ullamcorper libero. Phasellus aliquet quam tincidunt arcu finibus, quis aliquam nisi imperdiet.",
            "secondaryValues": {"1": "Favorite Resturaunt: Penis Head"}
        },
        "pageTitle": {"value": "Malki Real Estate", "secondaryValues": {"1": "Welcome Home"}}
    }
};


// Based on: https://stackoverflow.com/questions/56111294/how-to-use-theme-and-props-in-makestyles
const useStyles = makeStyles((theme) => ({
    topHalf_container: props => ({
        //border: 1px solid red;
        width: "100%",
        background: `linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ), url(${props.backgroundPic})`,
        backgroundPosition: "top center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
    }),
}));


const HomePage = ({location}) => {
    const inputRef = useRef();
    const mobileBreak = useMediaQuery("only screen and (max-width: 600px)");
    const [topHalf_bottomPosn, setTopHalf_bottomPosn] = useState(undefined);


    const {
        pageState: {
            [DB_NODES_PAGES.homePage]: {
                backgroundPic, profilePic, professionalTitle, aboutMe, pageTitle
            },
            [DB_NODES_PAGES.settings]: {
                socialMedia: {
                    linkedin
                },
                companyName,
                seo: {
                    [PUBLIC_PAGE_KEYS.HomePage]: {
                        title: googleSerpTitle,
                        description: googleSerpDescription
                    }
                }
            }
        },

    } = useContext(AppContext);


    const classes = useStyles({backgroundPic});

    useEffect(() => {

        inputRef.current && setTopHalf_bottomPosn(inputRef.current.getBoundingClientRect().bottom);
        console.log(topHalf_bottomPosn);

    }, [inputRef.current, topHalf_bottomPosn]);


    //https://www.pluralsight.com/tech-blog/getting-size-and-position-of-an-element-in-react/
//https://stackoverflow.com/questions/32667847/get-divs-offsettop-positions-in-react
    return <div className={"homepage__container"}>
        <CssBaseline/>
        {/*Page content in the Google SERP Listing*/}
        <SeoTags description={googleSerpDescription}
                 companyName={companyName}
                 title={googleSerpTitle}
                 path={pageToPathName.HomePage}

        />

        <div id={"id123"} ref={inputRef}
             style={{height: mobileBreak ? '60vh' : '110vh', minHeight: !mobileBreak && '500px'}}
             className={classes.topHalf_container}>
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: '100%'
            }}>
                <HomePageTopHalfInfo mobileBreak={mobileBreak}
                                     pageTitle={pageTitle}/>
                {!mobileBreak && <DownArrow posnOfContainter={topHalf_bottomPosn}/>}
            </div>
        </div>
        <div style={{
            border: '0',
            paddingTop: mobileBreak ? "45px" : "50px",
            paddingBottom: mobileBreak ? "45px" : "50px",
            backgroundColor: colorScheme.other.backgroundComplementary
        }} className={"homepage_generalInfo__container_bottom"}>
            <HomePageBottomHalfInfo profilePic={profilePic} professionalTitle={professionalTitle} aboutMe={aboutMe}
                                    linkedin={linkedin}/>
        </div>
    </div>

};

export default HomePage;