import React from "react";


const VerticalDivider = ({margin, color, size}) => {
    return (
        <div style={{
            height: size? size: "100%",
            minHeight: "25px",
            borderLeft: `1px solid ${color? color: "white"}`,
            marginLeft: margin? margin: 0,
            marginRight:margin? margin: 0,
            backgroundColor: color? color: "white"
        }}/>
    )
};

export default VerticalDivider;