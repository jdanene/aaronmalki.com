import React, {useContext, useEffect, useState, useRef} from "react"
import BorderGuard from "../../components/BorderGuard/BorderGuard";
import CssBaseline from '@material-ui/core/CssBaseline';
import {makeStyles} from '@material-ui/core/styles';
import Typography from "@material-ui/core/Typography";
import {AppContext} from "../../context";
import TextInput from "../ManageBlogPage/components/TextInput";
import Grid from "@material-ui/core/Grid";
import {colorScheme} from "../../constants";
import PropTypes from 'prop-types';
import {Divider} from '@material-ui/core';
import {PhoneInput} from "../ManageBlogPage/components/TextInput";
import ModalEditBusinessLocation from "./ModalEditBusinessLocation";
import Button from '@material-ui/core/Button';
import uploadSettingToDb from "../../components/Database/uploadSettingToDb";
import {DB_NODES_PAGES, DB_KEYS_SETTINGS_PAGE} from "../../constants/contants";
import uploadPageToDb from "../../components/Database/uploadPageToDb";
import isObjectEmpty from "../../components/Utility/isObjectEmpty";

const useStyles = makeStyles((theme) => ({

    item: {
        paddingBottom: theme.spacing(1),
        display: 'flex'
    },
    heading: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(0),
        display: 'flex',
        width: '100%',
        marginLeft: theme.spacing(10),
        marginRight: theme.spacing(10),
        //border:'1px solid red',
        paddingLeft: theme.spacing(10),
        paddingRight: theme.spacing(10),
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2),
        justifyContent: 'space-between',
        flexDirection: 'column',
        alignItems: 'flex-start'
    },
    divider: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start'
    },
    divider_text: {
        letterSpacing: 1,
        fontFamily: 'airbnb-bold'
    }
}));

const SelectionDivider = ({color, title}) => {
    const classes = useStyles();

    return <Grid item className={classes.divider}>
        <Typography style={{color}} variant="h5" component="h5" className={classes.divider_text}>{title}
        </Typography>
        <Divider light style={{width: '100%'}}/>
    </Grid>
};


SelectionDivider.propTypes = {
    color: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
};

const parsePhone = (pNumber) => {
    //input: +19097716881
    let pat = /^(\+1)?(?<area_code>\d{0,3})(?<central_code>\d{0,3})(?<subscribe_code>\d{0,4})(\d*)$/;
    const {groups: {area_code, central_code, subscribe_code}} = pat.exec(pNumber);

    let phoneNumber = {};
    phoneNumber.dash = `(${area_code}) ${central_code}-${subscribe_code}`;
    phoneNumber.dot = `${area_code}.${central_code}.${subscribe_code}`;
    phoneNumber.all_dash = `${area_code}-${central_code}-${subscribe_code}`;
    phoneNumber.tel = pNumber;

    return phoneNumber
};

const AdminSettingsPage = () => {

    const {
        pageState: {
            settings,
            changeSettings
        },
    } = useContext(AppContext);

    const classes = useStyles();

    // Save the initial state so we can go back
    const [hasSavedState, setSavedState] = useState(false);
    const initialSavedState = useRef({});
    useEffect(() => {
        initialSavedState.current = {...settings};
        setSavedState(true)
    }, []);



    const [companyName_, setCompanyName_] = useState(settings[DB_KEYS_SETTINGS_PAGE.companyName]);
    const [email_, setEmail_] = useState(settings[DB_KEYS_SETTINGS_PAGE.email]);
    const [phone_, setPhone_] = useState(settings[DB_KEYS_SETTINGS_PAGE.phoneNumber].tel);
    const [license_, setLicense_] = useState(settings[DB_KEYS_SETTINGS_PAGE.license]);
    const [address_, setAddress_] = useState(settings[DB_KEYS_SETTINGS_PAGE.address]);
    const [socialMedia_, setSocialMedia_] = useState(settings[DB_KEYS_SETTINGS_PAGE.socialMedia]);
    const [hasEdits, setEdits] = useState(false);

    const getState= (key)=>{
        return settings[key]
    };

    const setState = (key)=>(value)=>{
        changeSettings({...settings,[key]:value})
    };


    const [openEditAddress, setOpenEditAddress] = useState(false);

    // Cancel Button
    const cancelEdits = () => {
        changeSettings(initialSavedState.current);
    };

    // notify if user has edited anything
    useEffect(() => {
        if (!isObjectEmpty(initialSavedState.current)) {
            if (JSON.stringify(initialSavedState.current) !== JSON.stringify(settings)){
                setEdits(true);
            }else{
                setEdits(false);
            }
        }

    }, [settings]);

    // Update AppContext with new state
    const confirmCallback = () => {


        uploadPageToDb(settings, DB_KEYS_SETTINGS_PAGE, "[UploadSettingsToDb]", DB_NODES_PAGES.settings)
            .catch((e) => alert(`Could not upload settings to db: ${e}`))
            .then(() => {
                initialSavedState.current = settings;
                alert("Settings have changed! Reload if you don't see the effects immediately")
            });

    };

    // Call back for social media edits
    const handleSocial = (type) => (value) => {
        let socialMedia = settings[DB_KEYS_SETTINGS_PAGE.socialMedia];
        setState(DB_KEYS_SETTINGS_PAGE.socialMedia)({...socialMedia, [type]: value})
    };


    // Callback for ModalEditBusinessLocation
    const editAddressCreateCallback = (value) => {
        setState(DB_KEYS_SETTINGS_PAGE.address)(value)
    };


    const handleTelephone=(val)=>{
        setState(DB_KEYS_SETTINGS_PAGE.phoneNumber)(parsePhone(val))
    };

    return hasSavedState && <div style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: 'column',
        width: '100%'
    }}>
        <CssBaseline/>
        <BorderGuard/>
        <div className={classes.heading}>
            <div style={{display: 'flex', width: '100%', justifyContent: 'space-between'}}>
                <Typography variant="h3" color="textPrimary" component="h3">Settings & Personal Info</Typography>

                <div style={{display: 'flex', flexDirection: 'column', height: 70, width: 270}}>

                    {hasEdits && <React.Fragment>
                        <Typography variant="overline" display="block" gutterBottom style={{fontSize: 10}}>Confirm after
                            you finish all your edits</Typography>

                        <div style={{display: 'flex', justifyContent: 'space-around'}}>
                            <Button size={'large'} variant={'outlined'} onClick={confirmCallback}>
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


            <Grid container direction={'column'} className={classes.edit_container}>

                <SelectionDivider color={colorScheme.general.shabby_chic} title={'Personal Info'}/>

                <Grid item className={classes.item}>
                    <TextInput hasSecondaryColor label={'Company Name'} textCallback={setState(DB_KEYS_SETTINGS_PAGE.companyName)}
                               initial={getState(DB_KEYS_SETTINGS_PAGE.companyName)}/>
                </Grid>

                <Grid item className={classes.item}>
                    <TextInput hasSecondaryColor label={'Email Address'} textCallback={setState(DB_KEYS_SETTINGS_PAGE.email)} initial={getState(DB_KEYS_SETTINGS_PAGE.email)}/>
                </Grid>

                <Grid item className={classes.item}>
                    <PhoneInput hasSecondaryColor label={'Phone Number'} textCallback={handleTelephone} initial={getState(DB_KEYS_SETTINGS_PAGE.phoneNumber).tel}/>
                </Grid>

                <Grid item className={classes.item}>
                    <TextInput hasSecondaryColor label={'Calbre License#'} textCallback={setState(DB_KEYS_SETTINGS_PAGE.license)}
                               initial={getState(DB_KEYS_SETTINGS_PAGE.license)}/>
                </Grid>

                <Grid item className={classes.item}>
                    <TextInput onPress={() => setOpenEditAddress(true)} multiline hasSecondaryColor
                               label={'Business Location'} textCallback={() => {
                    }}
                               initial={`${getState(DB_KEYS_SETTINGS_PAGE.address).line1}\n${getState(DB_KEYS_SETTINGS_PAGE.address).line2}`}/>
                </Grid>


                <SelectionDivider color={colorScheme.general.fancy_pink} title={'Social Media'}/>
                <Grid item className={classes.item}>
                    <TextInput hasSecondaryColor label={'Facebook'} textCallback={handleSocial('facebook')}
                               initial={getState(DB_KEYS_SETTINGS_PAGE.socialMedia).facebook}/>
                </Grid>

                <Grid item className={classes.item}>
                    <TextInput hasSecondaryColor label={'Instagram'} textCallback={handleSocial('instagram')}
                               initial={getState(DB_KEYS_SETTINGS_PAGE.socialMedia).instagram}/>
                </Grid>

                <Grid item className={classes.item}>
                    <TextInput hasSecondaryColor label={'Linkedin'} textCallback={handleSocial('linkedin')}
                               initial={getState(DB_KEYS_SETTINGS_PAGE.socialMedia).linkedin}/>
                </Grid>
            </Grid>

        </div>

        <ModalEditBusinessLocation createCallback={editAddressCreateCallback} openCallback={setOpenEditAddress}
                                   open={openEditAddress} address={getState(DB_KEYS_SETTINGS_PAGE.address)}/>
    </div>

};

export default AdminSettingsPage;