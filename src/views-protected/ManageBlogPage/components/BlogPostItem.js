import * as React from 'react';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Hidden from '@material-ui/core/Hidden';
import Button from '@material-ui/core/Button';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import {theme} from "rich-markdown-editor";
import {colorScheme} from "../../../constants";

const useStyles = makeStyles((theme) =>({
    card: {
        width:500
    },
    cardDetails: {
        flex: 1,
    },
    cardAction:{
        display:'flex',
        justifyContent:'space-between',
        padding: theme.spacing(1)
    },
    cardMedia: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
}));

function BlogPostItem({post, path}) {
    const classes = useStyles();

    return (
        <Card className={classes.card}>
            <CardHeader
     action={
          <IconButton aria-label="delete" >
                      <Avatar aria-label="settings" href={'#'} style={{ backgroundColor: 'white' }}>
            <DeleteForeverIcon  style={{color:colorScheme.general.hot_purple}}/>
          </Avatar>
          </IconButton>
        }
                title={post.title}
                subheader={post.date}
            />
            <CardMedia
                className={classes.cardMedia}
                image={post.image}
                title={post.imageText}
            />
            <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                    {post.description}
                </Typography>
            </CardContent>


            <Divider/>
            <div className={classes.cardAction}>
                <Button size={'small'} variant={"contained"} href={path}>Go To Blog Post</Button>
                <Button size={'small'}  variant={"contained"}  href={'#'}>Edit Blog Post</Button>
            </div>
        </Card>
    );
}

/*
BlogPostItem.propTypes = {
  post: PropTypes.shape({
    date: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    imageText: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
};
*/
export default BlogPostItem;
