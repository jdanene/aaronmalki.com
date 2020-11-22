import React, {useEffect, useState} from "react"
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/core/styles';
import {StyledText} from "../Text";
import FormDropDownChoices from "./FormDropDownChoices";
import clsx from "clsx";

const BUTTON_FONTFAMILY = 'raleway-regular';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        flexShrink: 1,
        width:'100%'
    },
    button_container: {
        display: 'flex',
        alignItems: 'center',
        justifyContent:'space-between',
        maxWidth: 275
        // [theme.breakpoints.only("xs")]: {
        //     height: '400px'
        // },
    },
    buttonText: {
        fontFamily: BUTTON_FONTFAMILY,
        fontSize: 10,
        fontWeight:'bold'

    },
    title: {
        fontFamily:  'airbnb-book',
        textAlign: 'left',
        width: '100%',
        color: theme.palette.text.secondary
    },
    choices_container: {
        display: 'flex'
    },
    divider: {
        border: '1px solid rgba(27, 48, 57, .5)',
        width: '10px',
        marginLeft: '10px',
        marginRight: '10px'

    }
}));


/**
 * Returns a group of buttons that reflect static choices to be made in a form
 * @param choices [Array]: of the choices that will be display. The first one will always be highlighted first
 * @param selectionCallback [Func]: A choice from the array `choices` is fed to the function on selection
 * @param title [String] Title Attached to the top of the button
 * @return {*}
 * @constructor
 */
const FormMinMaxChoices = ({className,choicesLow, choicesHigh, selectionCallback, title}) => {
    const [selectionIdxLow, setSelectionIdxLow] = useState(0);
    const [selectionIdxHigh, setSelectionIdxHigh] = useState(choicesHigh.length - 1);
    const [internalChoicesLow, setInternalChoicesLow]=useState(choicesLow);
    const [internalChoicesHigh, setInternalChoicesHigh]=useState(choicesHigh.slice(0, choicesHigh.length - 1))
    const classes = useStyles();

    //selectionCallbackLow, selectionCallbackHigh,

    /**
     * Edits state variables on selection, and does adjustments if user provides inconsistent selection
     * @param lowOrHigh [union{"high","low"}] indicates if selection type is "high" or "low"
     */
    const _selectionCallback = (lowOrHigh) => (idx) => {
        if (lowOrHigh ==="low"){

            if (choicesLow[idx].value<= choicesHigh[selectionIdxHigh].value){
                setSelectionIdxLow(idx);
            }else{
                setSelectionIdxHigh(idx+1<choicesHigh.length?idx+1:choicesHigh.length-1);

            }
            setSelectionIdxLow(idx)
        }else{
            if (choicesLow[selectionIdxLow].value<= choicesHigh[idx].value){
                setSelectionIdxHigh(idx);

            }else{
                setSelectionIdxLow(idx-1<0?0:idx-1);
            }
            setSelectionIdxHigh(idx);
        }
    };

    useEffect(()=>{
        selectionCallback({high:selectionIdxHigh,low:selectionIdxLow})

    },[selectionIdxLow,selectionIdxHigh]);

    return (
        <div className={clsx(classes.root,className)}>
            <StyledText className={classes.title}>{title}</StyledText>

            <div className={classes.button_container}>
                <FormDropDownChoices selectionIdx={selectionIdxLow} choices={choicesLow}
                                     selectionCallback={_selectionCallback("low")}/>
                <div className={classes.divider}>
                </div>
                <FormDropDownChoices selectionIdx={selectionIdxHigh} choices={choicesHigh}
                                     selectionCallback={_selectionCallback("high")} minIdxToShow={1}/>
            </div>
        </div>

    )
};

FormMinMaxChoices.propTypes = {
    choicesLow: PropTypes.array.isRequired,
    choicesHigh: PropTypes.array.isRequired,
    selectionCallback: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired
};

export default FormMinMaxChoices