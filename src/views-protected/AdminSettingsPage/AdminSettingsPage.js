import React, {useContext, useEffect, useState} from "react"
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
    let pat = /^(\+1)?(?<area_code>\d{3})(?<central_code>\d{3})(?<subscribe_code>\d{4})(\d*)$/;
    const {groups: {area_code, central_code, subscribe_code}} = pat.exec(pNumber);

    let phoneNumber = {};
    phoneNumber.dash = `(${area_code}) ${central_code}-${subscribe_code}`;
    phoneNumber.dot = `${area_code}.${central_code}.${subscribe_code}`;
    phoneNumber.all_dash = `${area_code}-${central_code}-${subscribe_code}`;
    phoneNumber.tel = pNumber;

    return phoneNumber
};

const AdminSettingsPage = () => {
    const {license, address, phoneNumber, email, socialMedia, companyName, changeSettings} = useContext(AppContext);
    const classes = useStyles();

    const [companyName_, setCompanyName_] = useState(companyName);
    const [email_, setEmail_] = useState(email);
    const [phone_, setPhone_] = useState(phoneNumber.tel);
    const [license_, setLicense_] = useState(license);
    const [address_, setAddress_] = useState(address);
    const [socialMedia_, setSocialMedia_] = useState(socialMedia);
    const [hasEdits, setEdits] = useState(false);

    const [openEditAddress, setOpenEditAddress] = useState(false);

    // notify if user has edited anything
    useEffect(() => {
        if (companyName_ !== companyName) {
            //
        } else if (email_ !== email) {
            //
        } else if (phone_ !== phoneNumber.tel) {
            //
        } else if (license_ !== license) {
            //
        } else if (address_ !== address) {
            //
        } else if (socialMedia_ !== socialMedia) {
            //
        } else {
            setEdits(false);
            return
        }
        setEdits(true);
    }, [companyName_, email_, phone_, license_, address_, socialMedia_]);

    // Update AppContext with new state
    const confirmCallback = () => {

        let payload = {
            phoneNumber: parsePhone(phone_),
            companyName: companyName_,
            email: email_,
            license: license_,
            address: address_,
            socialMedia: socialMedia_
        };

        changeSettings(payload);
        uploadSettingToDb(payload).catch((e) => alert(`Could not upload settings to db: ${e}`));

        alert("Settings have changed! Reload if you don't see the effects immediately")
    };

    // Call back for social media edits
    const handleSocial = (type) => (value) => {
        setSocialMedia_({...socialMedia_, [type]: value})
    };


    // Callback for ModalEditBusinessLocation
    const editAddressCreateCallback = (value) => {
        setAddress_(value);
    };

    return <div style={{
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

                            <Button size={'large'} variant={'contained'} onClick={() => alert('canceld')}
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
                    <TextInput hasSecondaryColor label={'Company Name'} textCallback={setCompanyName_}
                               initial={companyName_}/>
                </Grid>

                <Grid item className={classes.item}>
                    <TextInput hasSecondaryColor label={'Email Address'} textCallback={setEmail_} initial={email_}/>
                </Grid>

                <Grid item className={classes.item}>
                    <PhoneInput hasSecondaryColor label={'Phone Number'} textCallback={setPhone_} initial={phone_}/>
                </Grid>

                <Grid item className={classes.item}>
                    <TextInput hasSecondaryColor label={'Calbre License#'} textCallback={setLicense_}
                               initial={license_}/>
                </Grid>

                <Grid item className={classes.item}>
                    <TextInput onPress={() => setOpenEditAddress(true)} multiline hasSecondaryColor
                               label={'Business Location'} textCallback={() => {
                    }}
                               initial={`${address_.line1}\n${address_.line2}`}/>
                </Grid>


                <SelectionDivider color={colorScheme.general.fancy_pink} title={'Social Media'}/>
                <Grid item className={classes.item}>
                    <TextInput hasSecondaryColor label={'Facebook'} textCallback={handleSocial('facebook')}
                               initial={socialMedia_.facebook}/>
                </Grid>

                <Grid item className={classes.item}>
                    <TextInput hasSecondaryColor label={'Instagram'} textCallback={handleSocial('instagram')}
                               initial={socialMedia_.instagram}/>
                </Grid>

                <Grid item className={classes.item}>
                    <TextInput hasSecondaryColor label={'Linkedin'} textCallback={handleSocial('linkedin')}
                               initial={socialMedia_.linkedin}/>
                </Grid>
            </Grid>

        </div>

        <ModalEditBusinessLocation createCallback={editAddressCreateCallback} openCallback={setOpenEditAddress}
                                   open={openEditAddress} address={address_}/>
    </div>

};

export default AdminSettingsPage;