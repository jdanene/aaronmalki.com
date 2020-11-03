import React, { useContext, useEffect, useState } from "react"
import BorderGuard from "../../components/BorderGuard/BorderGuard";
import CssBaseline from '@material-ui/core/CssBaseline';
import Button from '@material-ui/core/Button';
import FileDrop from "../../components/FileDrop/FileDrop";
import UploadBlog from "./components/UploadBlog";


//https://www.npmjs.com/package/react-beautiful-dnd

const ManageBlogPage = ()=>{
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

        <UploadBlog/>
        <FileDrop fileCallback={setFile}/>

        <img src={fileUrl}/>

        This is the ManageBlogPage page
    </div>

};

export default ManageBlogPage;