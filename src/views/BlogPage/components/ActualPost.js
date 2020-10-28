import * as React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Markdown from './Markdown';
import {getKeyFromSingelton} from "../../../context/useBlogPost";

const useStyles = makeStyles((theme) => ({
  markdown: {
    ...theme.typography.body2,
    padding: theme.spacing(3, 0),
      color: "black"
  },
}));

function ActualPost(props) {
  const classes = useStyles();
  const {key, post} = props;

  console.log(post);
  return (
    <Grid item xs={12} md={8}>

      <Divider />

        <Markdown className={classes.markdown} children={post.content}/>

    </Grid>
  );
}

ActualPost.propTypes = {
  post: PropTypes.object.isRequired
};

export default ActualPost;
