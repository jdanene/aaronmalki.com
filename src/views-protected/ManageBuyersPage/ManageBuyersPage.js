import React, {useContext, useEffect, useRef, useState} from "react"
import BorderGuard from "../../components/BorderGuard/BorderGuard";
import {colorScheme} from "../../constants";
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from "@material-ui/core/Grid";
import BuyersPage from "../../views/BuyersPage/BuyersPage";
import Typography from "@material-ui/core/Typography";
import List from '@material-ui/core/List';
import ImageIcon from '@material-ui/icons/Image';
import TitleIcon from '@material-ui/icons/Title';
import FileDropDialog from "../../components/FileDrop/FileDropDialog";
import BasicTextDialog from "../../components/ManagePages/BasicTextDialog";
import MultiParagraphTextDialog from "../../components/ManagePages/MultiParagraphTextDialog";
import {AppContext} from "../../context";
import {DB_NODES_PAGES, DB_BUYERS_FORMATS, DB_FORMATS} from "../../constants/contants";
import Button from '@material-ui/core/Button';
import multiPartTextArrayToDict from "../../components/Utility/multiPartTextArrayToDict";
import {DB_KEYS_BUYERS_PAGE} from "../../constants/contants";
import LoadingModal from "../../components/ManagePages/LoadingModal";
import ManagePageListOption from "../../components/ManagePages/ManagePageListOption";
import SecondaryHeading from "../../components/ManagePages/SecondaryHeading"
import useStyles from "../../components/ManagePages/pageStyles"
import updateState from "../../components/ManagePages/updateState";
import confirmPageEdits from "../../components/ManagePages/confirmPageEdits";
import ContactPhoneIcon from '@material-ui/icons/ContactPhone';
import SubjectIcon from '@material-ui/icons/Subject';
import { ImParagraphRight, ImParagraphLeft } from "react-icons/im";
import { CgImage } from "react-icons/cg";



const ManageBuyersPage = () => {
    const {
        pageState: {
            buyersPage,
            changeBuyersPageState

        },

    } = useContext(AppContext);


    const classes = useStyles();

    // Save the initial state so we can go back
    const [hasSavedState, setSavedState] = useState(false);
    const initialSavedState = useRef({});
    useEffect(() => {
        initialSavedState.current = {...buyersPage};
        setSavedState(true)
    }, []);

    // Bools to tell if edits have happened or currently uploading
    const [hasEdits, setEdits] = useState(false);
    const [uploading, setUploading] = useState({open: false, finished: true});

    // bools to open respective dialogs: e.g DB_KEYS_BUYERS_PAGE keys
    const [openUploadDialog, setOpenUploadDialog] = useState({
        backgroundPic: false,
        formHeading: false,
        leftParagraph: false,
        leftPicture: false,
        leftTitle: false,
        pageTitle: false,
        rightParagraph: false,
        rightPicture: false,
        rightTitle: false
    });

    const handleOpenUploadDialog = (buyersPageAttribute) => (aBool) => {
        setOpenUploadDialog({...openUploadDialog, [buyersPageAttribute]: aBool})
    };
    const getOpenUploadDialog = (buyersPageAttribute) => {
        return openUploadDialog[buyersPageAttribute]
    };

    // Holds Files: uses DB_BUYERS_FORMATS to figure things out which attributes should be saved
    const picturesFiles = useRef({});

    // notify if user has edited anything
    useEffect(() => {
        if (JSON.stringify(buyersPage) !== JSON.stringify(initialSavedState.current)) {
            setEdits(true);
        } else {
            setEdits(false);
        }
    }, [buyersPage, initialSavedState]);

    //const updateState = (key) => (value) =>
    // Updates the state
    const refreshState = updateState(changeBuyersPageState, buyersPage, picturesFiles, DB_BUYERS_FORMATS);

    // returns the key'd state variable
    const getState = (key) => {
        return buyersPage[key]
    };

    // Cancel Button
    const cancelEdits = () => {
        changeBuyersPageState(initialSavedState.current)

    };

    // Confirm Button
    const confirmManageBuyerEdits = () => {
        confirmPageEdits(
            buyersPage,
            initialSavedState,
            uploading,
            setUploading,
            setEdits,
            DB_BUYERS_FORMATS,
            picturesFiles,
            DB_NODES_PAGES.buyersPage,
            DB_KEYS_BUYERS_PAGE,
            "[ManageBuyersPage]"
        ).catch((e) => alert(`Failed to upload edits, sorry! 😞\n${e}`))
    };

    // specifies styling for the edit buttions
    const listOptions = {
        backgroundPic: {
            text: "Background Picture",
            node: <CgImage/>,
            color: colorScheme.general.green,
            callback: () => handleOpenUploadDialog(DB_KEYS_BUYERS_PAGE.backgroundPic)(true)
        },
        formHeading: {
            text: "Title of Form",
            node: ContactPhoneIcon,
            color: colorScheme.general.light_orange,
            callback: () => handleOpenUploadDialog(DB_KEYS_BUYERS_PAGE.formHeading)(true)
        },
        leftParagraph: {
            text: "Left Paragraph",
            node: <ImParagraphLeft/>,
            color: colorScheme.general.dark_purple,
            callback: () => handleOpenUploadDialog(DB_KEYS_BUYERS_PAGE.leftParagraph)(true)
        },
        leftPicture: {
            text: "Left Picture",
            node: ImageIcon,
            color: colorScheme.general.fancy_pink,
            callback: () => handleOpenUploadDialog(DB_KEYS_BUYERS_PAGE.leftPicture)(true)
        },
        leftTitle: {
            text: "Left Title",
            node: TitleIcon,
            color: colorScheme.general.light_blue0,
            callback: () => handleOpenUploadDialog(DB_KEYS_BUYERS_PAGE.leftTitle)(true)
        },
        pageTitle: {
            text: "Big Title in Middle of Page",
            node: TitleIcon,
            color: colorScheme.general.teal,
            callback: () => handleOpenUploadDialog(DB_KEYS_BUYERS_PAGE.pageTitle)(true)
        },
        rightParagraph: {
            text: "Right Paragraph",
            node: <ImParagraphRight/>,
            color: colorScheme.general.oneMore_blue,
            callback: () => handleOpenUploadDialog(DB_KEYS_BUYERS_PAGE.rightParagraph)(true)
        },
        rightPicture: {
            text: "Right Picture",
            node: ImageIcon,
            color: colorScheme.general.bright_green,
            callback: () => handleOpenUploadDialog(DB_KEYS_BUYERS_PAGE.rightPicture)(true)
        },
        rightTitle: {
            text: "Right Title",
            node: TitleIcon,
            color: colorScheme.general.purp_purp,
            callback: () => handleOpenUploadDialog(DB_KEYS_BUYERS_PAGE.rightTitle)(true)
        }
    };

    const modalEditOptions = {
        backgroundPic: {
            format: DB_FORMATS.file,
            node: FileDropDialog,
            props: {
                dialogTitle: 'Upload Background Picture',
                fileCallback: refreshState(DB_KEYS_BUYERS_PAGE.backgroundPic),
                open: getOpenUploadDialog(DB_KEYS_BUYERS_PAGE.backgroundPic),
                setOpen: handleOpenUploadDialog(DB_KEYS_BUYERS_PAGE.backgroundPic),
                initialFiles:[ getState(DB_KEYS_BUYERS_PAGE.backgroundPic)]
            }
        },
        formHeading: {
            format: DB_FORMATS.plainText,
            node: BasicTextDialog,
            props: {
                label: 'Contact Form Title',
                open: getOpenUploadDialog(DB_KEYS_BUYERS_PAGE.formHeading),
                setOpen: handleOpenUploadDialog(DB_KEYS_BUYERS_PAGE.formHeading),
                confirmCallback: refreshState(DB_KEYS_BUYERS_PAGE.formHeading),
                dialogTitle: 'The heading on the contact form',
                initial: getState(DB_KEYS_BUYERS_PAGE.formHeading)
            }
        },
        leftParagraph: {
            format: DB_FORMATS.multiPartText,
            node: MultiParagraphTextDialog,
            props: {
                initial: multiPartTextArrayToDict(getState(DB_KEYS_BUYERS_PAGE.leftParagraph)),
                confirmCallback: refreshState(DB_KEYS_BUYERS_PAGE.leftParagraph),
                open: getOpenUploadDialog(DB_KEYS_BUYERS_PAGE.leftParagraph),
                setOpen: handleOpenUploadDialog(DB_KEYS_BUYERS_PAGE.leftParagraph),
                dialogTitle: 'Edit the text in the left paragraph',
                mainLabel: 'First Paragraph',
                secondaryLabel: 'nth Paragraph',
                secondaryButtonLabel: "Add More Paragraph's",
                helperText: "Add additional paragraphs by clicking the add button."
            }
        },
        leftPicture: {
            format: DB_FORMATS.file,
            node: FileDropDialog,
            props: {
                dialogTitle: 'Upload Picture on the left',
                fileCallback: refreshState(DB_KEYS_BUYERS_PAGE.leftPicture),
                open: getOpenUploadDialog(DB_KEYS_BUYERS_PAGE.leftPicture),
                setOpen: handleOpenUploadDialog(DB_KEYS_BUYERS_PAGE.leftPicture),
                initialFiles:[ getState(DB_KEYS_BUYERS_PAGE.leftPicture)]

            }
        },
        leftTitle: {
            format: DB_FORMATS.plainText,
            node: BasicTextDialog,
            props: {
                label: 'Left Title',
                open: getOpenUploadDialog(DB_KEYS_BUYERS_PAGE.leftTitle),
                setOpen: handleOpenUploadDialog(DB_KEYS_BUYERS_PAGE.leftTitle),
                confirmCallback: refreshState(DB_KEYS_BUYERS_PAGE.leftTitle),
                dialogTitle: 'Title attached to top of left paragraph',
                initial: getState(DB_KEYS_BUYERS_PAGE.leftTitle)
            }
        },
        pageTitle: {
            format: DB_FORMATS.multiPartText,
            node: MultiParagraphTextDialog,
            props: {
                initial: multiPartTextArrayToDict(getState(DB_KEYS_BUYERS_PAGE.pageTitle)),
                confirmCallback: refreshState(DB_KEYS_BUYERS_PAGE.pageTitle),
                open: getOpenUploadDialog(DB_KEYS_BUYERS_PAGE.pageTitle),
                setOpen: handleOpenUploadDialog(DB_KEYS_BUYERS_PAGE.pageTitle),
                dialogTitle: 'Edit Big Text in Middle of Page',
                mainLabel: 'Line of Text',
                secondaryLabel: 'Line of Text',
                secondaryButtonLabel: 'Add New Line of Text',
                helperText: `Edit the big middle title in the middle of the background pic. The number of lines determines how big/small letters will be so play around it. So one line with a lot of text will be smaller than one line with barely any text, so in this case you might want to split into two lines.`
            }
        },
        rightParagraph: {
            format: DB_FORMATS.multiPartText,
            node: MultiParagraphTextDialog,
            props: {
                initial: multiPartTextArrayToDict(getState(DB_KEYS_BUYERS_PAGE.rightParagraph)),
                confirmCallback: refreshState(DB_KEYS_BUYERS_PAGE.rightParagraph),
                open: getOpenUploadDialog(DB_KEYS_BUYERS_PAGE.rightParagraph),
                setOpen: handleOpenUploadDialog(DB_KEYS_BUYERS_PAGE.rightParagraph),
                dialogTitle: 'Edit the text in the right paragraph',
                mainLabel: 'First Paragraph',
                secondaryLabel: 'nth Paragraph',
                secondaryButtonLabel: "Add More Paragraph's",
                helperText: "Add additional paragraphs by clicking the add button."
            }
        },
        rightPicture: {
            format: DB_FORMATS.file,
            node: FileDropDialog,
            props: {
                dialogTitle: 'Upload Picture on the right',
                fileCallback: refreshState(DB_KEYS_BUYERS_PAGE.rightPicture),
                open: getOpenUploadDialog(DB_KEYS_BUYERS_PAGE.rightPicture),
                setOpen: handleOpenUploadDialog(DB_KEYS_BUYERS_PAGE.rightPicture),
                initialFiles:[ getState(DB_KEYS_BUYERS_PAGE.rightPicture)]
            }
        },
        rightTitle: {
            format: DB_FORMATS.plainText,
            node: BasicTextDialog,
            props: {
                label: 'Right Title',
                open: getOpenUploadDialog(DB_KEYS_BUYERS_PAGE.rightTitle),
                setOpen: handleOpenUploadDialog(DB_KEYS_BUYERS_PAGE.rightTitle),
                confirmCallback: refreshState(DB_KEYS_BUYERS_PAGE.rightTitle),
                dialogTitle: 'Title attached to top of right paragraph',
                initial: getState(DB_KEYS_BUYERS_PAGE.rightTitle)
            }
        }
    };


    return hasSavedState && <div className={classes.root}>
        <BorderGuard/>
        <CssBaseline/>

        {/*The Main Heading*/}
        <div className={classes.heading}>
            <Typography variant="h3" color="textPrimary" component="h3">Manage Buyers Page</Typography>

            <div style={{display: 'flex', flexDirection: 'column', height: 70, width: 270}}>

                {hasEdits && <React.Fragment>
                    <Typography variant="overline" display="block" gutterBottom style={{fontSize: 10}}>Confirm after
                        you finish all your edits</Typography>

                    <div style={{display: 'flex', justifyContent: 'space-around'}}>
                        <Button size={'large'} variant={'outlined'} onClick={confirmManageBuyerEdits}>
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
                    <BuyersPage/>
                </div>
            </Grid>

            <Grid xs={3} item className={classes.options_container}>
                <SecondaryHeading text={'Editing Options'}/>

                <List className={classes.options} spacing={3}>
                    {/*The Editing Options*/}
                    {Object.keys(listOptions).map((key) => {
                        return <ManagePageListOption key={key} {...listOptions[key]}/>
                    })}

                </List>
            </Grid>
        </Grid>


        {/*Individual Modals that pop up*/}
        {Object.keys(modalEditOptions).map((key) => {
            const Item = modalEditOptions[key].node;
            const props = modalEditOptions[key].props;
            return <React.Fragment>
                 {getOpenUploadDialog(key)&&<Item key={key} {...props} />}
            </React.Fragment>
        })}

        {/*Progress Icon*/}
        <LoadingModal state={uploading} page={'buyers page'} setState={setUploading}/>

    </div>

};


export default ManageBuyersPage;