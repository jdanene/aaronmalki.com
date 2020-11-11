import React, {useContext, useEffect, useState} from "react"
import ImageCarousel from "./components/ImageCarousel/ImageCarousel";
import BorderGuard from "../../components/BorderGuard/BorderGuard";
import Grid from "@material-ui/core/Grid";
import {useMediaQuery} from "@material-ui/core";
import {makeStyles} from '@material-ui/core/styles';
import LeaseTopImg from "resources/images/leasePage/leasingpagepic1.png"
import {colorScheme} from "../../constants";
import PageViewTopHalf from "../../components/PageViewTopHalf/PageViewTopHalf";
import TextBlurbWithTitle from "../../components/TextBlurbWithTitle/TextBlurbWithTitle";
import TextBlurbWithTitleLevel2 from "../../components/TextBlurbWithTitle/TextBlurbWithTitleLevel2";
import LeaseForm from "./LeaseForm";

const useStyles = makeStyles((theme) => ({
    formPlug: {
        fontFamily: 'airbnb-bold',
        fontSize: 23,
        marginTop: theme.spacing(6),
        marginBottom: theme.spacing(2)
    },
    topHalfImg: {
        background: `linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ), url(${LeaseTopImg})`,
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
        display: 'flex',
        alignContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        padding: theme.spacing(5),
    },
        imgTextContainer:{
        marginBottom:theme.spacing(3),
    }
}));

const TITLE_0 = "Looking to Lease?";
const BLURB_0 ="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum eleifend velit tortor, vitae mollis massa pharetra ut. Maecenas eget facilisis magna, vitae facilisis est. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Aenean nec sapien non velit convallis sagittis. Sed lectus ex, eleifend ";



const BLURB_1 = "No sweat! Finding a place you call home can be a daunting task. San Francisco is one of the hottest rental markets (if not the hottest) in the country. With so many moving parts, it can be overwhelming trying to find the perfect fit. Luckily, I have an extensive list of available apartments right at my finger tips.";
const TITLE_1 = "Not looking to buy just yet?";

const BLURB_2 = "Asking these questions before you begin your search can be very helpful: Where do I want to move? What’s my realistic budget? Do I need a studio or a 1 bedroom? And what’s the deal with rent control?! How early should I begin my search? There are so many questions to be had! That’s why I’m here to help guide you through your search.";
const TITLE_2 = "Where do I begin?";

const BLURB_3 ="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum eleifend velit tortor, vitae mollis massa pharetra ut. Maecenas eget facilisis magna, vitae facilisis est. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Aenean nec sapien non velit convallis sagittis. Sed lectus ex, eleifend ";


const LeasePage = () => {
    const mobileBreak = useMediaQuery("only screen and (max-width: 960px)");
    const classes = useStyles();

    return <div className={classes.root}>
        <PageViewTopHalf middleText={'Stress free leasing.'} className={classes.topHalfImg} img={LeaseTopImg}/>
        <div className={classes.body}>
            <Grid className={classes.imgTextContainer} container spacing={mobileBreak ? 3 : 4}>
                <Grid sm={12} md={6} item>
                   <div style={{display:'flex',flexDirection:'column'}}>
                    <ImageCarousel/>
                    {!mobileBreak&&<TextBlurbWithTitle blurb={BLURB_2} title={TITLE_2} smallTitle alignLeft />}
                   </div>
                </Grid>
                <Grid sm={12} md={6} item>
                    <TextBlurbWithTitleLevel2 mainBlurb={BLURB_0} mainTitle={TITLE_0} secondaryBlurb={BLURB_1} secondaryTitle={TITLE_1} secondaryBlurb_p2={BLURB_3}/>
                </Grid>
                {mobileBreak &&<Grid sm={12} md={6} item>
                    <TextBlurbWithTitle blurb={BLURB_2} title={TITLE_2} smallTitle alignLeft/>
                </Grid>}
            </Grid>
            <LeaseForm/>
        </div>
    </div>

};

export default LeasePage;