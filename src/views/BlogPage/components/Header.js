import * as React from 'react';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import {Link} from "react-router-dom";
import {blog_categories_keysOnly, blog_category_to_string} from "../../../constants/contants";
import clsx from "clsx";
import {colorScheme} from "../../../constants";
import {Divider} from "@material-ui/core";
import SearchBar from "../../../components/SearchBar/SearchBar";
//blog_category_to_string
const useStyles = makeStyles((theme) => ({
  toolbar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
    marginTop:'70px',
  },
  toolbarTitle: {
    flex: 1,
            fontFamily:'airbnb-bold',
    color:theme.palette.text.primary,
      zIndex:0

  },
  toolbarSecondary: {
    justifyContent: 'space-between',
    overflowX: 'auto',
    color:'#008080',
  },
  toolbarLink: {
    padding: theme.spacing(1),
    flexShrink: 0,
        fontFamily:'airbnb-medium',
  },
  toolbarLink_active:{
    textDecoration:'underline',
    color:'#004080',
            fontFamily:'airbnb-medium',

  },
    toolbarLink_inactive:{
    textDecoration:'none !important',
      color:colorScheme.primary.light,
              fontFamily:'airbnb-medium',

  },
}));

function Header({searchText, setSearchText, isSearching, location,isFocusedCallback,searchResultCallback}) {
  const classes = useStyles();

  const pathMatcher = (targetPath)=>{

    return location.pathname.includes(targetPath);
  };




  return (
    <React.Fragment>
      <Toolbar className={classes.toolbar}>
        {/*<Button size="small">Subscribe</Button>*/}
        <Typography
          variant="h5"
          color="inherit"
          align="center"
          noWrap
          className={classes.toolbarTitle}
        >
          {"Malki's Blog"}
        </Typography>
        <SearchBar searchText={searchText} setSearchText={setSearchText} isSearching={isSearching} isFocusedCallback={isFocusedCallback} searchResultCallback={searchResultCallback}/>

          {/*
          <Button variant="outlined" size="small">
          Sign up
        </Button>
        */}
      </Toolbar>
      <Toolbar
        component="nav"
        variant="dense"
        className={classes.toolbarSecondary}
      >
        {Object.keys(blog_categories_keysOnly).map((key) => {
            return <Link
            color="inherit"
            key={key}
            variant="body2"
            to={{pathname: blog_category_to_string[key].path, state:{category:key}}}
            className={clsx(classes.toolbarLink,pathMatcher(blog_category_to_string[key].path)?classes.toolbarLink_active: classes.toolbarLink_inactive)}
          >
            {blog_category_to_string[key].title}
          </Link>}
        )}
      </Toolbar>
      <Divider/>
    </React.Fragment>
  );
}

Header.propTypes = {
    location: PropTypes.object.isRequired,
    isFocusedCallback: PropTypes.func.isRequired,
    searchResultCallback: PropTypes.func.isRequired
};

export default Header;
