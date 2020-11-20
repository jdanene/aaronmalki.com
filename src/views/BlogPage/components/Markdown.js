import React from 'react';
import ReactMarkdown from 'markdown-to-jsx';
import {withStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Video from "../../../components/Video/Video";

const styles = (theme) => ({
    listItem: {
        marginTop: theme.spacing(1),
    },
});

const options = {
    overrides: {
        Video: {
            component: Video
        },
        h1: {
            component: Typography,
            props: {
                gutterBottom: true,
                variant: 'h5',
                component: 'h1'
            },
        },
        h2: {component: Typography, props: {gutterBottom: true, variant: 'h6', component: 'h2'}},
        h3: {component: Typography, props: {gutterBottom: true, variant: 'subtitle1', component: 'h3'}},
        h4: {
            component: Typography,
            props: {gutterBottom: true, variant: 'subtitle2', component: 'h4'},
        },
        h6: {
            component: Typography,
            props: {gutterBottom: true, variant: 'subtitle2', component: 'h6'},
        },
        h5: {
            component: Typography,
            props: {gutterBottom: true, variant: 'subtitle2', component: 'h5'},
        },
        p: {component: Typography, props: {variant: 'body1', component: 'span'}},
        a: {component: Link},
        li: {
            component: withStyles(styles)(({classes, variant, ...props}) => (
                <li className={classes.listItem}>
                    <Typography variant={variant}/>
                </li>
            )),
        },
    },
};

export default function Markdown(props) {
    return <ReactMarkdown key={'markdown'} test-id={'markdown'} options={options} {...props} />;
}