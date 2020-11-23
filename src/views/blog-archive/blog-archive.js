import React, {useEffect, useContext, useState} from "react";
import {AppContext} from "../../context";
import Timeline from '@material-ui/lab/Timeline';
import TimelineItem from '@material-ui/lab/TimelineItem';
import TimelineSeparator from '@material-ui/lab/TimelineSeparator';
import TimelineConnector from '@material-ui/lab/TimelineConnector';
import TimelineContent from '@material-ui/lab/TimelineContent';
import TimelineDot from '@material-ui/lab/TimelineDot';
import TimelineOppositeContent from '@material-ui/lab/TimelineOppositeContent';
import Typography from '@material-ui/core/Typography';
import {Link} from "react-router-dom";
import getFormattedMonthYear from "../../components/DateUtils/getFormattedMonthYear";
import {colorScheme} from "../../constants";
import {blog_categories_keysOnly, DB_NODES_PAGES, OG_TYPE, PUBLIC_PAGE_KEYS} from "../../constants/contants";
import SeoTags from "../../components/SeoTags/SeoTags";
import {makeStyles} from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import {getDateFromTimeStamp} from "../../components/DateUtils/getMonthYear";
import Header from "../BlogPage/components/Header";
import BlogSearch from "../BlogPage/components/BlogSearch";
import ordinalSuffix from "../../components/DateUtils/ordinalSuffix";
import Truncate from "react-truncate";
import TextTruncate from 'react-text-truncate'; // recommend
import Sidebar from "../BlogPage/components/Sidebar";
import Divider from '@material-ui/core/Divider';

//blogPaths
// Color: https://encycolorpedia.com/445963
const useStyles = makeStyles((theme) => ({

    mainroot: {
        display: "flex",
        alignContent: "center",
        alignItems: "center",
        width: '100vw',
        backgroundColor: colorScheme.other.backgroundComplementary,
        paddingBottom: theme.spacing(3)
    },
    mainGrid: {
        marginTop: theme.spacing(3),
        alignSelf: 'center',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center'
    },
    archiveTitle: {
        fontFamily: 'airbnb-bold',
        color: theme.palette.text.primary,
        paddingBottom: theme.spacing(2)
    },
    dateTitle: {
        fontSize: '25px',
        fontFamily: 'airbnb-black',
        color: theme.palette.text.secondary,
        paddingBottom: theme.spacing(1),
        marginTop: theme.spacing(1)
    },
    timelineDate: {
        fontFamily: 'airbnb-book'
    },
    timelineLink: {},
    blogDescription: {
        fontFamily: 'airbnb-light',
        color: theme.palette.text.secondary,
        width: '100%',
        display: 'flex'

    },
    timeline: {
        width: '100%'
    },
    blog_container: {
        display: 'flex',
        flexDirection: "column",
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        textAlign: 'left',
        width: '100%',
        paddingTop: 3,
        paddingLeft: theme.spacing(1),
        paddingRight: theme.spacing(2),
        paddingBottom: theme.spacing(1)
    },
    date_container: {
        display: "flex",
        maxWidth: '35px',
        minWidth: '35px',
        width: '35px',
        paddingTop: 5,
        justifyContent: 'center',
    },
    blog_date_root: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%'
    },
    blogTitleLink: {
        fontFamily: 'airbnb-medium',
        width: '100%',
        display: 'flex',
        color: '#004080'
    },
    root: {
        float: 'left',
    }
}));

const sidebar = {
    title: 'About',
    description:
        'Etiam porta sem malesuada magna mollis euismod. Cras mattis consectetur purus sit amet fermentum. Aenean lacinia bibendum nulla sed consectetur.',
    // ToDo: Limit on Archives shown.
    archives: [
        {title: 'November 2020', url: '#'},
        {title: 'October 2020', url: '#'},

    ],
    social: [
        {name: 'LinkedIn', icon: LinkedInIcon, key: "linkedin"},
        {name: 'Instagram', icon: InstagramIcon, key: "instagram"},
        {name: 'Facebook', icon: FacebookIcon, key: "facebook"},
    ],
};


const ListBlogArchive = ({monthYear, unixDateTime, sortedBlogPost, blogPaths}) => {
    const classes = useStyles();

    const getPosts = () => {
        let postList = [];
        let itEarliest = sortedBlogPost[unixDateTime].iterator();
        let earliestBlogPost = itEarliest.next();
        let it = sortedBlogPost[unixDateTime].iterator(), blogPost;
        while ((blogPost = it.prev()) !== null) {
            // do stuff with item
            postList.push(<li key={blogPost.key} className={classes.blog_date_root}>
                    <div className={classes.date_container}>
                        <Typography color="textSecondary" variant={'caption'}
                                    component={'p'}
                                    classes={{root: classes.timelineDate}}>{ordinalSuffix(blogPost.dateObj.getDate())}</Typography>
                    </div>


                    <TimelineSeparator>
                        <TimelineDot/>
                         {earliestBlogPost!==blogPost&&<TimelineConnector/>}
                    </TimelineSeparator>
                    <div className={classes.blog_container}>
                        <div className={classes.blogTitleLink}>
                            <Link style={{color:'#004080'}} to={blogPaths[blogPost.key]}>{blogPost.title}</Link>
                        </div>
                        <div className={classes.blogDescription}>
                            <Truncate lines={2} trimWhitespace ellipsis={"..."}>
                                {blogPost.description}
                            </Truncate>
                        </div>
                    </div>
                </li>
            )
        }
        return postList;

    };

    return <div className={classes.root}>
        <ul className={classes.timeline}>
            {getPosts()}


        </ul>
    </div>
};


const BlogArchive = ({location, unixDateTime}) => {

    const date = getDateFromTimeStamp(unixDateTime);
    const monthYear = getFormattedMonthYear(date);


    const classes = useStyles();

    const [searchList, setSearchList] = useState([]);
    const [isSearching, setSearching] = useState(false);
    const [searchText, setSearchText] = useState('');

    // This is non null and equal to one of blog_categories then we are in a blog page , not a individual post

    const {
        sortedBlogPost, blogPaths, blogArchivePaths,
        pageState: {
            [DB_NODES_PAGES.settings]: {
                companyName, socialMedia
            }
        },
    } = useContext(AppContext);


    return (

        <div className={classes.mainroot}>
            {/*Page content in the Google SERP Listing*/}
            <SeoTags description={`${companyName} | Blog Archive for ${monthYear}`}
                     companyName={companyName}
                     title={`${companyName} | Blog Archive ${monthYear}`}
                     path={location.pathname}
                     type={OG_TYPE.blog}
            />


            <React.Fragment>
                <CssBaseline/>
                <Container maxWidth="lg"
                           style={{height: '100%', width: '100%', display: 'flex', flexDirection: 'column'}}
                           component={'div'}>
                    <Header searchText={searchText} setSearchText={setSearchText} isSearching={isSearching}
                            location={location} searchResultCallback={setSearchList}
                            isFocusedCallback={setSearching}/>


                    <Grid container spacing={5} className={classes.mainGrid}>
                        <Grid item xs={12} md={7}>
                            {isSearching ?
                                <BlogSearch searchList={searchList} searchText={searchText}/>
                                :
                                <div style={{display: 'flex', width: '100%', flexDirection: 'column'}}>
                                    <Typography component={'h1'} variant={'h4'} className={classes.archiveTitle}>
                                        Archive
                                    </Typography>
                                    <div style={{
                                        width: '100%',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'flex-start'
                                    }}>

                                        <Typography component={'h2'} variant={'h4'} className={classes.dateTitle}>
                                            {monthYear}
                                        </Typography>
                                    </div>
                                    <Divider/>
                                    <ListBlogArchive monthYear={monthYear} blogPaths={blogPaths}
                                                     sortedBlogPost={sortedBlogPost} unixDateTime={unixDateTime}/>
                                </div>
                            }
                        </Grid>

                        <Sidebar
                            blogArchivePaths={blogArchivePaths}
                            socialMedia={socialMedia}
                            title={sidebar.title}
                            description={sidebar.description}
                            social={sidebar.social}
                        />

                    </Grid>


                </Container>
            </React.Fragment>
        </div>


    )

};


export default BlogArchive;