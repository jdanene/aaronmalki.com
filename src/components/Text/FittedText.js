import React from "react"
import { Textfit } from 'react-textfit';
//https://www.npmjs.com/package/react-textfit
//https://stackoverflow.com/questions/56305921/react-textfit-not-fitting-text-correctly-in-multi-mode
const FittedText = ({ children, mode,className, style, type, size, ...rest }) => {
  return (
    <Textfit mode={mode}  style={{...style}} className = {className} {...rest}>
      {children}
    </Textfit>
  )
};

FittedText.defaultProps = {
  mode:"single"
};
export default FittedText
