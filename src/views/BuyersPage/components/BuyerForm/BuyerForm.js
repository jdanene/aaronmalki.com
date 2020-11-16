import React, {useContext, useEffect, useState} from "react"
import {makeStyles} from '@material-ui/core/styles';
import FormDropDownChoices from "../../../../components/Forms/FormDropDownChoices";
import FormStaticChoices from "../../../../components/Forms/FormStaticChoices";
import FormMinMaxChoices from "../../../../components/Forms/FormMinMaxChoices";
import {ContactForm} from "../../../../components/ContactForm";
import FormDivider from "../../../../components/Forms/FormDivider";
import Grid from "@material-ui/core/Grid";
import Paper from '@material-ui/core/Paper';
import {colorScheme} from "../../../../constants";
import {MESSAGE_TYPES} from "../../../../constants/contants";
import SendEmailToAaron from "../../../../components/Database/SendEmailToAaron";


const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: theme.spacing(2),
        paddingTop: 0
    },
    minMaxChoices: {}
}));

const priceOptionsLow = [
    {value: 0, text: 'No Min'},
    {value: 100000, text: '$100k'},
    {value: 200000, text: '$200k'},
    {value: 300000, text: '$300k'},
    {value: 400000, text: '$400k'},
    {value: 500000, text: '$500k'},
    {value: 600000, text: '$600k'},
    {value: 700000, text: '$700k'},
    {value: 800000, text: '$800k'},
    {value: 900000, text: '$900k'},
    {value: 1000000, text: '$1m'},
    {value: 1250000, text: '$1.25m'},
    {value: 1500000, text: '$1.5m'},
    {value: 1750000, text: '$1.75m'},
    {value: 2000000, text: '$2m'},
    {value: 2250000, text: '$2.25m'},
    {value: 2500000, text: '$2.5m'},
    {value: 2750000, text: '$2.75m'},
    {value: 3000000, text: '$3m'},
    {value: 3500000, text: '$3.5m'},
    {value: 4000000, text: '$4m'},
    {value: 4500000, text: '$4.5m'},
    {value: 5000000, text: '$5m'},
    {value: 10000000, text: '$10m'},
    {value: 20000000, text: '$20m+'}];

const priceOptionsHigh = [
    {value: 0, text: '$0'},
    {value: 100000, text: '$100k'},
    {value: 200000, text: '$200k'},
    {value: 300000, text: '$300k'},
    {value: 400000, text: '$400k'},
    {value: 500000, text: '$500k'},
    {value: 600000, text: '$600k'},
    {value: 700000, text: '$700k'},
    {value: 800000, text: '$800k'},
    {value: 900000, text: '$900k'},
    {value: 1000000, text: '$1m'},
    {value: 1250000, text: '$1.25m'},
    {value: 1500000, text: '$1.5m'},
    {value: 1750000, text: '$1.75m'},
    {value: 2000000, text: '$2m'},
    {value: 2250000, text: '$2.25m'},
    {value: 2500000, text: '$2.5m'},
    {value: 2750000, text: '$2.75m'},
    {value: 3000000, text: '$3m'},
    {value: 3500000, text: '$3.5m'},
    {value: 4000000, text: '$4m'},
    {value: 4500000, text: '$4.5m'},
    {value: 5000000, text: '$5m'},
    {value: 10000000, text: '$10m'},
    {value: 20000000, text: 'No Max'}];


const BuyerForm = () => {
    const [timeFrameIdx, setTimeFrameIdx] = useState(0);
    const [bedroomsIdx, setBedroomsIdx] = useState(0);
    const [bathroomsIdx, setBathroomsIdx] = useState(0);
    const [priceIndices, setPriceIndices] = useState({low: 0, high: priceOptionsHigh.length - 1});

    const classes = useStyles();


    const timeFrameOptions = ["Looking to buy ASAP", "Over the next few months", "Within the year", "Within the next few years"];
    const timeFrameTitle = "Time Frame";
    const timeFrameSelectionCallback = (idx) => {
        setTimeFrameIdx(idx)
    };

    const bedroomOptions = ["Any", "Studio+", "1+", "2+", "3+", "4+", "5+"];
    const bedroomTitle = "Bedrooms";
    const bedroomSelectionCallback = (idx) => {
        setBedroomsIdx(idx)
    };

    const bathroomOptions = ["Any", "1+", '1.5+', "2+", '2.5+', "3+", "4+"];
    const bathroomTitle = "Bathrooms";
    const bathroomSelectionCallback = (idx) => {
        setBathroomsIdx(idx)
    };

    const priceTitle = "Price";
    const priceSelectionCallback = ({high, low}) => {
        setPriceIndices({high, low})
    };

    const sendMessage = (props) => {
        let payload = {
            messageType: MESSAGE_TYPES.buy,
            details:{
                timeFrame: timeFrameOptions[timeFrameIdx],
                bedrooms: bedroomOptions[bedroomsIdx],
                bathrooms: bathroomOptions[bathroomsIdx],
                priceLow: priceOptionsLow[priceIndices.low].text,
                priceHigh: priceOptionsHigh[priceIndices.high].text,
            },

            ...props
        };
        SendEmailToAaron(payload).then()
            .catch(() => console.error(`[SendMessage.js] failed to send message:${JSON.stringify(payload)}`))
    };

    // Contact
    // Property Type

    return <Paper className={classes.root}>
        <FormDivider title={"Property Type"}/>
        <Grid container direction={'column'} spacing={1}>
            <Grid item>
                <FormMinMaxChoices className={classes.minMaxChoices} choicesHigh={priceOptionsHigh}
                                   choicesLow={priceOptionsLow} title={priceTitle}
                                   selectionCallback={priceSelectionCallback}/>
            </Grid>
            <Grid item>
                <FormStaticChoices choices={bathroomOptions} selectionCallback={bathroomSelectionCallback}
                                   title={bathroomTitle}/>
            </Grid>
            <Grid item>
                <FormStaticChoices choices={bedroomOptions} selectionCallback={bedroomSelectionCallback}
                                   title={bedroomTitle}/>
            </Grid>
            <Grid item>
                <FormDropDownChoices width={190} selectionIdx={timeFrameIdx} choices={timeFrameOptions}
                                     selectionCallback={timeFrameSelectionCallback} title={timeFrameTitle}/>
            </Grid>
        </Grid>
        <FormDivider title={"Contact"}/>
        <ContactForm confirmCallback={sendMessage}/>
    </Paper>

};

// https://material-ui.com/components/selects/
// ui this way
export default BuyerForm;