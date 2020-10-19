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

function ProfilePicture({mobileBreak}) {

    return <div style={{width: mobileBreak ? "100%" : "49%", height: mobileBreak ? "50%" : "100%", borderRadius: '1%'}}
                className={"homepage__img_container"}><img
        style={{borderRadius: '1%'}} className={"homepage__img"} alt={"Aaron Malki"} src={require("./headshot.jpg")}/>
    </div>


}


const useStyles = makeStyles({
    icon_container: {

            //you want this to be the same as the backgroundColor above
            color: "#0e76a8",
            backgroundColor: "rgba(112, 134, 144,.1)",
            border: ".1px solid rgba(0,0,0,.1)",
            boxShadow: "1.3px 1.3px rgba(0,0,0,.05)"

    },

    icon: {
        "&:hover": {
            //you want this to be the same as the backgroundColor above
            backgroundColor: "transparent",
        },
        backgroundColor: "transparent",
        position: "absolute",
        top:6.9,
        left:7.6
    }

});


const NameHeading = ({mobileBreak}) => {
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
            paddingTop:mobileBreak? "12.5px":"0px",
            borderTop: `1px solid rgba(27, 48, 57,${mobileBreak? ".25":"0"})`,
            paddingBottom: "12.5px",
            borderBottom:  `1px solid rgba(27, 48, 57,${mobileBreak? "0":".25"})`
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

                <Link href={"https://www.linkedin.com/in/aaron-malki-761b3165/"}>
                    <Avatar className={classes.icon_container}>
                        <div style={{backgroundColor: "white",height:"17.5px", width:"16.3px" }}>
                        <LinkedIn className={classes.icon}
                                  href={"https://www.linkedin.com/in/aaron-malki-761b3165/"}/>
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
                    CEO, Founder
                </StyledText>


            </div>

        </div>
    )

};
const HomePageBottomHalfInfo = () => {
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
    return <div style={{
        width: mobileBreak ? "95%" : (tabletBreak ? "90%" : "75%"),
        display: "flex",
        justifyContent: 'space-between',
        flexDirection: mobileBreak ? "column-reverse" : "row",

    }}>
        <div style={{
            width: mobileBreak ? "100%" : "49%",
            color: theme.palette.text.primary,
            fontFamily: "'scope-one-regular', serif",
            fontSize: "16px",
            alignSelf: "flex-start"
        }}>
            {!mobileBreak && <NameHeading mobileBreak={mobileBreak}/>}
            <StyledText mode={"multi"}>
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque
                laudantium,
                totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae
                dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut
                fugit,
                sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro
                quisquam
                est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam
                eius
                modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima
                veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea
                commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam
                nihil
                molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?
            </StyledText>
        </div>
        {mobileBreak && <NameHeading mobileBreak={mobileBreak}/>}
        <ProfilePicture mobileBreak={mobileBreak}/>
    </div>

};

export default HomePageBottomHalfInfo;