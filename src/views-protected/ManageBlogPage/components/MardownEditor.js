import React, {useState} from "react"
import Grid from "@material-ui/core/Grid";
import {makeStyles} from '@material-ui/core/styles';
import MarkDownTextBox from "./MarkDownTextBox";
import Markdown from "../../../views/BlogPage/components/Markdown";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {},
    edit_container: {
        padding: theme.spacing(2),
    },
}));

const MarkDownEditor = () => {
    const [markdownText, setmMarkdownText] = useState('');
    const handleText = (value) => {
      setmMarkdownText(value)
    };
    const classes = useStyles();

    return (
        <Grid container spacing={5} className={classes.edit_container}>
            <Grid sm={6} md={6} lg={6} xs={6} item>
                <MarkDownTextBox className={classes.paper} onTextChange={handleText}/>
            </Grid>

            <Grid sm={6} md={6} lg={6} xs={6} item>
                <div>
                    <Markdown>
                        {markdownText}
                    </Markdown>
                </div>
            </Grid>

        </Grid>
    )
};


export default MarkDownEditor;