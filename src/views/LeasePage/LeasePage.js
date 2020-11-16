import React, {useContext, useEffect, useState} from "react"
import ImageCarousel from "./components/ImageCarousel/ImageCarousel";
import Grid from "@material-ui/core/Grid";
import {useMediaQuery} from "@material-ui/core";
import {makeStyles} from '@material-ui/core/styles';
import LeaseTopImg from "resources/images/leasePage/leasingpagepic1.png"
import {colorScheme} from "../../constants";
import PageViewTopHalf from "../../components/PageViewTopHalf/PageViewTopHalf";
import TextBlurbWithTitle from "../../components/TextBlurbWithTitle/TextBlurbWithTitle";
import TextBlurbWithTitleLevel2 from "../../components/TextBlurbWithTitle/TextBlurbWithTitleLevel2";
import LeaseForm from "./LeaseForm";
import FormPlug from "../../components/Forms/FormPlug";
import {AppContext} from "../../context";
import {DB_NODES_PAGES} from "../../constants/contants";
import parseMultiPartTextToArray from "../../components/Utility/parseMultiPartTextToArray";

const useStyles = makeStyles((theme) => ({
    formPlug: {
        fontFamily: 'airbnb-bold',
        fontSize: 23,
        marginTop: theme.spacing(6),
        marginBottom: theme.spacing(2)
    },
    topHalfImg: props => {
        return {
            //border: 1px solid red;
            background: `linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ), url(${props.backgroundPic})`,
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            flexDirection: 'column',
            backgroundPosition: "top center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
        }
    },
    root: {
        width: '100%',
        height: '100%',

        display: "flex",
        alignContent: "center",
        alignItems: "center",
        flexDirection: 'column',
        backgroundColor: colorScheme.other.backgroundComplementary

    },
    body: {
        width:'100%',
        flexGrow:1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
                paddingLeft:theme.spacing(3),
        paddingRight:theme.spacing(3),
        marginTop: theme.spacing(5),
        marginBottom: theme.spacing(5),

    },
        imgTextContainer:{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom:theme.spacing(3),
    }
}));

const LeasePage = () => {
    const mobileBreak = useMediaQuery("only screen and (max-width: 960px)");
    const {
        pageState: {
            [DB_NODES_PAGES.leasePage]: {
                pageTitle, backgroundPic, imageCarousel, mainRightTitle, mainRightParagraph, secondaryRightTitle, secondaryRightParagraph, mainLeftTitle, mainLeftParagraph, formHeading
            }
        },
    } = useContext(AppContext);
    const classes = useStyles({backgroundPic});

     const mainRightParagraphArray = parseMultiPartTextToArray(mainRightParagraph);
     const secondaryRightParagraphArray = parseMultiPartTextToArray(secondaryRightParagraph);

     const mainLeftParagraphArray = parseMultiPartTextToArray(mainLeftParagraph);

    return <div className={classes.root}>
        <PageViewTopHalf pageTitle={pageTitle}  className={classes.topHalfImg}/>
        <div className={classes.body}>
            <Grid className={classes.imgTextContainer} container justify={'center'} alignItems={'center'} spacing={mobileBreak ? 3 : 4}>
                <Grid sm={12} md={6} item justify={'center'} alignItems={'center'}>
                    <div style={{display:'flex',flexDirection:'column', justifyContent:'center', alignItems:'center'}}>
                    <ImageCarousel imgArray={imageCarousel}/>
                    {!mobileBreak&&<TextBlurbWithTitle paragraphArray={mainLeftParagraphArray} title={mainLeftTitle} smallTitle alignLeft />}
                   </div>
                </Grid>


                <Grid sm={12} md={6} item justify={'center'} alignItems={'center'}>
                    <TextBlurbWithTitleLevel2 mainBlurbArray={mainRightParagraphArray} mainTitle={mainRightTitle} secondaryBlurbArray={secondaryRightParagraphArray} secondaryTitle={secondaryRightTitle}/>
                </Grid>
                {mobileBreak &&<Grid sm={12} md={6} item justify={'center'} alignItems={'center'}>
                    <TextBlurbWithTitle paragraphArray={mainLeftParagraphArray} title={mainLeftTitle} smallTitle alignLeft/>
                </Grid>}
            </Grid>
            <FormPlug message={formHeading}/>
            <LeaseForm/>
        </div>
    </div>

};

export default LeasePage;