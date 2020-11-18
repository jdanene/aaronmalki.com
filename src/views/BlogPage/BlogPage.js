import React, {useContext} from "react"
import Blog from "./components/Blog";
import {colorScheme} from "../../constants";
import {AppContext} from "../../context";
import {DB_NODES_PAGES, OG_TYPE, PUBLIC_PAGE_KEYS} from "../../constants/contants";
import {blog_categories_keysOnly} from "../../constants/contants";
import SeoTags from "../../components/SeoTags/SeoTags";

/**
 *
 * @param blogUUID: indicates
 * @return {*}
 * @constructor
 */
const BlogPage = ({blogUUID, category, location}) => {
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

    const getGoogleSerpImg = () => {
        if (blogUUID && ("image" in blogPostsRaw[blogUUID])) {
            return  blogPostsRaw[blogUUID].image
        }
    };

    const getGoogleSerpType = () => {
        if (blogUUID) {
            return OG_TYPE.article
        } else {
            return OG_TYPE.blog
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
        <SeoTags description={getGoogleSerpDescription()}
                 companyName={companyName}
                 title={getGoogleSerpTitle()}
                 path={location.pathname}
                 img={getGoogleSerpImg()}
                 type={getGoogleSerpType()}
        />

        <Blog blogUUID={blogUUID} category={category}/>
    </div>

};

export default BlogPage;