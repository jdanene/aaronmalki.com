import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
//import {blog_states} from "constants/contants";
import {blog_states, blog_categories} from "../../../constants/contants";
import generateUUID from "../../../components/Utility/uuid";
import {pageToPageName} from "../../../constants/contants";
import Divider from "@material-ui/core/Divider";
import OptionsSelect from "./OptionSelect";
import TextInput from "./TextInput";
import DatePicker from "./DatePicker";
import FileDrop from "../../../components/FileDrop/FileDrop";
import Grid from "@material-ui/core/Grid";
import PropTypes from 'prop-types';
import uploadImgToDb from "../../../components/Database/uploadImgToDb";
import uploadBlogPostToDb from "../../../components/Database/uploadBlogPostToDb";
import CircularProgress from '@material-ui/core/CircularProgress';
import Link from '@material-ui/core/Link';

/*
    state: blog_states.posts,
    category: blog_categories.news,
    title: 'blog1',
    image: 'https://source.unsplash.com/random',
    description: "Covid rebound in the works for SF",
    date: new Date().toDateString(),
    content: `
*/

const MAX_DESC_CHARS = 140;
const MAX_TITLE_CHARS = 40;
const ACCEPT_MARKDOWNFILE = ['text/x-markdown', 'text/markdown'];
const ACCEPT_IMAGES = ['image/*'];

export default function UploadBlog({blogState, color, blogUploadCallBack,initialCategory}) {

    const blogId = generateUUID();
    const [open, setOpen] = React.useState(false);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [imgFile, setImgFile] = useState(null);
    const [markdownFile, setMarkdownFile] = useState('');
    const [category, setCategory] = useState(initialCategory);
    const [date, setDate] = useState(new Date());
    const [isBlogCreating, setIsBlogCreating] = useState(false);

    const validateCreate = () => {
        // eslint-disable-next-line eqeqeq
        if (title === '') {
            alert('You forgot to enter the title.');
            return false
        }

        if (description === '') {
            alert('You forgot to enter a description.');
            return false
        }

        if (!(category) || category === '') {
            alert('You forgot to select a category.');
            return false
        }

        if (!(imgFile)) {
            alert('Upload a cover image. (Could be any image but we need it).');
            return false
        }

        if (!(markdownFile)) {
            alert('Upload the markdown file aka the blog content. [filename.md]');
            return false
        }

        return true;


    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const uploadFirebaseStorageCallBack = (url) => {
        const options = {year: 'numeric', month: 'short', day: 'numeric'};


        uploadBlogPostToDb(blogId, {
            state: blogState,
            category,
            title,
            image: url,
            description,
            date: date.toLocaleDateString("en-US", options),
            content: markdownFile
        }).then(() => {
            setIsBlogCreating(false);
            setOpen(false);
        }).catch((e) => alert(`Couldn't upload blog to db, try again or contact dev:\n ${e}`))

    };

    const handleCreate = () => {


        if (validateCreate()) {
            if (imgFile instanceof File) {
                setIsBlogCreating(true);
                uploadImgToDb({
                    file: imgFile,
                    uploadCallback: uploadFirebaseStorageCallBack
                })
            }


        }

        //
    };

    const handleMarkdown = (file) => {
        file[0].text().then((txt) => setMarkdownFile(txt))
    };

    const handleImage = (file) => {
        setImgFile(file[0])
    };
    return (
        <div>
            <Button variant="contained" color="secondary" style={color ? {backgroundColor: color, color: 'white'} : {}}
                    onClick={handleClickOpen}>
                ADD {blogState} post
            </Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="customized-dialog-title">Create a {blogState} post</DialogTitle>
                <DialogContent dividers>
                    <DialogContentText>
                        The actual content of the blog is in the markdown file, see <Link rel="noopener noreferrer" target="_blank" href={"https://github.com/jdanene/aaronmalki.com/blob/main/example-blogs/blog-post.1.md"}> our example</Link> for a example markdown
                        file. The title, date, description, and image are used when showing a blog article preview.
                        When writing a blog (via markdown) make sure you include a <em><b>title, date,</b></em> and <em><b>author</b></em> within the actual file, see
                         <Link rel="noopener noreferrer" target="_blank" href={"https://github.com/jdanene/aaronmalki.com/blob/main/example-blogs/blog-post.1.md"}> our example</Link> for concrete example.
                    </DialogContentText>

                    <TextInput label={'Blog Title'} max_char={MAX_TITLE_CHARS} textCallback={setTitle}/>
                    <TextInput label={'Blog Description'} max_char={MAX_DESC_CHARS} textCallback={setDescription}/>
                    <DatePicker date={date} dateCallback={setDate} label={'Set publish date for blog post'}/>
                    <OptionsSelect helperText={'Category'} label={"Select blog category"} choices={blog_categories}
                                   onChoiceCallback={setCategory} initial={initialCategory}/>

                    <Grid container justify={'space-between'} style={{width: '100%'}}>

                        <Grid item>
                            <FileDrop fileCallback={handleImage} acceptedFiles={ACCEPT_IMAGES}
                                      label={'Upload Featured Image'}/>
                        </Grid>

                        <Grid item>
                            <FileDrop fileCallback={handleMarkdown} acceptedFiles={ACCEPT_MARKDOWNFILE}
                                      label={'Upload Markdown Formatted Blog'}/>
                        </Grid>

                    </Grid>
                </DialogContent>
                <DialogActions>

                    <Button onClick={handleClose} color="secondary">
                        Cancel
                    </Button>
                    <Button onClick={handleCreate} color="secondary">
                        {isBlogCreating ? <CircularProgress color="secondary"/> : "Create"}
                    </Button>

                </DialogActions>
            </Dialog>
        </div>
    );
}


// Specifies the default values for props:
UploadBlog.defaultProps = {
    blogState: blog_states.main_featured,
    blogUploadCallBack: (val, payload) => alert(JSON.stringify(payload))

};

UploadBlog.propTypes = {
    blogUploadCallBack: PropTypes.func.isRequired
};