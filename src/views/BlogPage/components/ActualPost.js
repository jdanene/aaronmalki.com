import * as React from 'react';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Markdown from './Markdown';

const useStyles = makeStyles((theme) => ({
  markdown: {
    ...theme.typography.body2,
      paddingBottom:theme.spacing(3, 0),
    paddingLeft:theme.spacing(3, 0),
    paddingRight:theme.spacing(3, 0),
    color: "black"
  },
}));

function ActualPost(props) {
  const classes = useStyles();
  const {key, post} = props;

  console.log(post);
  return (
    <Grid item xs={12} md={8}>
        <Markdown className={classes.markdown} children={post.content}/>
    </Grid>
  );
}

ActualPost.propTypes = {
  post: PropTypes.object.isRequired
};

export default ActualPost;
