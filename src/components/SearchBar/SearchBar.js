import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import {fade, makeStyles} from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import {colorScheme} from "../../constants";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        display: 'flex',
        position: 'relative',

    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
    search: {

        zIndex: 1,
        borderRadius: theme.shape.borderRadius,
        backgroundColor: 'transparent',
        '&:hover': {
            //backgroundColor: theme.palette.common.white,
        },
        marginLeft: 0,
        //width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(1),
            width: 'auto',
            position: 'absolute',
            right: 0
        },
        [theme.breakpoints.down('sm')]: {
            position: 'absolute',
            width: 'auto',
            right: 0

        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        zIndex: 1,
        //border:'1px solid pink',
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon

        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        [theme.breakpoints.up('sm')]: {

            width: 0,
            '&:focus': {
                width: '20ch',
                border: `1.5px solid rgba(0,0,0,.50)`,
              borderRadius: 5,
              backgroundColor: theme.palette.common.white

            },
        },
        [theme.breakpoints.only('sm')]: {
            width: 0,
            '&:focus': {
                width: '80vw',
                border: `1.5px solid rgba(0,0,0,.50)`,
              borderRadius: 5,
              backgroundColor: theme.palette.common.white

            },
        },
        [theme.breakpoints.only('xs')]: {
            width: 0,
            '&:focus': {
                width: '64vw',
                border: `1.5px solid rgba(0,0,0,.50)`,
              borderRadius: 5,
              backgroundColor: theme.palette.common.white

            },
        },
    },
}));

export default function SearchBar() {
    const classes = useStyles();

    return (

        <div className={classes.search}>
            <div className={classes.searchIcon}>
                <SearchIcon style={{zIndex:2}} />
            </div>
            <InputBase
                placeholder="Search…"

                classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                }}
                inputProps={{'aria-label': 'search'}}
            />
        </div>

    );
}