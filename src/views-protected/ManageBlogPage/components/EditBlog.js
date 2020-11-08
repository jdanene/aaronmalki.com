import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {blog_states, blog_categories} from "../../../constants/contants";
import OptionsSelect from "./OptionSelect";
import TextInput from "./TextInput";
import DatePicker from "./DatePicker";
import FileDrop from "../../../components/FileDrop/FileDrop";
import Grid from "@material-ui/core/Grid";
import PropTypes from 'prop-types';
import uploadImgToDb from "../../../components/Database/uploadImgToDb";
import uploadBlogPostToDb from "../../../components/Database/uploadBlogPostToDb";
import CircularProgress from '@material-ui/core/CircularProgress';


const MAX_DESC_CHARS = 140;
const MAX_TITLE_CHARS = 40;
const ACCEPT_MARKDOWNFILE = ['text/x-markdown', 'text/markdown'];
const ACCEPT_IMAGES = ['image/*'];

export default function EditBlog({blog, blogUUID, open, setOpenCallback}) {

    const {state, category, title, image: image_url, description, date, content} = blog;

    const [_title, setTitle] = useState(title);
    const [_description, setDescription] = useState(description);
    const [imgFile, setImgFile] = useState(null);
    const [markdownFile, setMarkdownFile] = useState(content);
    const [_category, setCategory] = useState(category);
    const [_date, setDate] = useState(new Date(date));
    const [isBlogCreating, setIsBlogCreating] = useState(false);


    const validateCreate = () => {
        // eslint-disable-next-line eqeqeq
        if (_title === '') {
            alert('You forgot to enter the title.');
            return false
        }

        if (_description === '') {
            alert('You forgot to enter a description.');
            return false
        }

        if (!(_category) || _category === '') {
            alert('You forgot to select a category.');
            return false
        }

        if (!(image_url) || image_url === '') {
            if (!(imgFile)) {
                alert('Upload a cover image. (Could be any image but we need it).');
                return false
            }
        }


        if (!(markdownFile)) {
            alert('Upload the markdown file aka the blog content. [filename.md]');
            return false
        }

        return true;


    };

    const handleClose = () => {
        setOpenCallback(false);
    };

    const uploadFirebaseStorageCallBack = (url) => {
        const options = {year: 'numeric', month: 'short', day: 'numeric'};


        uploadBlogPostToDb(blogUUID, {
            state,
            category:_category,
            title:_title,
            image: url,
            description:_description,
            date: _date.toLocaleDateString("en-US", options),
            content: markdownFile
        }).then(() => {
            setIsBlogCreating(false);
            setOpenCallback(false);
        }).catch((e) => alert(`Couldn't upload blog to db, try again or contact dev:\n ${e}`))

    };

    const handleCreate = () => {


        if (validateCreate()) {
            setIsBlogCreating(true);

            if ((imgFile) && (imgFile instanceof File)) {
                uploadImgToDb({
                    file: imgFile,
                    uploadCallback: uploadFirebaseStorageCallBack
                })
            } else {
                uploadFirebaseStorageCallBack(image_url)
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
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="customized-dialog-title">Create a {state} post</DialogTitle>
                <DialogContent dividers>
                    <DialogContentText>
                        Edit all attributes of a blog. <b><em> Note:</em></b> To change the actual state of the blog
                        (e.g if the blog is a main_featured, featured, posts) navigate back and use drag and drop.
                    </DialogContentText>

                    <TextInput label={'Blog Title'} max_char={MAX_TITLE_CHARS} textCallback={setTitle}
                               initial={_title}/>
                    <TextInput label={'Blog Description'} max_char={MAX_DESC_CHARS} textCallback={setDescription}
                               initial={_description}/>
                    <DatePicker date={_date} dateCallback={setDate} label={'Set publish date for blog post'}/>
                    <OptionsSelect helperText={'Category'} label={"Select blog category"} choices={blog_categories}
                                   onChoiceCallback={setCategory} initial={category}/>

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
                        {isBlogCreating ? <CircularProgress color="secondary"/> : "Edit"}
                    </Button>

                </DialogActions>
            </Dialog>
        </div>
    );
}


// Specifies the default values for props:
EditBlog.defaultProps = {
    blogState: blog_states.main_featured,
    blogUploadCallBack: (val, payload) => alert(JSON.stringify(payload))

};

EditBlog.propTypes = {
    blogUploadCallBack: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    setOpenCallback: PropTypes.func.isRequired,
    blog: PropTypes.object.isRequired,
    blogUUID: PropTypes.string.isRequired,
};
