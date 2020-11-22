import React from "react"
import {Transition} from 'react-transition-group';
import PropTypes from 'prop-types';

//https://www.npmjs.com/package/react-textfit
//https://stackoverflow.com/questions/56305921/react-textfit-not-fitting-text-correctly-in-multi-mode

const duration = 150;


const PopText = ({children, trigger, className, startFontSize, endFontSize, style}) => {

    const defaultStyle = {
        transition: `font-size ${duration}ms ease-in-out`,
        fontSize: startFontSize
    };

    const transitionStyles = {
        entering: {fontSize: startFontSize},
        entered: {fontSize: startFontSize},
        exiting: {fontSize: endFontSize},
        exited: {fontSize: endFontSize},
    };

    return (
        <Transition in={trigger} timeout={duration}>
            {state => (
                <div className={className} style={{
                    ...style,
                    ...defaultStyle,
                    ...transitionStyles[state]
                }}>
                    {children}
                </div>
            )}
        </Transition>
    )
};

PopText.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.string,
    ]),
    trigger: PropTypes.bool.isRequired,
    startFontSize: PropTypes.string.isRequired,
    endFontSize: PropTypes.string.isRequired,
    style: PropTypes.object
};

export default PopText
