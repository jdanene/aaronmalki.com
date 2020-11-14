import React from "react"
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";


const SecondaryHeading = ({text}) => {

    return (
        <React.Fragment>
            <div style={{display: 'flex', alignItems: 'flex-start', flexDirection: 'column'}}>
                <Typography variant="h4" color="textSecondary" component="h4">{text}</Typography>

            </div>
            <Divider style={{marginBottom: '10px'}}/>
        </React.Fragment>
    )
};

export default SecondaryHeading