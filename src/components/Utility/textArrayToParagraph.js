import React from "react"
import Typography from "@material-ui/core/Typography";

const textArrayToParagraph = ({paragraphArray, alignLeft, className}) => {
    const styles = {textAlign: alignLeft ? 'left' : null};

    return (

        <Typography style={styles} gutterBottom variant={'body1'} className={className}>

            {paragraphArray.map((val, idx) => {
                if (idx === paragraphArray.length - 1) {
                    return <React.Fragment key={idx}>
                        {val}
                    </React.Fragment>
                } else {
                    return <React.Fragment key={idx}>
                        {val} <br/> <br/>
                    </React.Fragment>
                }
            })}
        </Typography>
    )
};

export default textArrayToParagraph