import React, {useContext, useEffect, useState} from "react"
import BuyerForm from "./components/BuyerForm/BuyerForm";
import {colorScheme, pageToPathName} from "../../constants";
import BuyerImageAndDescription from "./components/BuyerImageAndDescription/BuyerImageAndDescription";
import {makeStyles} from '@material-ui/core/styles';
import PageViewTopHalf from "../../components/PageViewTopHalf/PageViewTopHalf";
import FormPlug from "../../components/Forms/FormPlug";
import {AppContext} from "../../context";
import {DB_NODES_PAGES,PUBLIC_PAGE_KEYS} from "../../constants/contants";
import {Helmet} from 'react-helmet'
import SeoTags from "../../components/SeoTags/SeoTags";

const useStyles = makeStyles((theme) => ({
    formPlug: {
        fontFamily: 'airbnb-bold',
        fontSize: 23,
        marginTop: theme.spacing(6),
        marginBottom: theme.spacing(2)
    },
    topHalf_container: props => {
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
}));


const BuyersPage = ({location}) => {
    const {
        pageState: {
            [DB_NODES_PAGES.buyersPage]: {
                backgroundPic, formHeading, leftParagraph, leftPicture, leftTitle, pageTitle, rightParagraph, rightPicture, rightTitle
            },
            [DB_NODES_PAGES.settings]: {
                companyName,
                seo: {
                    [PUBLIC_PAGE_KEYS.BuyersPage]:{
                        title: googleSerpTitle,
                        description: googleSerpDescription
                    }
                }
            }
        },
    } = useContext(AppContext);

    const classes = useStyles({backgroundPic: backgroundPic});

    return <div style={{
        display: "flex",
        flexDirection: "column",
        width: '100%',
        height: '100%',
        alignContent: "center",
        alignItems: "center",
        backgroundColor: colorScheme.other.backgroundComplementary
    }}>
        {/*Page content in the Google SERP Listing*/}
        <Helmet>
            <title>{googleSerpTitle}</title>
            <meta name="description"
                  content={googleSerpDescription}/>
        </Helmet>

        <SeoTags description={googleSerpDescription}
                 companyName={companyName}
                 title={googleSerpTitle}
                 path={pageToPathName.BuyersPage}

        />
        <PageViewTopHalf pageTitle={pageTitle} className={classes.topHalf_container}/>


        <div style={{
            marginTop: '45px',
            marginBottom: '45px',
            display: 'flex',
            width: "90%",
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column'
        }}>
            <BuyerImageAndDescription
                leftParagraph={leftParagraph}
                leftPicture={leftPicture}
                leftTitle={leftTitle}
                rightParagraph={rightParagraph}
                rightPicture={rightPicture}
                rightTitle={rightTitle}
            />
            <FormPlug message={formHeading} style={{marginTop: "55px"}} />
            <BuyerForm/>
        </div>
    </div>

};

export default BuyersPage;