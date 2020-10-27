import React,{useState,useEffect} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import GitHubIcon from '@material-ui/icons/GitHub';
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import Header from './Header';
import MainFeaturedPost from './MainFeaturedPost';
import FeaturedPost from './FeaturedPost';
import Main from './Main';
import Sidebar from './Sidebar';
import useBlogPosts from "../../../context/useBlogPost";
import post1 from './blog-post.1.md';
import post2 from './blog-post.2.md';
import post3 from './blog-post.3.md';
import {StyledText} from "../../../components/Text";
import {getKeyFromSingelton} from "../../../context/useBlogPost";

const useStyles = makeStyles((theme) => ({
    mainGrid: {
        marginTop: theme.spacing(3),
    },
}));

const sections = [
    {title: 'Technology', url: '#'},
    {title: 'Design', url: '#'},
    {title: 'Culture', url: '#'},
    {title: 'Business', url: '#'},
    {title: 'Politics', url: '#'},
    {title: 'Opinion', url: '#'},
    {title: 'Science', url: '#'},
    {title: 'Health', url: '#'},
    {title: 'Style', url: '#'},
    {title: 'Travel', url: '#'},
];

const mainFeaturedPost = {
    title: 'Title of a longer featured blog post',
    description:
        "Multiple lines of text that form the lede, informing new readers quickly and efficiently about what's most interesting in this post's contents.",
    image: 'https://source.unsplash.com/random',
    imageText: 'main image description',
    linkText: 'Continue reading…',
};

const featuredPosts = [
    {
        title: 'Featured post',
        date: 'Nov 12',
        description:
            'This is a wider card with supporting text below as a natural lead-in to additional content.',
        image: 'https://source.unsplash.com/random',
        imageText: 'Image Text',
    },
    {
        title: 'Post title',
        date: 'Nov 11',
        description:
            'This is a wider card with supporting text below as a natural lead-in to additional content.',
        image: 'https://source.unsplash.com/random',
        imageText: 'Image Text',
    },
];

const posts = [post1, post2, post3];

const sidebar = {
    title: 'About',
    description:
        'Etiam porta sem malesuada magna mollis euismod. Cras mattis consectetur purus sit amet fermentum. Aenean lacinia bibendum nulla sed consectetur.',
    archives: [
        {title: 'March 2020', url: '#'},
        {title: 'February 2020', url: '#'},
        {title: 'January 2020', url: '#'},
        {title: 'November 1999', url: '#'},
        {title: 'October 1999', url: '#'},
        {title: 'September 1999', url: '#'},
        {title: 'August 1999', url: '#'},
        {title: 'July 1999', url: '#'},
        {title: 'June 1999', url: '#'},
        {title: 'May 1999', url: '#'},
        {title: 'April 1999', url: '#'},
    ],
    social: [
        {name: 'GitHub', icon: GitHubIcon},
        {name: 'Twitter', icon: TwitterIcon},
        {name: 'Facebook', icon: FacebookIcon},
    ],
};

export default function Blog() {
    const [mdFiles, setMdFiles] = useState();
    const classes = useStyles();
    const {featured,main_featured, posts, isLoaded} = useBlogPosts();



    useEffect(()=>{console.log(mdFiles)},[mdFiles])
    return (
        <React.Fragment>
            <CssBaseline/>
            {isLoaded?
            <Container maxWidth="lg" style={{height: '100%', width: '100%'}}>
                <Header title="Blog" sections={sections}/>
                <main>
                    <MainFeaturedPost post={main_featured}/>
                    <Grid container spacing={4}>
                        {Object.keys(featured).map((key) => (
                            <FeaturedPost key={key} post={featured[key]}/>
                        ))}
                    </Grid>
                    <Grid container spacing={5} className={classes.mainGrid}>
                        <Main title="From the firehose" posts={posts}/>
                        <Sidebar
                            title={sidebar.title}
                            description={sidebar.description}
                            archives={sidebar.archives}
                            social={sidebar.social}
                        />
                    </Grid>
                </main>
            </Container>:
                <StyledText>Loading ... </StyledText>
            }

        </React.Fragment>
    );
}