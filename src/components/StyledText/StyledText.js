import React from "react"
import { Textfit } from 'react-textfit';
//https://www.npmjs.com/package/react-textfit
const StyledText = ({ children, className, style, type, size, ...rest }) => {
  return (
    <Textfit style={style} className = {className} {...rest}>
      {children}
    </Textfit>
  )
};

export default StyledText
