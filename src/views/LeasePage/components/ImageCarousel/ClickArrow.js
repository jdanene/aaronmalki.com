import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {IoIosArrowForward} from "react-icons/io";
import {IoIosArrowBack} from "react-icons/io";
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import clsx from "clsx";
//https://www.npmjs.com/package/react-responsive-carousel

const useStyles = makeStyles((theme) => ({
    root: {
        borderRadius: '1%',
        maxHeight: '60px',
        minHeight: '60px',
        maxWidth: '38px',
        minWidth: '38px'


    },
    arrow: {
        position: 'absolute',
        zIndex: 2,
        top: 'calc(50% - 15px)',
        width: 30,
        height: 30,
        cursor: 'pointer',

    }
}));


const ClickArrow = ({direction, onClickHandler, className}) => {

    if (!(direction === "right" || direction === "left")) {
        alert(`Click arrow needs valid direction, given: ${direction}`)
    }

    const classes = useStyles();

    return (
        <Button
            onClick={onClickHandler}
            className={clsx(classes.root, classes.arrow, className)}
            variant="contained"
            color="primary"
            style={{[direction]: 0}}
        >
            {direction === "left" ? <IoIosArrowBack size={25} style={{position: 'absolute', left: 5}}/> :
                <IoIosArrowForward size={25} style={{position: 'absolute', left: 5}}/>

            }
        </Button>

    )
};

export default ClickArrow;