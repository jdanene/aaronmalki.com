import React from "react"
import BorderGuard from "../../components/BorderGuard/BorderGuard";
import CssBaseline from '@material-ui/core/CssBaseline';
import {makeStyles} from '@material-ui/core/styles';
import ListBlogPosts from "./components/ListBlogPosts";
import Typography from "@material-ui/core/Typography";

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

    const classes = useStyles();


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