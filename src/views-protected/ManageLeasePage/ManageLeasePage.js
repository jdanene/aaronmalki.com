import React, {useContext, useEffect, useRef, useState} from "react"
import BorderGuard from "../../components/BorderGuard/BorderGuard";
import {colorScheme} from "../../constants";
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from "@material-ui/core/Grid";
import LeasePage from "../../views/LeasePage/LeasePage";
import Typography from "@material-ui/core/Typography";
import List from '@material-ui/core/List';
import ImageIcon from '@material-ui/icons/Image';
import TextFormatIcon from '@material-ui/icons/TextFormat';
import TitleIcon from '@material-ui/icons/Title';
import FaceIcon from '@material-ui/icons/Face';
import FileDropDialog from "../../components/FileDrop/FileDropDialog";
import BasicTextDialog from "../../components/ManagePages/BasicTextDialog";
import MultiParagraphTextDialog from "../../components/ManagePages/MultiParagraphTextDialog";
import {AppContext} from "../../context";
import {DB_NODES_PAGES} from "../../constants/contants";
import Button from '@material-ui/core/Button';
import multiPartTextArrayToDict from "../../components/Utility/multiPartTextArrayToDict";
import multiPartTextDictToArray from "../../components/Utility/multiPartTextDictToArray";
import {DB_KEYS_HOME_PAGE} from "../../constants/contants";
import uploadPageToDb from "../../components/Database/uploadPageToDb";
import uploadImgToDbEasy from "../../components/Database/uploadImgToDbEasy";
import LoadingModal from "../../components/ManagePages/LoadingModal";
import ManagePageListOption from "../../components/ManagePages/ManagePageListOption";
import SecondaryHeading from "../../components/ManagePages/SecondaryHeading"
import isInvalidAboutMe from "../ManageHomePage/isInvalidAboutMe"
import useStyles from "../../components/ManagePages/pageStyles"

const ManageLeasePage = () => {
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
    const [uploading, setUploading] = useState({open:false,finished:false})


    // Holds Files
    const backgroundImg = useRef(null);
    const profileImg = useRef(null);

    // notify if user has edited anything
    useEffect(() => {
        if (JSON.stringify(homePage) !== JSON.stringify(initialSavedState.current)) {
            setEdits(true);
        } else {
            setEdits(false);
        }
    }, [homePage,initialSavedState]);


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
            // files -- save them in case need to upload
            if (key === DB_KEYS_HOME_PAGE.profilePic) {
                profileImg.current = value[0];
            } else {
                backgroundImg.current = value[0];
            }

            newState = {...homePage, [key]: URL.createObjectURL(value[0])};
        } else {
            // in this case one line text
            newState = {...homePage, [key]: value}
        }

        // let state know about changes
        changeHomePageState(newState);
    };

    // Confirm & Cancel Button
    const cancelEdits = () => {
        changeHomePageState(initialSavedState.current)

    };

    const confirmEdits = () => {
        //open upload dialog
        setUploading({...uploading,open:true});

        let _state = {...homePage};
        _state.aboutMe = multiPartTextArrayToDict(_state.aboutMe);
        _state.pageTitle = multiPartTextArrayToDict(_state.pageTitle);


        if (backgroundImg.current != null && profileImg.current != null) {

            uploadImgToDbEasy(DB_NODES_PAGES.homePage,backgroundImg.current,profileImg.current )
                .then((urls)=>{
                    _state[DB_KEYS_HOME_PAGE.backgroundPic] = urls[0];
                    _state[DB_KEYS_HOME_PAGE.profilePic] = urls[1];
                    uploadPageToDb(_state, DB_KEYS_HOME_PAGE, "[UploadHomeToDb]").then(() => setUploading({open:true,finished:true}))
                });

        } else if (backgroundImg.current != null) {
            uploadImgToDbEasy(DB_NODES_PAGES.homePage, backgroundImg.current ).then((urls) => {
                _state[DB_KEYS_HOME_PAGE.backgroundPic] = urls[0];
                uploadPageToDb(_state, DB_KEYS_HOME_PAGE, "[UploadHomeToDb]").then(() => setUploading({open:true,finished:true}))
            })
        } else if (profileImg.current != null) {
            uploadImgToDbEasy(DB_NODES_PAGES.homePage, profileImg.current ).then((urls) => {
                _state[DB_KEYS_HOME_PAGE.profilePic] = urls[0];
                uploadPageToDb(_state, DB_KEYS_HOME_PAGE, "[UploadHomeToDb]").then(() => setUploading({open:true,finished:true}))
            })
        }else{
            uploadPageToDb(_state, DB_KEYS_HOME_PAGE, "[UploadHomeToDb]").then(() => setUploading({open:true,finished:true}))
        }

        // set the saved state to new homePageState
        initialSavedState.current = {...homePage};
        setEdits(false)

    };

    return hasSavedState && <div className={classes.root}>
        <BorderGuard/>
        <CssBaseline/>

        {/*The Main Heading*/}
        <div className={classes.heading}>
            <Typography variant="h3" color="textPrimary" component="h3">Manage Lease Page</Typography>

            <div style={{display: 'flex', flexDirection: 'column', height: 70, width: 270}}>

                {hasEdits && <React.Fragment>
                    <Typography variant="overline" display="block" gutterBottom style={{fontSize: 10}}>Confirm after
                        you finish all your edits</Typography>

                    <div style={{display: 'flex', justifyContent: 'space-around'}}>
                        <Button size={'large'} variant={'outlined'} onClick={confirmEdits}>
                            Confirm
                        </Button>

                        <Button size={'large'} variant={'contained'} onClick={cancelEdits}
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
                    <LeasePage/>
                </div>
            </Grid>

            {/*The Editing Options*/}
            <Grid xs={3} item className={classes.options_container}>
                <SecondaryHeading text={'Editing Options'}/>

                <List className={classes.options} spacing={3}>
                    <ManagePageListOption text={"Big Title in Middle of Page"} node={TitleIcon} color={colorScheme.general.teal}
                                callback={() => setOpenBigMiddleTitle(true)}/>
                    <ManagePageListOption text={"Background Picture"} node={ImageIcon} color={colorScheme.general.green}
                                callback={() => setOpenBackgroundUpload(true)}/>
                    <ManagePageListOption text={"Face Shot"} node={FaceIcon} color={colorScheme.general.light_orange}
                                callback={() => setOpenProfileUpload(true)}/>
                    <ManagePageListOption text={"Professional Title"} node={TitleIcon} color={colorScheme.general.dark_purple}
                                callback={() => setOpenProfessionalTitle(true)}/>
                    <ManagePageListOption text={"About Me"} node={TextFormatIcon} color={colorScheme.general.light_blue0}
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


        {/*Progress Icon*/}
        <LoadingModal state={uploading} page={'home page'} setState={setUploading}/>

    </div>

};

export default ManageLeasePage;