import React, {useContext, useEffect, useRef, useState} from "react"
import BorderGuard from "../../components/BorderGuard/BorderGuard";
import {colorScheme} from "../../constants";
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from "@material-ui/core/Grid";
import LeasePage from "../../views/LeasePage/LeasePage";
import Typography from "@material-ui/core/Typography";
import List from '@material-ui/core/List';
import TitleIcon from '@material-ui/icons/Title';
import FileDropDialog from "../../components/FileDrop/FileDropDialog";
import BasicTextDialog from "../../components/ManagePages/BasicTextDialog";
import MultiParagraphTextDialog from "../../components/ManagePages/MultiParagraphTextDialog";
import {AppContext} from "../../context";
import {DB_FORMATS, DB_KEYS_LEASE_PAGE, DB_LEASE_FORMATS, DB_NODES_PAGES} from "../../constants/contants";
import Button from '@material-ui/core/Button';
import multiPartTextArrayToDict from "../../components/Utility/multiPartTextArrayToDict";
import LoadingModal from "../../components/ManagePages/LoadingModal";
import ManagePageListOption from "../../components/ManagePages/ManagePageListOption";
import SecondaryHeading from "../../components/ManagePages/SecondaryHeading"
import useStyles from "../../components/ManagePages/pageStyles"
import updateState from "../../components/ManagePages/updateState";
import confirmPageEdits from "../../components/ManagePages/confirmPageEdits";
import ContactPhoneIcon from '@material-ui/icons/ContactPhone';
import {ImParagraphLeft, ImParagraphRight} from "react-icons/im";
import {CgImage} from "react-icons/cg";
import {IoIosImages} from "react-icons/io";
import {MdTextFields} from "react-icons/md"
import {BsTextRight} from "react-icons/bs"
import {GiConqueror} from "react-icons/gi"

const ManageLeasePage = () => {
    const {
        pageState: {
            leasePage,
            changeLeasePageState

        },

    } = useContext(AppContext);


    const classes = useStyles();

    // Save the initial state so we can go back
    const [hasSavedState, setSavedState] = useState(false);
    const initialSavedState = useRef({});
    useEffect(() => {
        initialSavedState.current = {...leasePage};
        setSavedState(true)
    }, []);

    // Bools to tell if edits have happened or currently uploading
    const [hasEdits, setEdits] = useState(false);
    const [uploading, setUploading] = useState({open: false, finished: true});

    // bools to open respective dialogs: e.g DB_KEYS_LEASE_PAGE keys
    const [openUploadDialog, setOpenUploadDialog] = useState({
        [DB_KEYS_LEASE_PAGE.pageTitle]: false,
        [DB_KEYS_LEASE_PAGE.backgroundPic]: false,
        [DB_KEYS_LEASE_PAGE.imageCarousel]: false,
        [DB_KEYS_LEASE_PAGE.mainRightTitle]: false,
        [DB_KEYS_LEASE_PAGE.mainRightParagraph]: false,
        [DB_KEYS_LEASE_PAGE.secondaryRightTitle]: false,
        [DB_KEYS_LEASE_PAGE.secondaryRightParagraph]: false,
        [DB_KEYS_LEASE_PAGE.mainLeftTitle]: false,
        [DB_KEYS_LEASE_PAGE.mainLeftParagraph]: false,
        [DB_KEYS_LEASE_PAGE.formHeading]: false
    });

    const handleOpenUploadDialog = (leasePageAttribute) => (aBool) => {
        setOpenUploadDialog({...openUploadDialog, [leasePageAttribute]: aBool})
    };
    const getOpenUploadDialog = (leasePageAttribute) => {
        return openUploadDialog[leasePageAttribute]
    };

    // Holds Files: uses DB_BUYERS_FORMATS to figure things out which attributes should be saved
    const picturesFiles = useRef({});

    // notify if user has edited anything
    useEffect(() => {
        if (JSON.stringify(leasePage) !== JSON.stringify(initialSavedState.current)) {
            setEdits(true);
        } else {
            setEdits(false);
        }
    }, [leasePage, initialSavedState]);

    //const updateState = (key) => (value) =>
    // Updates the state
    const refreshState = updateState(changeLeasePageState, leasePage, picturesFiles, DB_LEASE_FORMATS);

    // returns the key'd state variable
    const getState = (key) => {
        return leasePage[key]
    };

    // Cancel Button
    const cancelEdits = () => {
        changeLeasePageState(initialSavedState.current)

    };

    // Confirm Button
    const confirmManageBuyerEdits = () => {
        confirmPageEdits(
            leasePage,
            initialSavedState,
            uploading,
            setUploading,
            setEdits,
            DB_LEASE_FORMATS,
            picturesFiles,
            DB_NODES_PAGES.leasePage,
            DB_KEYS_LEASE_PAGE,
            "[ManageLeasePage]"
        ).catch((e) => alert(`Failed to upload edits, sorry! 😞\n${e}`))
    };


    // specifies styling for the edit buttions
    const listOptions = {
        [DB_KEYS_LEASE_PAGE.backgroundPic]: {
            text: "Background Picture",
            node: <CgImage/>,
            color: colorScheme.general.light_light_teal,
            callback: () => handleOpenUploadDialog(DB_KEYS_LEASE_PAGE.backgroundPic)(true)
        },
        [DB_KEYS_LEASE_PAGE.pageTitle]: {
            text: "Big Title in Middle of Page",
            node: <GiConqueror/>,
            color: colorScheme.general.punch,
            callback: () => handleOpenUploadDialog(DB_KEYS_LEASE_PAGE.pageTitle)(true)
        },
        [DB_KEYS_LEASE_PAGE.imageCarousel]: {
            text: "Image Carousel",
            node: <IoIosImages/>,
            color: colorScheme.general.bright_green,
            callback: () => handleOpenUploadDialog(DB_KEYS_LEASE_PAGE.imageCarousel)(true)
        },
        [DB_KEYS_LEASE_PAGE.mainRightTitle]: {
            text: "Main Right Title",
            node: TitleIcon,
            color: colorScheme.general.light_orange ,
            callback: () => handleOpenUploadDialog(DB_KEYS_LEASE_PAGE.mainRightTitle)(true)
        },
        [DB_KEYS_LEASE_PAGE.mainRightParagraph]: {
            text: "Main Right Paragraph",
            node: <ImParagraphRight/>,
            color: colorScheme.general.light_blue0,
            callback: () => handleOpenUploadDialog(DB_KEYS_LEASE_PAGE.mainRightParagraph)(true)
        },
        [DB_KEYS_LEASE_PAGE.secondaryRightTitle]: {
            text: "Secondary Right Title",
            node: <MdTextFields/>,
            color: colorScheme.general.teal,
            callback: () => handleOpenUploadDialog(DB_KEYS_LEASE_PAGE.secondaryRightTitle)(true)
        },
        [DB_KEYS_LEASE_PAGE.secondaryRightParagraph]: {
            text: "Secondary Right Paragraph",
            node: <BsTextRight/>,
            color: colorScheme.general.shabby_chic,
            callback: () => handleOpenUploadDialog(DB_KEYS_LEASE_PAGE.secondaryRightParagraph)(true)
        },
        [DB_KEYS_LEASE_PAGE.mainLeftTitle]: {
            text: "Main Left Title",
            node: TitleIcon,
            color: colorScheme.general.pink,
            callback: () => handleOpenUploadDialog(DB_KEYS_LEASE_PAGE.mainLeftTitle)(true)
        },
        [DB_KEYS_LEASE_PAGE.mainLeftParagraph]: {
            text: "Main Left Paragraph",
            node: <ImParagraphLeft/>,
            color: colorScheme.general.dark_purple,
            callback: () => handleOpenUploadDialog(DB_KEYS_LEASE_PAGE.mainLeftParagraph)(true)
        },
        [DB_KEYS_LEASE_PAGE.formHeading]: {
            text: "Title of Contact Form",
            node: ContactPhoneIcon,
            color: colorScheme.general.coral_orange,
            callback: () => handleOpenUploadDialog(DB_KEYS_LEASE_PAGE.formHeading)(true)
        },
    };


    const modalEditOptions = {
        [DB_KEYS_LEASE_PAGE.backgroundPic]: {
            format: DB_FORMATS.file,
            node: FileDropDialog,
            props: {
                dialogTitle: 'Upload Background Picture',
                fileCallback: refreshState(DB_KEYS_LEASE_PAGE.backgroundPic),
                open: getOpenUploadDialog(DB_KEYS_LEASE_PAGE.backgroundPic),
                setOpen: handleOpenUploadDialog(DB_KEYS_LEASE_PAGE.backgroundPic),
                initialFiles: [getState(DB_KEYS_LEASE_PAGE.backgroundPic)]
            }
        },
        [DB_KEYS_LEASE_PAGE.formHeading]: {
            format: DB_FORMATS.plainText,
            node: BasicTextDialog,
            props: {
                label: 'Contact Form Title',
                open: getOpenUploadDialog(DB_KEYS_LEASE_PAGE.formHeading),
                setOpen: handleOpenUploadDialog(DB_KEYS_LEASE_PAGE.formHeading),
                confirmCallback: refreshState(DB_KEYS_LEASE_PAGE.formHeading),
                dialogTitle: 'The heading on the contact form',
                initial: getState(DB_KEYS_LEASE_PAGE.formHeading)
            }
        },
        [DB_KEYS_LEASE_PAGE.pageTitle]: {
            format: DB_FORMATS.multiPartText,
            node: MultiParagraphTextDialog,
            props: {
                initial: multiPartTextArrayToDict(getState(DB_KEYS_LEASE_PAGE.pageTitle)),
                confirmCallback: refreshState(DB_KEYS_LEASE_PAGE.pageTitle),
                open: getOpenUploadDialog(DB_KEYS_LEASE_PAGE.pageTitle),
                setOpen: handleOpenUploadDialog(DB_KEYS_LEASE_PAGE.pageTitle),
                dialogTitle: 'Edit Big Text in Middle of Page',
                mainLabel: 'Line of Text',
                secondaryLabel: 'Line of Text',
                secondaryButtonLabel: 'Add New Line of Text',
                helperText: `Edit the big middle title in the middle of the background pic. The number of lines determines how big/small letters will be so play around it. So one line with a lot of text will be smaller than one line with barely any text, so in this case you might want to split into two lines.`
            }
        },

        [DB_KEYS_LEASE_PAGE.imageCarousel]: {
            format: DB_FORMATS.fileArray,
            node: FileDropDialog,
            props: {
                dialogTitle: 'Upload Multiple Pictures for Image Carousel',
                fileCallback: refreshState(DB_KEYS_LEASE_PAGE.imageCarousel),
                open: getOpenUploadDialog(DB_KEYS_LEASE_PAGE.imageCarousel),
                setOpen: handleOpenUploadDialog(DB_KEYS_LEASE_PAGE.imageCarousel),
                initialFiles: [getState(DB_KEYS_LEASE_PAGE.imageCarousel)],
                filesLimit: 20,

            }
        },
        [DB_KEYS_LEASE_PAGE.mainRightTitle]: {
            format: DB_FORMATS.plainText,
            node: BasicTextDialog,
            props: {
                label: 'Main Right  Title',
                open: getOpenUploadDialog(DB_KEYS_LEASE_PAGE.mainRightTitle),
                setOpen: handleOpenUploadDialog(DB_KEYS_LEASE_PAGE.mainRightTitle),
                confirmCallback: refreshState(DB_KEYS_LEASE_PAGE.mainRightTitle),
                dialogTitle: 'Title on top of main right paragraph',
                initial: getState(DB_KEYS_LEASE_PAGE.mainRightTitle)
            }
        },
        [DB_KEYS_LEASE_PAGE.mainRightParagraph]: {
            format: DB_FORMATS.multiPartText,
            node: MultiParagraphTextDialog,
            props: {
                initial: multiPartTextArrayToDict(getState(DB_KEYS_LEASE_PAGE.mainRightParagraph)),
                confirmCallback: refreshState(DB_KEYS_LEASE_PAGE.mainRightParagraph),
                open: getOpenUploadDialog(DB_KEYS_LEASE_PAGE.mainRightParagraph),
                setOpen: handleOpenUploadDialog(DB_KEYS_LEASE_PAGE.mainRightParagraph),
                dialogTitle: 'Edit  main/primary paragraph on the right',
                mainLabel: 'Paragraph',
                secondaryLabel: 'Additional Paragraph',
                secondaryButtonLabel: 'Additional Paragraph',
                helperText: `Edit Text for the main/primary paragraph on the right. `
            }
        },
        [DB_KEYS_LEASE_PAGE.secondaryRightTitle]: {
            format: DB_FORMATS.plainText,
            node: BasicTextDialog,
            props: {
                label: 'Right Secondary Title',
                open: getOpenUploadDialog(DB_KEYS_LEASE_PAGE.secondaryRightTitle),
                setOpen: handleOpenUploadDialog(DB_KEYS_LEASE_PAGE.secondaryRightTitle),
                confirmCallback: refreshState(DB_KEYS_LEASE_PAGE.secondaryRightTitle),
                dialogTitle: 'Edit Secondary Title of Right Side Paragraph',
                initial: getState(DB_KEYS_LEASE_PAGE.secondaryRightTitle)
            }
        },

        [DB_KEYS_LEASE_PAGE.secondaryRightParagraph]: {
            format: DB_FORMATS.multiPartText,
            node: MultiParagraphTextDialog,
            props: {
                initial: multiPartTextArrayToDict(getState(DB_KEYS_LEASE_PAGE.secondaryRightParagraph)),
                confirmCallback: refreshState(DB_KEYS_LEASE_PAGE.secondaryRightParagraph),
                open: getOpenUploadDialog(DB_KEYS_LEASE_PAGE.secondaryRightParagraph),
                setOpen: handleOpenUploadDialog(DB_KEYS_LEASE_PAGE.secondaryRightParagraph),
                dialogTitle: 'Edit the text in the secondary right paragraph',
                mainLabel: 'Paragraph',
                secondaryLabel: 'Additional Paragraph',
                secondaryButtonLabel: "Additional Paragraph",
                helperText: "Edit text of the secondary paragraph on the right.(The paragraph below the main paragraph on the right) Add additional paragraphs to this paragraph by clicking the add button."
            }
        },
        [DB_KEYS_LEASE_PAGE.mainLeftTitle]: {
            format: DB_FORMATS.plainText,
            node: BasicTextDialog,
            props: {
                label: 'Main Left Title',
                open: getOpenUploadDialog(DB_KEYS_LEASE_PAGE.mainLeftTitle),
                setOpen: handleOpenUploadDialog(DB_KEYS_LEASE_PAGE.mainLeftTitle),
                confirmCallback: refreshState(DB_KEYS_LEASE_PAGE.mainLeftTitle),
                dialogTitle: 'Title attached to top of left paragraph',
                initial: getState(DB_KEYS_LEASE_PAGE.mainLeftTitle)
            }
        },
        [DB_KEYS_LEASE_PAGE.mainLeftParagraph]: {
            format: DB_FORMATS.multiPartText,
            node: MultiParagraphTextDialog,
            props: {
                initial: multiPartTextArrayToDict(getState(DB_KEYS_LEASE_PAGE.mainLeftParagraph)),
                confirmCallback: refreshState(DB_KEYS_LEASE_PAGE.mainLeftParagraph),
                open: getOpenUploadDialog(DB_KEYS_LEASE_PAGE.mainLeftParagraph),
                setOpen: handleOpenUploadDialog(DB_KEYS_LEASE_PAGE.mainLeftParagraph),
                dialogTitle: 'Edit the text in the left paragraph',
                mainLabel: 'Paragraph',
                secondaryLabel: 'Additional Paragraph',
                secondaryButtonLabel: "Add Additional Paragraph",
                helperText: "Add additional paragraphs by clicking the add button."
            }
        },

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
                    <LeasePage/>
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
                {getOpenUploadDialog(key) && <Item key={key} {...props} />}
            </React.Fragment>
        })}

        {/*Progress Icon*/}
        <LoadingModal state={uploading} page={'lease page'} setState={setUploading}/>

    </div>

};


export default ManageLeasePage;