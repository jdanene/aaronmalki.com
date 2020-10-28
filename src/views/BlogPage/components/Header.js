import * as React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import Typography from '@material-ui/core/Typography';
import {Link} from "react-router-dom";
import {blog_category_to_string} from "../../../constants/contants";
import { matchPath } from "react-router";
import isObjectEmpty from "../../../components/Utility/isObjectEmpty";
import {useEffect} from "react";
import clsx from "clsx";
import isPathMatch from "../../../components/Utility/isPathMatch";
import {colorScheme} from "../../../constants";
//blog_category_to_string
const useStyles = makeStyles((theme) => ({
  toolbar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbarTitle: {
    flex: 1,
    color:'black'
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

function Header(props) {
  const classes = useStyles();
  const {location, sections, title } = props;


  const pathMatcher = (targetPath)=>{

    return location.pathname.includes(targetPath);
  };



  return (
    <React.Fragment>
      <Toolbar className={classes.toolbar}>
        <Button size="small">Subscribe</Button>
        <Typography
          component="h2"
          variant="h5"
          color="inherit"
          align="center"
          noWrap
          className={classes.toolbarTitle}
        >
          {title}
        </Typography>
        <IconButton>
          <SearchIcon />
        </IconButton>
        <Button variant="outlined" size="small">
          Sign up
        </Button>
      </Toolbar>
      <Toolbar
        component="nav"
        variant="dense"
        className={classes.toolbarSecondary}
      >
        {Object.keys(blog_category_to_string).map((key) => (
          <Link
            color="inherit"
            key={key}
            variant="body2"
            to={blog_category_to_string[key].path}
            className={clsx(classes.toolbarLink,pathMatcher(blog_category_to_string[key].path)?classes.toolbarLink_active: classes.toolbarLink_inactive)}
          >
            {blog_category_to_string[key].title}
          </Link>
        ))}
      </Toolbar>
    </React.Fragment>
  );
}

Header.propTypes = {
  sections: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

export default Header;
