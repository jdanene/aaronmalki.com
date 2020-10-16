import {Transition} from 'react-transition-group';
import React, {useContext, useEffect, useRef, useState} from "react"

const duration = 500;

const defaultStyle = {
    transition: `fontSize ${duration}ms ease-in-out`,
    opacity: "0",
};


// Based on: http://reactcommunity.org/react-transition-group/transition
const Fade = ({trigger, children}) => {
    const transitionStyles = {
        entering: {opacity: "1"},
        entered: {opacity: "1"},
        exiting: {opacity: "0"},
        exited: {opacity: "0"},
    };

    return (
        <Transition in={trigger} timeout={duration}>
            {state => (
                <div style={{
                    ...defaultStyle,
                    ...transitionStyles[state]
                }}>
                    {children}
                </div>
            )}
        </Transition>
    )
};

export default Fade;