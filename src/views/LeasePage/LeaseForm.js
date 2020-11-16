import React, {useState} from "react"
import {makeStyles} from '@material-ui/core/styles';
import FormStaticChoices from "../../components/Forms/FormStaticChoices";
import FormMinMaxChoices from "../../components/Forms/FormMinMaxChoices";
import {ContactForm} from "../../components/ContactForm";
import FormDivider from "../../components/Forms/FormDivider";
import Grid from "@material-ui/core/Grid";
import Paper from '@material-ui/core/Paper';
import CssBaseline from '@material-ui/core/CssBaseline';
import SendEmailToAaron from "../../components/Database/SendEmailToAaron";
import {MESSAGE_TYPES} from "../../constants/contants";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: theme.spacing(2),
        paddingTop: 0
    },
    minMaxChoices: {
        //width: '335px'
    },
    imgTextContainer: {
        marginBottom: 0,
        width: '100%'
    }
}));

const priceOptionsLow = [
    {value: 0, text: 'No Min'},
    {value: 500, text: '$500'},
    {value: 750, text: '$750'},
    {value: 1000, text: '$1k'},
    {value: 1250, text: '$1.25k'},
    {value: 1500, text: '$1.5k'},
    {value: 1750, text: '$1.75k'},
    {value: 2000, text: '$2k'},
    {value: 2250, text: '$2.25k'},
    {value: 2500, text: '$2.5k'},
    {value: 2750, text: '$2.75k'},
    {value: 3000, text: '$3k'},
    {value: 3250, text: '$3.25'},
    {value: 3500, text: '$3.5k'},
    {value: 3750, text: '$3.75k'},
    {value: 4000, text: '$4k'},
    {value: 4250, text: '$4.25k'},
    {value: 4500, text: '$4.5k'},
    {value: 4750, text: '$4.75k'},
    {value: 5000, text: '$5k'},
    {value: 5500, text: '$5.5k'},
    {value: 6000, text: '$6k'},
    {value: 6500, text: '$6.5k'},
    {value: 7000, text: '$7k'},
    {value: 8000, text: '$8k'},
    {value: 9000, text: '$9k'},
    {value: 10000, text: '$10k'},
    {value: 15000, text: '$15k'}
];

const priceOptionsHigh = [
    {value: 0, text: '$0'},
    {value: 500, text: '$500'},
    {value: 750, text: '$750'},
    {value: 1000, text: '$1k'},
    {value: 1250, text: '$1.25k'},
    {value: 1500, text: '$1.5k'},
    {value: 1750, text: '$1.75k'},
    {value: 2000, text: '$2k'},
    {value: 2250, text: '$2.25k'},
    {value: 2500, text: '$2.5k'},
    {value: 2750, text: '$2.75k'},
    {value: 3000, text: '$3k'},
    {value: 3250, text: '$3.25'},
    {value: 3500, text: '$3.5k'},
    {value: 3750, text: '$3.75k'},
    {value: 4000, text: '$4k'},
    {value: 4250, text: '$4.25k'},
    {value: 4500, text: '$4.5k'},
    {value: 4750, text: '$4.75k'},
    {value: 5000, text: '$5k'},
    {value: 5500, text: '$5.5k'},
    {value: 6000, text: '$6k'},
    {value: 6500, text: '$6.5k'},
    {value: 7000, text: '$7k'},
    {value: 8000, text: '$8k'},
    {value: 9000, text: '$9k'},
    {value: 10000, text: '$10k'},
    {value: 15000, text: 'No Max'}
];


const LeaseForm = () => {
    const [bedroomsIdx, setBedroomsIdx] = useState(0);
    const [bathroomsIdx, setBathroomsIdx] = useState(0);
    const [priceIndices, setPriceIndices] = useState({low: 0, high: priceOptionsHigh.length - 1});
    const classes = useStyles();

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

    //{name,email:email.trim(),message,messageType:MESSAGE_TYPES.general}

    const sendMessage = (props) => {
        let payload = {
            messageType: MESSAGE_TYPES.lease,
            details: {
                bedrooms: bedroomOptions[bedroomsIdx],
                bathrooms: bathroomOptions[bathroomsIdx],
                priceLow: priceOptionsLow[priceIndices.low].text,
                priceHigh: priceOptionsHigh[priceIndices.high].text,
            },

            ...props
        };
        SendEmailToAaron(payload)
            .catch(() => console.error(`[SendMessage.js] failed to send message:${JSON.stringify(payload)}`))
    };
    // Contact
    // Property Type

    return <Paper className={classes.root}>
        <FormDivider title={"Property Type"}/>

        <Grid className={classes.imgTextContainer} container direction={'column'} spacing={1}>
            <Grid xs={12} item>
                <FormMinMaxChoices className={classes.minMaxChoices} choicesHigh={priceOptionsHigh}
                                   choicesLow={priceOptionsLow} title={priceTitle}
                                   selectionCallback={priceSelectionCallback}/>
            </Grid>
            <Grid xs={12} item style={{width: '100%'}}>
                <FormStaticChoices choices={bathroomOptions} selectionCallback={bathroomSelectionCallback}
                                   title={bathroomTitle}/>
            </Grid>
            <Grid xs={12} item style={{width: '100%'}}>
                <FormStaticChoices choices={bedroomOptions} selectionCallback={bedroomSelectionCallback}
                                   title={bedroomTitle}/>
            </Grid>

        </Grid>
        <FormDivider title={"Contact"}/>
        <ContactForm confirmCallback={sendMessage}/>
    </Paper>

};

// https://material-ui.com/components/selects/
// ui this way
export default LeaseForm;