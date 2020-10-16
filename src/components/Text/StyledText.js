import React from "react"
import { Textfit } from 'react-textfit';
//https://www.npmjs.com/package/react-textfit
//https://stackoverflow.com/questions/56305921/react-textfit-not-fitting-text-correctly-in-multi-mode
const StyledText = ({ children, className, style, type, size, ...rest }) => {
  return (
    <div  style={{...style}} className = {className} {...rest}>
      {children}
    </div>
  )
};

export default StyledText
