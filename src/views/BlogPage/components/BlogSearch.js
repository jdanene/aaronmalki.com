import * as React from 'react';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Markdown from './Markdown';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import FeaturedPost from "./FeaturedPost";

const useStyles = makeStyles((theme) => ({
    searchResults: {
        fontFamily: 'airbnb-bold',
        color: theme.palette.text.secondary,
    },
    root: {
        display: 'flex',
        flexDirection: 'column',
        flexGrow: 1,
        justifyContent: 'center',

    },
    noResults: {
        margin: theme.spacing(10),
        fontFamily: 'airbnb-medium',
        color: theme.palette.text.disabled,
    }
}));

// [{item:{post}, refIndex: int}]
function BlogSearch({searchList}) {
    const classes = useStyles();

    return (

        <div className={classes.root}>
            <Typography variant="h5" className={classes.searchResults}>
                Search Results
            </Typography>
            <Divider/>

            {searchList.length > 0 ?
                <List component="nav" aria-label="list blog search">
                    {
                        searchList.map((searchItem) => {
                            return (
                                <ListItem style={{justifyContent: 'center', alignItems: 'center'}} alignItems="center"
                                          component={'div'} key={searchItem.item.key}>
                                    <FeaturedPost post={searchItem.item} path={searchItem.item.path}/>
                                </ListItem>
                            )
                        })
                    }

                </List> :
                <Typography variant="h5" className={classes.noResults}>
                    No Results :(
                </Typography>
            }
        </div>
    );
}


BlogSearch.propTypes = {
    searchList: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default BlogSearch;
