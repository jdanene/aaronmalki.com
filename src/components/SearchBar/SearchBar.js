import React, {useContext, useRef, useEffect, useState} from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import {fade, makeStyles} from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import {colorScheme} from "../../constants";
import Fuse from 'fuse.js'
import {AppContext} from "../../context";
import PropTypes from 'prop-types';
import {FIREBASE_ANALYTICS} from "../../App";
// fuse is a fuzzy search library that ReactSearchBox uses ---these are the parameters.
const defaultFuseConfigs = {
    /**
     * At what point does the match algorithm give up. A threshold of 0.0
     * requires a perfect match (of both letters and location), a threshold
     * of 1.0 would match anything.
     */
    threshold: 0.05,
    /**
     * Determines approximately where in the text is the pattern expected to be found.
     */
    location: 0,
    /**
     * Determines how close the match must be to the fuzzy location
     * (specified by location). An exact letter match which is distance
     * characters away from the fuzzy location would score as a complete
     * mismatch. A distance of 0 requires the match be at the exact
     * location specified, a distance of 1000 would require a perfect
     * match to be within 800 characters of the location to be found
     * using a threshold of 0.8.
     */
    distance: 1000,
    /**
     * When set to include matches, only the matches whose length exceeds this
     * value will be returned. (For instance, if you want to ignore single
     * character index returns, set to 2).
     */
    minMatchCharLength: 1,
    /**
     * List of properties that will be searched. This supports nested properties,
     * weighted search, searching in arrays of strings and objects.
     */
    keys: ['title', 'date', 'description'],
};


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

const postsToList = (blogPostsRaw, blogPaths) => {
    return Object.keys(blogPostsRaw).map((key) => {
        blogPostsRaw[key].key = key;
        blogPostsRaw[key].path = blogPaths[key];
        return blogPostsRaw[key];
    })
};

export default function SearchBar({isFocusedCallback, searchResultCallback}) {
    const classes = useStyles();
    const {blogPostsRaw, blogPaths} = useContext(AppContext);
    const fuse = useRef(new Fuse(postsToList(blogPostsRaw, blogPaths), defaultFuseConfigs));

    useEffect(() => {
        fuse.current = new Fuse(postsToList(blogPostsRaw, blogPaths), defaultFuseConfigs);
    }, [blogPostsRaw]);

    const handleChange = (e) => {

        FIREBASE_ANALYTICS.logEvent(
            'search', {
                search_term: e.target.value
            });


        searchResultCallback(fuse.current.search(e.target.value));
    };

    const handleFocus = (e) => {
        isFocusedCallback(true);
    };

    const handleBlur = (e) => {
        // isFocusedCallback(false);
    };

    //searchData = fuse.current.search(text);
    return (

        <div className={classes.search}>
            <div className={classes.searchIcon}>
                <SearchIcon style={{zIndex: 2}}/>
            </div>
            <InputBase
                onFocus={handleFocus}
                onBlur={handleBlur}
                placeholder="Search…"
                onChange={handleChange}
                classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                }}
                inputProps={{'aria-label': 'search'}}
            />
                        <div className={classes.searchIcon}>
                <SearchIcon style={{zIndex: 2}}/>
            </div>
        </div>

    );
}

SearchBar.propTypes = {
    isFocusedCallback: PropTypes.func.isRequired,
    searchResultCallback: PropTypes.func.isRequired
};

SearchBar.defaultProps = {
    isFocusedCallback: (isFocused) => console.log('Search focused: ', isFocused),
    searchResultCallback: (searchList) => console.log('Search Results', searchList)
};