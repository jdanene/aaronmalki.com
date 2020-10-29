import React, { useContext, useEffect, useState } from "react"
import Container from '@material-ui/core/Container';
import {makeStyles} from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

const useStyles = makeStyles((theme) => ({
    root:{
        backgroundColor: theme.palette.background.default
    },
    paper: {
        marginTop: theme.spacing(10),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

const VirtualAdminPage = ()=>{
    const classes = useStyles();

    return <Container component={'main'} style={{ marginTop:200}}>
       <CssBaseline/>
        This is the admin page
    </Container>

};

export default VirtualAdminPage;