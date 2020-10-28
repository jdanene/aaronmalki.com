import React, {useState, useEffect, useContext} from 'react';
import {AppContext} from "./index";
import {blog_states} from "../constants/contants";
import {v4 as uuidv4} from 'uuid';
import {  blog_categories} from "../constants/contants";
import getRandomValueFromObject from "../components/Utility/getRandomValueFromObject";
import {pageToPathName} from "../constants/contants";
import isObjectEmpty from "../components/Utility/isObjectEmpty";
// path -> blog/{category}/{name}
let blog1 = {
    state: blog_states.posts,
    category: blog_categories.news,
    title: 'blog1',
    image: 'https://source.unsplash.com/random',
    description: "Covid rebound in the works for SF",
    date: new Date().toDateString(),
    content: `
# Sample blog post

#### April 1, 2020 by [Olivier](/)

This blog post shows a few different types of content that are supported and styled with
Material styles. Basic typography, images, and code are all supported.
You can extend these by modifying  \`Markdown.js\`.

Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum.
Sed posuere consectetur est at lobortis. Cras mattis consectetur purus sit amet fermentum.

Curabitur blandit tempus porttitor. **Nullam quis risus eget urna mollis** ornare vel eu leo.
Nullam id dolor id nibh ultricies vehicula ut id elit.

Etiam porta sem malesuada magna mollis euismod. Cras mattis consectetur purus sit amet fermentum.
Aenean lacinia bibendum nulla sed consectetur.

## Heading

Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.
Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit.
Morbi leo risus, porta ac consectetur ac, vestibulum at eros.

### Sub-heading

Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.

### Sub-heading

Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
Aenean lacinia bibendum nulla sed consectetur. Etiam porta sem malesuada magna mollis euismod.
Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo
sit amet risus.

- Praesent commodo cursus magna, vel scelerisque nisl consectetur et.
- Donec id elit non mi porta gravida at eget metus.
- Nulla vitae elit libero, a pharetra augue.

Donec ullamcorper nulla non metus auctor fringilla. Nulla vitae elit libero, a pharetra augue.

1.  Vestibulum id ligula porta felis euismod semper.
2.  Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
3.  Maecenas sed diam eget risus varius blandit sit amet non magna.

Cras mattis consectetur purus sit amet fermentum. Sed posuere consectetur est at lobortis.
    `
};

let blog2 = {
    state: blog_states.posts,
    category: blog_categories.lifestyle,
    title: 'blog2',
    image: 'https://source.unsplash.com/random',

    description: "Work life balance when working from home",
    date: new Date(2020, 12, 12).toDateString(),
    content: `
# Another blog post

#### March 23, 2020 by [Matt](/)

Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum.
Sed posuere consectetur est at lobortis. Cras mattis consectetur purus sit amet fermentum.

Curabitur blandit tempus porttitor. **Nullam quis risus eget urna mollis** ornare vel eu leo.
Nullam id dolor id nibh ultricies vehicula ut id elit.
<img src="https://octodex.github.com/images/yaktocat.png" width="200" height="200" />
Etiam porta sem malesuada magna mollis euismod. Cras mattis consectetur purus sit amet fermentum.
Aenean lacinia bibendum nulla sed consectetur.

Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.
Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit.
Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
    `
};

let blog3 = {
    state: blog_states.posts,
    category: blog_categories.rental_guide,
    title: 'blog3',
    image: 'https://source.unsplash.com/random',

    description: "Renter Do's and Don't: How to screen candidates",
    date: new Date(2020, 8, 30).toDateString(),
    content: `
# New feature

#### March 14, 2020 by [Tom](/)

Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
Aenean lacinia bibendum nulla sed consectetur. Etiam porta sem malesuada magna mollis euismod.
Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh,
ut fermentum massa justo sit amet risus.

- Praesent commodo cursus magna, vel scelerisque nisl consectetur et.
- Donec id elit non mi porta gravida at eget metus.
- Nulla vitae elit libero, a pharetra augue.

Etiam porta sem malesuada magna mollis euismod. Cras mattis consectetur purus sit amet fermentum.
Aenean lacinia bibendum nulla sed consectetur.

Donec ullamcorper nulla non metus auctor fringilla. Nulla vitae elit libero, a pharetra augue.
    `
};

let blog4 = {
    state: blog_states.delete,
    category: blog_categories.rental_guide,
    title: 'blog4',
    image: 'https://source.unsplash.com/random',

    description: "Tools for navigating AirBnB rentals",
    date: new Date(2020, 9, 30).toDateString(),
    content: `
# New feature

#### March 14, 2020 by [Becky](/)
I should be dead but you may see me
`
};

let mainFeaturedBlog = {
    state: blog_states.main_featured,
    category: blog_categories.rental_guide,
    title: 'Yo this is a main blog',
    description:
        "Multiple lines of  nonce text that form the lede, informing new readers quickly and efficiently about what's most interesting in this post's contents.",
    image: 'https://source.unsplash.com/random',
    imageText: 'main image description',
    linkText: 'Continue reading…',
    content: `
# New feature

#### March 14, 2020 by [Becky](/)
I should be dead but you may see me
<Video url="https://www.facebook.com/facebook/videos/245453540118461/" />
`
};

let mainFeaturedBlog1 = {
    state: blog_states.main_featured,
    category: blog_categories.lifestyle,
    title: 'Title of a Main featured blog post',
    description:
        "Multiple lines of aaa text that form the lede, informing new readers quickly and efficiently about what's most interesting in this post's contents.",
    image: 'https://source.unsplash.com/random',
    imageText: 'main image description',
    linkText: 'Continue reading…',
    content: `
# Main feature

#### March 14, 2020 by [Jules](/)
I should be dead but you may see me whats really good
<Video url="https://www.twitch.tv/x2twins"/>
`
};



let featuredBlog0 = {
    state: blog_states.featured,
    category: blog_categories.buying_tips,
    title: 'Featured post',
    date: 'Nov 12',
    description:
        'This is a wider card with supporting text below as a natural lead-in to additional content.',
    image: 'https://source.unsplash.com/random',
    imageText: 'Image Text',
    content: `
# New feature

#### March 14, 2020 by [Becky](/)
I should be dead but you may see me
<Video /> 
`
};


let featuredBlog1 = {
    state: blog_states.main_featured,
    category: blog_categories.buying_tips,
    title: 'Blog One Homie',
    date: 'Nov 11',
    description:
        'This is a wider card with supporting text below as a natural lead-in to additional content.',
    image: 'https://source.unsplash.com/random',
    imageText: 'Image Text',
    content: `
# Twisting and Turning for a Rental

#### March 14, 2020 by [Egg](/)

Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
Aenean lacinia bibendum nulla sed consectetur. Etiam porta sem malesuada magna mollis euismod.
Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh,
ut fermentum massa justo sit amet risus.

- Praesent commodo cursus magna, vel scelerisque nisl consectetur et.
- Donec id elit non mi porta gravida at eget metus.
- Nulla vitae elit libero, a pharetra augue.

Etiam porta sem malesuada magna mollis euismod. Cras mattis consectetur purus sit amet fermentum.
Aenean lacinia bibendum nulla sed consectetur.

Donec ullamcorper nulla non metus auctor fringilla. Nulla vitae elit libero, a pharetra augue.
  <Video url="https://soundcloud.com/glennmorrison/beethoven-moonlight-sonata" />
    `
};

const _blogPosts = {
    [uuidv4()]: blog1,
    [uuidv4()]: blog2,
    [uuidv4()]: blog3,
    [uuidv4()]: blog4,
};

const _featuredBlogPosts = {
    [uuidv4()]: featuredBlog0,
    [uuidv4()]: featuredBlog1,
};

const _mainBlogPosts = {
        [uuidv4()]: mainFeaturedBlog,
        [uuidv4()]:mainFeaturedBlog1
};

const TEST_POSTS = {
    blogPosts: {
        [blog_states.posts]: _blogPosts,
        [blog_states.featured]: _featuredBlogPosts,
        [blog_states.main_featured]:_mainBlogPosts
    }
};



/**
 * Filter's 'delete' from post and 'review' if the user is not admin
 * @param somePost
 * @param isAdmin
 * @return {Object}
 */
const filterPost = (somePost, isAdmin=false) =>{

    let ret_obj;
    for (let [key, value] of somePost) {
            if (value.state === blog_states.delete ){
                continue;
            }

            if (value.state===blog_states.review && !isAdmin){
                continue;
            }
            ret_obj[key]=value;
    }
    return ret_obj
};

export const getKeyFromSingelton = (obj)=>{
    return Object.keys(obj)[0]
};

    /**
     * Ensures that MainFeature only has one item.
     * - 1. First it gets a random item from `main_featured` if a valid feature exits
     *   - If a valid feature exits, set that feature as the single MainFeature, and
     *     merge the rest of the features in `main_featured' with  `featured'.
     *   - If not proceed to step 2
     * - 2. First it gets a random item from `featured` if a valid feature exits
     *   - If a valid feature exits, set that feature as the single MainFeature, and
     *     remove it from  `featured'.
     *   - If not proceed to step 3
     * - 3. First it gets a random item from `posts` if a valid post exits
     *   - If a valid feature exits, set that feature as the single MainFeature, and
     *     remove it from  `featured'.
     *   - If not do nothing there are no valid ppost
     */
const filterPosts = ({posts,featured,main_featured})=>{
    let randomMainFeature;
        let displayFeatured;
        let displayPost;

        // If no main features then go
        if (!(Object.keys(main_featured).length === 0 )){
            // get a random post form the main_featured to be the singular feature
            randomMainFeature = getRandomValueFromObject(main_featured);
            // Merge featured with main_featured and removed the highlighted feature
            displayFeatured = {...featured,...main_featured};
            delete displayFeatured[getKeyFromSingelton(randomMainFeature)];
            // simple copy of post
            displayPost = {...posts};

        }else if (!(Object.keys(featured).length === 0 )){
            // get a random post form the featured to be the singular feature
            randomMainFeature = getRandomValueFromObject(featured);
            displayFeatured = {...featured};
            delete displayFeatured[getKeyFromSingelton(randomMainFeature)];
            displayPost = {...posts};

        }else if (!(Object.keys(posts).length === 0 )){
            randomMainFeature = getRandomValueFromObject(posts);
            displayFeatured = {};
            displayPost = {...posts};
            delete displayPost[getKeyFromSingelton(randomMainFeature)];
        }else{
            randomMainFeature={};
            displayFeatured={};
            displayPost={};
        }

        return {[blog_states.posts]:displayPost,[blog_states.featured]:displayFeatured,[blog_states.main_featured]:randomMainFeature}
};

const blogPostToPath = (posts)=>{

    let paths = {};

    Object.keys(posts).map((key)=>{
        paths[key] = `${pageToPathName.BlogPage}/${posts[key].category}/${posts[key].title.toLowerCase().replace(/\s/g, '-')}`
    });
    return paths;
};


export const getPostFromBlogPosts = ({blogUUID,blogPosts}) =>{
    for (let key of Object.keys(blogPosts)) {
        if (blogUUID in blogPosts[key]){
            return blogPosts[key][blogUUID]
        }
}
};

const useBlogPosts = () => {
    const [blogPosts,setBlogPosts] = useState({});
    const [filteredBlogPosts, setFilteredBlogPosts] = useState({});
    const [isBlogLoaded, setBlogLoaded] = useState(false);
    const [blogPaths, setBlogPaths] = useState({});

    // ToDo: Get blog post from database
    useEffect(()=>{
        setBlogPosts(TEST_POSTS.blogPosts);
        setFilteredBlogPosts(filterPosts(TEST_POSTS.blogPosts));
    },[]);

    // If new blog post reset the paths
    useEffect(()=>{
        if (!isObjectEmpty(blogPosts)){

            let paths = {};
            // eslint-disable-next-line array-callback-return
            Object.keys(blog_states).map((key)=>{
                if(key in blogPosts){
                    paths= {...paths,...blogPostToPath(blogPosts[key])}
                }
            });

            setBlogPaths(paths);
            setBlogLoaded(true);
        }
    },[blogPosts]);



    return { filteredBlogPosts, blogPosts, isBlogLoaded, blogPaths}
};


export default useBlogPosts;