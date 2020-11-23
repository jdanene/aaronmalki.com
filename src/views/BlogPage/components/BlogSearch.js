import * as React from 'react';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import FeaturedPost from "./FeaturedPost";
import {colorScheme} from "../../../constants";

const useStyles = makeStyles((theme) => ({
    searchResults: {
        fontFamily: 'airbnb-bold',
        color: theme.palette.text.secondary,
        marginBottom: theme.spacing(2)
    },
    root: {
        display: 'flex',
        flexDirection: 'column',
        flexGrow: 1,
        justifyContent: 'center',


    },
    noResults: {
        fontFamily: 'airbnb-medium',
        color: theme.palette.text.disabled,
        minHeight: '50vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#eceff1'

    },
    list: {
        backgroundColor: '#eceff1',
        overflowY: 'scroll',
        borderRadius: 2.5,
        minHeight: '50vh',
        maxHeight: 'max(50vh,500px)',
        border: '.1px solid rgba(0,0,0,.1)',
        boxShadow: "0 1px 1px 0 rgba(0, 0, 0, 0.14), 0 2px 1px -1px rgba(0, 0, 0, 0.12), 0 1px 3px 0 rgba(0, 0, 0, 0.20)"
    }
}));

// [{item:{post}, refIndex: int}]
function BlogSearch({searchList, searchText}) {
    const classes = useStyles();

    return (

        <div className={classes.root}>
            <Typography variant="h4" component={'h1'} className={classes.searchResults}>
                Search Results
            </Typography>

            {searchList.length > 0 ?
                <List component="ul" aria-label="list blog search" className={classes.list}>
                    {
                        searchList.map((searchItem) => {
                            return (
                                <ListItem style={{justifyContent: 'center', alignItems: 'center'}} alignItems="center"
                                          component={'div'} key={searchItem.item.key}>
                                    <FeaturedPost md={10} post={searchItem.item} path={searchItem.item.path}/>
                                </ListItem>
                            )
                        })
                    }

                </List> :
                <Typography variant="h5" className={classes.noResults}>
                    {searchText.length !== 0 ? 'No results :(' : 'Start typing to see results...'}
                </Typography>

            }
        </div>
    );
}


BlogSearch.propTypes = {
    searchList: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default BlogSearch;
