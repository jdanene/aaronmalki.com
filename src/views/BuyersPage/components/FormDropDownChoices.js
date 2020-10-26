import React, {useContext, useEffect, useState} from "react"
import PropTypes from 'prop-types';
import {Button} from "../../../components/Button";
import {ButtonGroup} from "../../../components/Button";
import {makeStyles} from '@material-ui/core/styles';
import {StyledText} from "../../../components/Text";
import Grid from '@material-ui/core/Grid';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Slide from "@material-ui/core";
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import clsx from "clsx"
import Menu from '@material-ui/core/Menu';
import {IconButton} from "@material-ui/core";
import {getTextWidth} from "../../../components/Utility";
import {isObject} from "../../../components/Utility";
import {Popover} from "@material-ui/core";

const BUTTON_FONTFAMILY = 'airbnb-book';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        flexGrow: 1,
        flexShrink: 1,
    },
    buttonText: {
        fontFamily: BUTTON_FONTFAMILY,
        fontSize: 10,
        textAlign: 'center',
        alignSelf: 'center',

    },
    buttonIconContainer: {
        width: 0,
        border: '1px solid rgba(27, 48, 57, .40)',
        justifyContent: 'center',

    },
    buttonContainer: {


    },
    title: {
        fontFamily:  'airbnb-book',
        textAlign: 'left',
        width: '100%',
        color: theme.palette.text.secondary
    },
    /* Styles applied to the `Paper` component. */
    paper: {
        // specZ: The maximum height of a simple menu should be one or more rows less than the view
        // height. This ensures a tapable area outside of the simple menu with which to dismiss
        // the menu.
        maxHeight: 'calc(100% - 96px)',
        // Add iOS momentum scrolling.
        WebkitOverflowScrolling: 'touch',
    },
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: '20ch',
            backgroundColor: 'pink'
        }
    }
}));

const getMaxTextWidth = (aList) => {
    let max = 0;
    for (let index = 0; index < aList.length; index++) {
        max = Math.max(getTextWidth(aList[index], BUTTON_FONTFAMILY), max)
    }



    return max
};
const ITEM_HEIGHT = 48;

/**
 * Returns a group of buttons with drop down
 * @param choices [Array]: of the choices that will be display. The first one will always be highlighted first
 * @param selectionCallback [Func]: A choice from the array `choices` is fed to the function on selection
 * @param title [String] Title Attached to the top of the button
 * @param selectionIdx [Number] index of currently selected item
 * @param minIdxToShow [Number] :  set this to minIdx to be shown if using this in conjuction with FormMinMaxChoices and this happens to be the max value component
 * @return {*}
 * @constructor
 */
const FormDropDownChoices = ({choices, selectionCallback, title, selectionIdx, minIdxToShow}) => {
    //const [selectionIdx, setSelectionIdx] = useState(0);
    const [open, setOpen] = useState(false);
    const classes = useStyles();
    const anchorRef = React.useRef(null);
    const textWidth = getMaxTextWidth(choices) * 1.75;


    const handleClick = (idx) => () => {
        selectionCallback(idx);
        setOpen(!open);
    };

    const handleMenuClick = (idx) => () => {
        selectionCallback(idx);
        setOpen(false);
    };


    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }
        setOpen(false);
    };
    //[listOfClasses].join(' ')

    return (
        <div className={classes.root}>
            <Grid container direction="column" alignItems="flex-start">
                {title && <StyledText className={classes.title}>{title}</StyledText>}
                <Grid item xs={12}>
                    <ButtonGroup
                        p={0}
                        m={0}
                        disableRipple
                        color="secondary"
                        ref={anchorRef}
                        style={{border:0}}
                        aria-label="split button">
                        <Button
                            variant={'outlined'}
                            style={{width: textWidth,   border: '1px solid rgba(27, 48, 57, .40)',
}}
                            className={[classes.buttonText, classes.buttonContainer].join(' ')}
                            onClick={handleClick(selectionIdx)}>
                            {isObject(choices[selectionIdx]) ? choices[selectionIdx].text : choices[selectionIdx]}
                        </Button>
                        <Button
                            p={0}
                            m={0}
                             color="secondary"
                            className={classes.buttonIconContainer}
                            variant={'outlined'}
                            size="small"
                            aria-controls={open ? 'split-button-menu' : undefined}
                            aria-expanded={open ? 'true' : undefined}
                            aria-label="select merge strategy"
                            aria-haspopup="menu"
                            onClick={handleToggle}
                        >
                            {open ? <ArrowDropUpIcon/> :
                                <ArrowDropDownIcon/>}
                        </Button>
                    </ButtonGroup>
                    <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition
                            style={{maxHeight: ITEM_HEIGHT * 4.5,overflow:'auto'}}
                    >
                        {({TransitionProps, placement}) => (
                            <Grow
                                {...TransitionProps}
                                style={{
                                    transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom',
                                }}
                            >
                                <Paper style={{left: -20, position: "relative"}}>
                                    <ClickAwayListener onClickAway={handleClose}>
                                        <MenuList
                                            id="split-button-menu"
                                        >
                                            {choices.map((choice, index) => (


                                                ((minIdxToShow && index>=minIdxToShow)||!minIdxToShow)&&<MenuItem
                                                    style={{
                                                        width: textWidth,
                                                        justifyContent: 'center',
                                                    }}
                                                    className={clsx(classes.buttonText, classes.buttonContainer)}
                                                    key={isObject(choice) ? choices[index].text : choices[index]}
                                                    selected={index === selectionIdx}
                                                    onClick={handleMenuClick(index)}
                                                >
                                                    {isObject(choice) ? choices[index].text : choices[index]}
                                                </MenuItem>
                                            ))}
                                        </MenuList>
                                    </ClickAwayListener>
                                </Paper>
                            </Grow>
                        )}
                    </Popper>
                </Grid>
            </Grid>
        </div>
    );
};

FormDropDownChoices.propTypes = {
    choices: PropTypes.array.isRequired,
    selectionCallback: PropTypes.func.isRequired,
    title: PropTypes.string,
    selectionIdx: PropTypes.number.isRequired,
    minIdxToShow: PropTypes.number
};

export default FormDropDownChoices