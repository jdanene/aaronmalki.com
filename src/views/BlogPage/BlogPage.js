import React, {useContext} from "react"
import Blog from "./components/Blog";
import {colorScheme} from "../../constants";
import {Helmet} from 'react-helmet'
import {AppContext} from "../../context";
import {DB_NODES_PAGES, PUBLIC_PAGE_KEYS} from "../../constants/contants";
import {blog_categories_keysOnly} from "../../constants/contants";

/**
 *
 * @param blogUUID: indicates
 * @return {*}
 * @constructor
 */
const BlogPage = ({blogUUID, category}) => {
    const {
        blogPostsRaw,
        pageState: {
            [DB_NODES_PAGES.settings]: {
                companyName,
                seo: {
                    [PUBLIC_PAGE_KEYS.BlogPage]: blogPage
                }
            }
        },
    } = useContext(AppContext);

    const getGoogleSerpTitle = () => {
        if (blogUUID) {
            return blogPostsRaw[blogUUID].title
        } else if (category) {
            return blogPage[blog_categories_keysOnly[category]].title
        } else {
            return companyName
        }
    };

    const getGoogleSerpDescription = () => {
        if (blogUUID) {
            return blogPostsRaw[blogUUID].description
        } else if (category) {
            return blogPage[blog_categories_keysOnly[category]].description
        } else {
            return companyName
        }
    };


    return <div style={{
        display: "flex",
        alignContent: "center",
        alignItems: "center",
        width: '100vw',
        backgroundColor: colorScheme.other.backgroundComplementary
    }}>
        {/*Page content in the Google SERP Listing*/}
        <Helmet>
            <title>{getGoogleSerpTitle()}</title>
            <meta name="description"
                  content={getGoogleSerpDescription()}/>
        </Helmet>


        <Blog blogUUID={blogUUID} category={category}/>
    </div>

};

export default BlogPage;