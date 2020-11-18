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
import {DB_NODES_PAGES, DB_KEYS_SETTINGS_PAGE, PUBLIC_PAGE_KEYS} from "../../constants/contants";
import uploadPageToDb from "../../components/Database/uploadPageToDb";
import isObjectEmpty from "../../components/Utility/isObjectEmpty";
import Box from "@material-ui/core/Box";
import Paper from '@material-ui/core/Paper';


const useStyles = makeStyles((theme) => ({

    item: {
        paddingBottom: theme.spacing(1),
        display: 'flex',
        width:'100%'
    },
    seo_item: {
        paddingBottom: theme.spacing(1),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        marginBottom: theme.spacing(3)
    },

    heading: {
        marginTop: theme.spacing(2),
        display: 'flex',
        width: '100%',
        marginLeft: theme.spacing(10),
        marginRight: theme.spacing(10),
        paddingLeft: theme.spacing(10),
        paddingRight: theme.spacing(10),
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2),
        justifyContent: 'space-between',
        flexDirection: 'column',
        alignItems: 'flex-start',

    },
    edit_wrapper:{
        overflowY: 'scroll',
        padding: theme.spacing(3),
        paddingTop:0,
        border:`1px solid rgba(255,255,255,.15)`,
        borderRadius:4,
        maxHeight:'75vh',
        width:'100%',
        marginTop:theme.spacing(1),
        marginBottom: theme.spacing(2)
    },
    edit_container:{
        width:'100%',
        height:'100%',
        flexDirection:'column'

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

const SelectionDivider = ({color, title, description}) => {
    const classes = useStyles();

    return <Grid item className={classes.divider}>
        <Typography style={{color}} variant="h5" component="h5" className={classes.divider_text}>{title}
        </Typography>
        {description&&<Typography  variant="subtitle1" component="p" color={"textSecondary"} >{description}</Typography>}
        <Divider light style={{width: '100%'}}/>
    </Grid>
};

const SEO = ({textCallback, payload, _key}) => {
    const classes = useStyles();

            //  "news": {
        //            "title": "Malki Real Estate",
        //           "description": "Malki Real Estate Be Best"
        //        },

    const callbackTitle =(value,blog_category=null)=>{
         if (_key === PUBLIC_PAGE_KEYS.BlogPage) {
             textCallback({[blog_category]:{...payload[blog_category],title:value}})

         }else{
             textCallback({...payload,title:value})
         }

    };

    const callbackDescription = (value,blog_category=null)=>{
        if (_key === PUBLIC_PAGE_KEYS.BlogPage) {
            textCallback({[blog_category]:{...payload[blog_category],description:value}})
         }else{
            textCallback({...payload,description:value})
         }
    };

    if (_key === PUBLIC_PAGE_KEYS.BlogPage) {
        return Object.keys(payload).map(((category) => {
            return <Box item className={classes.seo_item} key={`${_key}:${category}`}>
            <Typography style={{color:colorScheme.general.purp_purp}} variant="subtitle1" component="p"
                        className={classes.divider_text}>{_key}: {category}</Typography>

            <TextInput hasSecondaryColor label={'Title'} textCallback={(value)=>callbackTitle(value,category)}
                       multiline initial={payload[category].title}/>
            <TextInput hasSecondaryColor label={'Description'} textCallback={(value)=>callbackDescription(value,category)}
                       multiline initial={payload[category].description}/>
        </Box>
        }))

    } else {
        return <Box item className={classes.seo_item} key={_key}>
            <Typography style={{color:colorScheme.general.purp_purp}} variant="subtitle1" component="p"
                        className={classes.divider_text}>{_key}</Typography>

            <TextInput hasSecondaryColor label={'Title'} textCallback={callbackTitle}
                       multiline initial={payload.title}/>
            <TextInput hasSecondaryColor label={'Description'} textCallback={callbackDescription}
                       multiline initial={payload.description}/>
        </Box>
    }


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


    const [hasEdits, setEdits] = useState(false);

    const getState = (key) => {
        return settings[key]
    };

    const setState = (key) => (value) => {
        changeSettings({...settings, [key]: value})
    };


    const [openEditAddress, setOpenEditAddress] = useState(false);

    // Cancel Button
    const cancelEdits = () => {
        changeSettings(initialSavedState.current);
    };

    // notify if user has edited anything
    useEffect(() => {
        if (!isObjectEmpty(initialSavedState.current)) {
            if (JSON.stringify(initialSavedState.current) !== JSON.stringify(settings)) {
                setEdits(true);
            } else {
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
                setEdits(false);
                alert("Settings have changed! Reload if you don't see the effects immediately")
            });

    };

    // Call back for social media edits
    const handleSocial = (type) => (value) => {
        let socialMedia = settings[DB_KEYS_SETTINGS_PAGE.socialMedia];
        setState(DB_KEYS_SETTINGS_PAGE.socialMedia)({...socialMedia, [type]: value})
    };

    const handleSEO = (type) => (value) => {
        // type is in PUBLIC_PAGE_KEYS
        let seo = settings[DB_KEYS_SETTINGS_PAGE.seo];

        //  "news": {
        //            "title": "Malki Real Estate",
        //           "description": "Malki Real Estate Be Best"
        //        },
        if (type === PUBLIC_PAGE_KEYS.BlogPage) {
            let seo_blog_page = seo[type];
            setState(DB_KEYS_SETTINGS_PAGE.seo)({...seo, [type]: {...seo_blog_page, ...value}})

        } else {
            // {
            //       "title": "Malki Real Estate",
            //       "description": "Malki Real Estate Be Best"
            //  },
            setState(DB_KEYS_SETTINGS_PAGE.seo)({...seo, [type]: {...value}})
        }
    };


    // Callback for ModalEditBusinessLocation
    const editAddressCreateCallback = (value) => {
        setState(DB_KEYS_SETTINGS_PAGE.address)(value)
    };


    const handleTelephone = (val) => {
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


            <div className={classes.edit_wrapper} elevation={3}>
            <Box container direction={'column'} className={classes.edit_container}>

                <SelectionDivider color={colorScheme.general.shabby_chic} title={'Personal Info'}/>

                <Box item className={classes.item}>
                    <TextInput hasSecondaryColor label={'Company Name'}
                               textCallback={setState(DB_KEYS_SETTINGS_PAGE.companyName)}
                               initial={getState(DB_KEYS_SETTINGS_PAGE.companyName)}/>
                </Box>

                <Box item className={classes.item}>
                    <TextInput hasSecondaryColor label={'Email Address'}
                               textCallback={setState(DB_KEYS_SETTINGS_PAGE.email)}
                               initial={getState(DB_KEYS_SETTINGS_PAGE.email)}/>
                </Box>

                <Box item className={classes.item}>
                    <PhoneInput hasSecondaryColor label={'Phone Number'} textCallback={handleTelephone}
                                initial={getState(DB_KEYS_SETTINGS_PAGE.phoneNumber).tel}/>
                </Box>

                <Box item className={classes.item}>
                    <TextInput hasSecondaryColor label={'Calbre License#'}
                               textCallback={setState(DB_KEYS_SETTINGS_PAGE.license)}
                               initial={getState(DB_KEYS_SETTINGS_PAGE.license)}/>
                </Box>

                <Box item className={classes.item}>
                    <TextInput onPress={() => setOpenEditAddress(true)} multiline hasSecondaryColor
                               label={'Business Location'} textCallback={() => {
                    }}
                               initial={`${getState(DB_KEYS_SETTINGS_PAGE.address).line1}\n${getState(DB_KEYS_SETTINGS_PAGE.address).line2}`}/>
                </Box>


                <SelectionDivider color={colorScheme.general.fancy_pink} title={'Social Media'} />
                <Box item className={classes.item}>
                    <TextInput hasSecondaryColor label={'Facebook'} textCallback={handleSocial('facebook')}
                               initial={getState(DB_KEYS_SETTINGS_PAGE.socialMedia).facebook}/>
                </Box>

                <Box item className={classes.item}>
                    <TextInput hasSecondaryColor label={'Instagram'} textCallback={handleSocial('instagram')}
                               initial={getState(DB_KEYS_SETTINGS_PAGE.socialMedia).instagram}/>
                </Box>

                <Box item className={classes.item}>
                    <TextInput hasSecondaryColor label={'Linkedin'} textCallback={handleSocial('linkedin')}
                               initial={getState(DB_KEYS_SETTINGS_PAGE.socialMedia).linkedin}/>
                </Box>

                <SelectionDivider color={colorScheme.general.coral_orange} title={'SEO'} description={"Edit the individual page title & description so that they show up on Google SERP. (Note: blog posts title/description are auto formatted to SERP)"}/>
                {Object.keys(settings[DB_KEYS_SETTINGS_PAGE.seo]).map((key)=>{
                    return <SEO textCallback={handleSEO(key)}
                                key={key}
                                _key={key}
                                payload={settings[DB_KEYS_SETTINGS_PAGE.seo][key]} />
                })}

            </Box>
                </div>

        </div>

        <ModalEditBusinessLocation createCallback={editAddressCreateCallback} openCallback={setOpenEditAddress}
                                   open={openEditAddress} address={getState(DB_KEYS_SETTINGS_PAGE.address)}/>
    </div>

};


export default AdminSettingsPage;