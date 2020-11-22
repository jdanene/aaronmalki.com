import React, {useEffect, useState} from "react"
import PropTypes from 'prop-types';
import {Button, ButtonGroup} from "../Button";
import {makeStyles} from '@material-ui/core/styles';
import {StyledText} from "../Text";

const BUTTON_FONTFAMILY = 'airbnb-book';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        flexGrow:1,
        flexShrink:1,
       // [theme.breakpoints.only("xs")]: {
       //     height: '400px'
       // },
    },
        buttonText: {
        fontFamily: BUTTON_FONTFAMILY,
        fontSize: 10,
         border: '1px solid rgba(27, 48, 57, .40)',


    },
        title:{

        fontFamily:  'airbnb-book',
        textAlign: 'left',
        width:'100%',
        color: theme.palette.text.secondary
    },
}));


/**
 * Returns a group of buttons that reflect static choices to be made in a form
 * @param choices [Array]: of the choices that will be display. The first one will always be highlighted first
 * @param selectionCallback [Func]: A choice from the array `choices` is fed to the function on selection
 * @param title [String] Title Attached to the top of the button
 * @return {*}
 * @constructor
 */
const FormStaticChoices = ({choices, selectionCallback, title}) => {
    const [selectionIdx, setSelectionIdx] = useState(0);
    const classes = useStyles();

    useEffect(()=>{selectionCallback(0)},[]);

    const handleClick = (idx)=>()=>{
        setSelectionIdx(idx);
        selectionCallback(idx)
    };
    //https://stackoverflow.com/questions/58963242/change-border-color-on-material-ui-textfield
    // Outline of button
    return (
        <div className={classes.root}>
            <StyledText className={classes.title}>{title}</StyledText>
            <ButtonGroup  color="secondary" aria-label="outlined primary button group">

                {choices.map((choice,index) => (
                    <Button key={index} p={1} m={0} className={classes.buttonText}  variant={selectionIdx === index ? "contained" : "outlined"} id={choice}
                            onClick={handleClick(index)}>{choice}</Button>
                ))}
            </ButtonGroup>
        </div>

    )
};


FormStaticChoices.propTypes = {
    choices: PropTypes.array.isRequired,
    selectionCallback: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired
};

export default FormStaticChoices;