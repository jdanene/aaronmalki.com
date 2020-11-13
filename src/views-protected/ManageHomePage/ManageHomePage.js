import React, {useContext, useEffect, useRef, useState} from "react"
import {makeStyles} from '@material-ui/core/styles';
import BorderGuard from "../../components/BorderGuard/BorderGuard";
import {colorScheme} from "../../constants";
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from "@material-ui/core/Grid";
import HomePage from "../../views/HomePage/HomePage";
import Typography from "@material-ui/core/Typography";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ImageIcon from '@material-ui/icons/Image';
import Paper from '@material-ui/core/Paper';
import Divider from "@material-ui/core/Divider";
import PropTypes from 'prop-types';
import TextFormatIcon from '@material-ui/icons/TextFormat';
import TitleIcon from '@material-ui/icons/Title';
import FaceIcon from '@material-ui/icons/Face';
import PersonIcon from '@material-ui/icons/Person';
import FileDrop from "../../components/FileDrop/FileDrop";
import FileDropDialog from "../../components/FileDrop/FileDropDialog";
import BasicTextDialog from "./BasicTextDialog";
import MultiParagraphTextDialog from "./MultiParagraphTextDialog";
import {AppContext} from "../../context";
import {DB_NODES_PAGES} from "../../constants/contants";
import Button from '@material-ui/core/Button';
import multiPartTextArrayToDict from "../../components/Utility/multiPartTextArrayToDict";
import multiPartTextDictToArray from "../../components/Utility/multiPartTextDictToArray";
import {DB_KEYS_HOME_PAGE} from "../../constants/contants";

const useStyles = makeStyles((theme) => ({
    root:
        {
            display: "flex",
            alignContent: "center",
            alignItems: "center",
            width: '100%',
            backgroundColor: colorScheme.other,
            flexDirection: 'column',
            padding: theme.spacing(1)
        },
    edit_container: {
        marginRight: theme.spacing(2),
        marginBottom: theme.spacing(2),
        marginLeft: theme.spacing(2)
    },
    preview_container: {
        flexGrow: 1, display: 'flex', marginLeft: theme.spacing(2), flexDirection: 'column'


    },
    heading: {
        display: 'flex',
        width: '100%',
        justifyContent: 'space-between',
        margin: theme.spacing(4),
        marginBottom: theme.spacing(10),
        paddingLeft: theme.spacing(5),
        paddingRight: theme.spacing(5)
    },
    options: {
        width: '100%',
        marginBottom: theme.spacing(2)
    },
    options_container: {
        display: 'flex',
        flexGrow: 1,
        flexDirection: 'column'
    },
    preview: {
        border: '1px solid #00c093', padding: theme.spacing(2)
    }


}));

const SecondaryHeading = ({text}) => {

    return (
        <React.Fragment>
            <div style={{display: 'flex', alignItems: 'flex-start', flexDirection: 'column'}}>
                <Typography variant="h4" color="textSecondary" component="h4">{text}</Typography>

            </div>
            <Divider style={{marginBottom: '10px'}}/>
        </React.Fragment>
    )
};

const ListOption = ({node, text, callback, color}) => {
    const classes = useStyles();

    return (
        <Paper elevation={3} className={classes.options}>
            <ListItem button onClick={callback}>
                <ListItemAvatar>
                    <Avatar style={{backgroundColor: color}}>
                        <node.type/>
                    </Avatar>
                </ListItemAvatar>
                <ListItemText primary={text}/>
            </ListItem>
        </Paper>
    )
};

ListOption.propTypes = {
    node: PropTypes.node.isRequired,
    text: PropTypes.string.isRequired,
    callback: PropTypes.func.isRequired,
};

ListOption.defaultProps = {
    callback: () => {
        alert('Clicked!')
    }
};

const isInvalidAboutMe = (value) => {
    let pat = /^(?<part1>.*):(?<part2>.*)$/;

    let fail = false;
    if ('secondaryValues' in value) {
        Object.keys(value['secondaryValues']).forEach((key) => {
            if (!pat.exec(value['secondaryValues'][key])) {
                alert(`Reread instructions bitch! ${key} needs a semicolon. You lucky I put this check unless you would have crashed the website! Fix this: "${value['secondaryValues'][key]}"`)
                fail = true
            }

        });

    }
    return fail
};

const ManageHomePage = () => {
    const {
        pageState: {
            homePage,
            changeHomePageState

        },

    } = useContext(AppContext);

    const classes = useStyles();
    const [hasSavedState, setSavedState] = useState(false);

    // Save the initial state so we can go back
    const initialSavedState = useRef({});
    useEffect(() => {
        initialSavedState.current = {...homePage};
        setSavedState(true)
    }, []);

    // bools to open respective modulers
    const [openBackgroundUpload, setOpenBackgroundUpload] = useState(false);
    const [openProfileUpload, setOpenProfileUpload] = useState(false);
    const [openProfessionalTitle, setOpenProfessionalTitle] = useState(false);
    const [openAboutMe, setOpenAboutMe] = useState(false);
    const [openBigMiddleTitle, setOpenBigMiddleTitle] = useState(false);
    const [hasEdits, setEdits] = useState(false);


    // notify if user has edited anything
    useEffect(() => {
        if (JSON.stringify(homePage) !== JSON.stringify(initialSavedState.current)) {
            setEdits(true);
        } else {
            setEdits(false);
        }
    }, [homePage]);


    // all functions call this dispatch function
    const updateState = (key) => (value) => {

        if (key === DB_KEYS_HOME_PAGE.aboutMe) {
            if (isInvalidAboutMe(value))
                return
        }

        let newState;
        if (key === DB_KEYS_HOME_PAGE.aboutMe || key === DB_KEYS_HOME_PAGE.pageTitle) {
            // multipart text
            newState = {...homePage, [key]: multiPartTextDictToArray(value)};
        } else if (key === DB_KEYS_HOME_PAGE.profilePic || key === DB_KEYS_HOME_PAGE.backgroundPic) {
            // files
            newState = {...homePage, [key]: URL.createObjectURL(value[0])};
        } else {
            // in this case one line text
            newState = {...homePage, [key]: value}
        }
        changeHomePageState(newState);
    };

    return hasSavedState && <div className={classes.root}>
        <BorderGuard/>
        <CssBaseline/>

        {/*The Main Heading*/}
        <div className={classes.heading}>
            <Typography variant="h3" color="textPrimary" component="h3">Manage Home Page</Typography>

            <div style={{display: 'flex', flexDirection: 'column', height: 70, width: 270}}>

                {hasEdits && <React.Fragment>
                    <Typography variant="overline" display="block" gutterBottom style={{fontSize: 10}}>Confirm after
                        you finish all your edits</Typography>

                    <div style={{display: 'flex', justifyContent: 'space-around'}}>
                        <Button size={'large'} variant={'outlined'} onClick={() => {
                        }}>
                            Confirm
                        </Button>

                        <Button size={'large'} variant={'contained'} onClick={() => alert('canceld')}
                                color={'secondary'}>
                            Cancel
                        </Button>
                    </div>
                </React.Fragment>}

            </div>
        </div>

        <Grid container spacing={3} className={classes.edit_container} justify={'center'} alignContent={'center'}>
            {/*The Preview*/}
            <Grid xs={8} item className={classes.preview_container}>
                <SecondaryHeading text={'Page Preview'}/>
                <div className={classes.preview}>
                    <HomePage/>
                </div>
            </Grid>

            {/*The Editing Options*/}
            <Grid xs={3} item className={classes.options_container}>
                <SecondaryHeading text={'Editing Options'}/>

                <List className={classes.options} spacing={3}>
                    <ListOption text={"Big Title in Middle of Page"} node={TitleIcon} color={colorScheme.general.teal}
                                callback={() => setOpenBigMiddleTitle(true)}/>
                    <ListOption text={"Background Picture"} node={ImageIcon} color={colorScheme.general.green}
                                callback={() => setOpenBackgroundUpload(true)}/>
                    <ListOption text={"Face Shot"} node={FaceIcon} color={colorScheme.general.light_orange}
                                callback={() => setOpenProfileUpload(true)}/>
                    <ListOption text={"Professional Title"} node={TitleIcon} color={colorScheme.general.dark_purple}
                                callback={() => setOpenProfessionalTitle(true)}/>
                    <ListOption text={"About Me"} node={TextFormatIcon} color={colorScheme.general.light_blue0}
                                callback={() => setOpenAboutMe(true)}/>
                </List>
            </Grid>
        </Grid>


        {/*Background Picture*/}
        <FileDropDialog setOpen={setOpenBackgroundUpload} open={openBackgroundUpload}
                        fileCallback={updateState(DB_KEYS_HOME_PAGE.backgroundPic)}
                        dialogTitle={'Upload Background Picture'}/>
        {/*Profile Picture*/}
        <FileDropDialog setOpen={setOpenProfileUpload} open={openProfileUpload}
                        fileCallback={updateState(DB_KEYS_HOME_PAGE.profilePic)}
                        dialogTitle={'Upload Face Shot'}/>
        {/*Profile Professional Title*/}
        <BasicTextDialog
            label={'Professional Title'}
            setOpen={setOpenProfessionalTitle}
            open={openProfessionalTitle}
            confirmCallback={updateState(DB_KEYS_HOME_PAGE.professionalTitle)}
            dialogTitle={'Set Professional Title'}
            initial={homePage[DB_KEYS_HOME_PAGE.professionalTitle]}
        />
        {/*About Me*/}
        <MultiParagraphTextDialog
            initial={multiPartTextArrayToDict(homePage.aboutMe)}
            confirmCallback={updateState(DB_KEYS_HOME_PAGE.aboutMe)}
            open={openAboutMe}
            setOpen={setOpenAboutMe}
            dialogTitle={'Edit About Me'}
            mainLabel={'Main Paragraph'}
            secondaryLabel={'Bolded About Me (remember to include 1 semicolon)'}
            secondaryButtonLabel={'Add Bolded Field'}
            helperText={`To add extra fields to the about me section click the add button. Automatically the words that precede a semicolon will be bolded.
                        (e.g  <b>Favorite Restaurant</b>: Zellas on Beech Street!).`}
        />

        {/*Big MIddle Title*/}
        <MultiParagraphTextDialog
            initial={multiPartTextArrayToDict(homePage.pageTitle)}
            confirmCallback={updateState(DB_KEYS_HOME_PAGE.pageTitle)}
            open={openBigMiddleTitle}
            setOpen={setOpenBigMiddleTitle}
            dialogTitle={'Edit Big Text in Middle of Page'}
            mainLabel={'Line of Text'}
            secondaryLabel={'Line of Text'}
            secondaryButtonLabel={'Add New Line of Text'}
            helperText={`Edit the big middle title in the middle of the background pic. The number of lines determines how big/small letters will be so play around it. So one line with a lot of text will be smaller than one line with barely any text, so in this case you might want to split into two lines.`}
        />


    </div>

};

export default ManageHomePage;