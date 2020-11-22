import React, {useContext, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import Header from './Header';
import MainFeaturedPost from './MainFeaturedPost';
import FeaturedPost from './FeaturedPost';
import Main from './Main';
import Sidebar from './Sidebar';
import {getKeyFromSingelton} from "../../../context/useBlogPost";
import post1 from './blog-post.1.md';
import post2 from './blog-post.2.md';
import post3 from './blog-post.3.md';
import {StyledText} from "../../../components/Text";
import {AppContext} from "../../../context";
import {useLocation} from "react-router";
import ActualPost from "./ActualPost";
import {blog_states, DB_NODES_PAGES} from "../../../constants/contants";
import isObjectEmpty from "../../../components/Utility/isObjectEmpty";
import BlogSearch from "./BlogSearch";
import Splash from "../../../components/Splash/Splash";
// Color: https://encycolorpedia.com/445963
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


const getPosts = (category, filteredBlogPosts) => {
    let featured, main_featured, posts;
    if (category && !isObjectEmpty(filteredBlogPosts) && filteredBlogPosts[category]) {
        featured = filteredBlogPosts[category][blog_states.featured];
        main_featured = filteredBlogPosts[category][blog_states.main_featured];
        posts = filteredBlogPosts[category][blog_states.posts];
    } else {
        featured = {};
        main_featured = {};
        posts = {};
    }
    return {featured, main_featured, posts}
};

const categoriesActive = (filteredBlogPosts) => {
    return Object.keys(filteredBlogPosts).filter((key) => filteredBlogPosts[key] != null)
};

export default function Blog({blogUUID, category}) {
    const location = useLocation();
    const classes = useStyles();

    const [searchList, setSearchList] = useState([]);
    const [isSearching, setSearching] = useState(false);
    const [searchText, setSearchText] = useState('');

    // This is non null and equal to one of blog_categories then we are in a blog page , not a individual post
    console.log(JSON.stringify(location), 'state' in location, location.state);
    const main_page_category_key = category ? category : ((location) && ('state' in location) && (location.state) && ('category' in location.state)) ? location.state.category : null;

    const {
        filteredBlogPosts, isBlogLoaded, blogPaths, blogPostsRaw,
        pageState: {
            [DB_NODES_PAGES.settings]: {
                socialMedia
            }
        },
    } = useContext(AppContext);


    const {featured, main_featured, posts} = getPosts(main_page_category_key, filteredBlogPosts);

    const hasBlogs = () => {
        return (!isObjectEmpty(filteredBlogPosts) && filteredBlogPosts[main_page_category_key])
    };

    if (isSearching) {
        return (
            <React.Fragment>
                <CssBaseline/>
                {isBlogLoaded ?
                    <Container maxWidth="lg" style={{height: '100%', width: '100%'}}>
                        <Header searchText={searchText} setSearchText={setSearchText} isSearching={isSearching} location={location} searchResultCallback={setSearchList}
                                isFocusedCallback={setSearching}/>
                        <main>


                            <Grid container spacing={5} className={classes.mainGrid}>
                                <Grid item xs={12} md={8}>
                                    <BlogSearch searchList={searchList} searchText={searchText}/>
                                </Grid>

                                <Sidebar
                                    socialMedia={socialMedia}
                                    title={sidebar.title}
                                    description={sidebar.description}
                                    archives={sidebar.archives}
                                    social={sidebar.social}
                                />
                            </Grid>


                        </main>
                    </Container> :
                    <div style={{
                        height: '100vh',
                        width: '100vw',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <StyledText>Loading ... </StyledText>
                    </div>
                }

            </React.Fragment>
        )
    }


    return (
        <React.Fragment>
            <CssBaseline/>
            {isBlogLoaded ?
                <Container maxWidth="lg" style={{height: '100%', width: '100%'}}>
                    <Header location={location} searchResultCallback={setSearchList} isFocusedCallback={setSearching}/>
                    <main>


                        {!blogUUID && hasBlogs() &&
                        <React.Fragment>
                            <MainFeaturedPost path={blogPaths[getKeyFromSingelton(main_featured)]}
                                              post={main_featured}/>
                            <Grid container spacing={4}>
                                {Object.keys(featured).map((key) => (
                                    <FeaturedPost key={key} post={featured[key]} path={blogPaths[key]}/>
                                ))}
                            </Grid>
                        </React.Fragment>

                        }
                        <Grid container spacing={5} className={classes.mainGrid}>
                            {!blogUUID ?
                                hasBlogs() && <Main title="" posts={posts} paths={blogPaths}/>
                                :
                                <ActualPost key={blogUUID} post={blogPostsRaw[blogUUID]}/>
                            }
                            <Sidebar
                                socialMedia={socialMedia}
                                title={sidebar.title}
                                description={sidebar.description}
                                archives={sidebar.archives}
                                social={sidebar.social}
                            />
                        </Grid>


                    </main>
                </Container> : <Splash/>
            }

        </React.Fragment>
    );
}
