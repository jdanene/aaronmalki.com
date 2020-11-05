import React, { useContext, useEffect, useState } from "react"
import BorderGuard from "../../components/BorderGuard/BorderGuard";
import CssBaseline from '@material-ui/core/CssBaseline';
import Button from '@material-ui/core/Button';
import FileDrop from "../../components/FileDrop/FileDrop";
import UploadBlog from "./components/UploadBlog";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from '@material-ui/core/styles';
import MarkDownEditor from "./components/MardownEditor";
import ListBlogPosts from "./components/ListBlogPosts";
import {AppContext} from "../../context";
import {getKeyFromSingelton} from "../../context/useBlogPost";
import Typography from "@material-ui/core/Typography";
import {blog_categories} from "../../constants/contants";
import OptionsSelect from "./components/OptionSelect";
import Divider from "@material-ui/core/Divider";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
  },
  edit_container: {
    padding: theme.spacing(2),
  },
    heading:{
      marginTop: theme.spacing(2),
        marginBottom:theme.spacing(0),
        display:'flex',
        width:'100%',
        marginLeft: theme.spacing(10),
        marginRight: theme.spacing(10),
        //border:'1px solid red',
        paddingLeft:theme.spacing(10),
        paddingRight:theme.spacing(10),
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2),
        justifyContent:'space-between'
    }
}));

//https://www.npmjs.com/package/react-beautiful-dnd


const ManageBlogPage = ()=>{
    const {isBlogLoaded,blogPaths,blogPosts} = useContext(AppContext);
   const {category,setCategory} = useState('all')
    // let x = blogPaths[getKeyFromSingelton(main_featured)]

    console.log(blogPosts)
    const classes = useStyles();

    const [file, setFile] = useState(null);
    const [fileUrl, setFileUrl] = useState("#");
    useEffect(()=>{
        if (file){
            setFileUrl(URL.createObjectURL(file[0]));
        }

    },[file]);

    return <div style={{display:"flex",justifyContent:"center", alignItems:"center", flexDirection:'column', width:'100%'}}>
       <CssBaseline/>
        <BorderGuard/>
        <div className={classes.heading}>
                    <Typography variant="h3" color="textPrimary" component="h3">Manage Blog Post</Typography>


        </div>
        <ListBlogPosts/>
    </div>

};

export default ManageBlogPage;