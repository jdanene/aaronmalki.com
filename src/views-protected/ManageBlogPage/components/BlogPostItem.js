import * as React from 'react';
import {useState} from 'react';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import CardHeader from '@material-ui/core/CardHeader';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import {colorScheme} from "../../../constants";
import Tooltip from '@material-ui/core/Tooltip';
import ConfirmActionDialog from "./ConfirmActionDialog";
import EditBlog from "./EditBlog";

const useStyles = makeStyles((theme) => ({
    card: {
        width: 500
    },
    cardDetails: {
        flex: 1,
    },
    cardAction: {
        display: 'flex',
        justifyContent: 'space-between',
        padding: theme.spacing(1)
    },
    cardMedia: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
}));

function BlogPostItem({post, path, deleteCallback,postUUID}) {
    const [openConfirmDelete, setOpenConfirmDelete] = useState(false);
    const [openEditBlog, setOpenEditBlog] = useState(false);

    const classes = useStyles();

    return (

        <Card className={classes.card}>
            <ConfirmActionDialog open={openConfirmDelete}
                                   setOpen={setOpenConfirmDelete}
                                   confirmCallBack={deleteCallback}
                                   message={"Are you sure you want to delete this blog post? Once it's deleted it's deleted forever 👻!"}
            />
            <CardHeader
                action={
                    <Tooltip title={"Delete Blog Post"}>
                        <IconButton aria-label="delete" onClick={() => setOpenConfirmDelete(true)}>
                            <Avatar aria-label="delete_avatar" style={{backgroundColor: 'white'}}>
                                <DeleteForeverIcon style={{color: colorScheme.general.hot_purple}}/>
                            </Avatar>
                        </IconButton>
                    </Tooltip>
                }
                title={post.title}
                subheader={post.date}
            />
            <CardMedia
                className={classes.cardMedia}
                image={post.image}
                //title={post.imageText}
            />
            <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                    {post.description}
                </Typography>
            </CardContent>


            <Divider/>
            <div className={classes.cardAction}>
                <Button size={'small'} variant={"contained"} href={path}>Go To Blog Post</Button>
                <Button size={'small'} variant={"contained"} onClick={()=>setOpenEditBlog(true)}>Edit Blog Post</Button>
            </div>
            {openEditBlog&&<EditBlog setOpenCallback={setOpenEditBlog} open={openEditBlog} blog={post} blogUUID={postUUID}/>}
        </Card>
    );
}


BlogPostItem.propTypes = {
    post: PropTypes.shape({
        date: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
    }).isRequired,
    path: PropTypes.string.isRequired,
    deleteCallback: PropTypes.func.isRequired
};

BlogPostItem.propTypes = {
    deleteCallback: () => {
    }
};

export default BlogPostItem;
