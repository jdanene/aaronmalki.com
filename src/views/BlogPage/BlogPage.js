import React from "react"
import Blog from "./components/Blog";

/**
 *
 * @param blogUUID: indicates
 * @return {*}
 * @constructor
 */
const BlogPage = ({blogUUID})=>{

    return <div style={{display:"flex", alignContent:"center", alignItems:"center",width:'100vw'}}>
        <Blog blogUUID={blogUUID}/>
    </div>

};

export default BlogPage;