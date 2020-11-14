import {makeStyles} from '@material-ui/core/styles';
import {colorScheme} from "../../constants";

const useStyles = makeStyles((theme) => ({
    root:
        {
            display: "flex",
            alignContent: "center",
            alignItems: "center",
            width: '100%',
            backgroundColor: colorScheme.other,
            flexDirection: 'column',
            padding: theme.spacing(1)
        },
    edit_container: {
        marginRight: theme.spacing(2),
        marginBottom: theme.spacing(2),
        marginLeft: theme.spacing(2)
    },
    preview_container: {
        flexGrow: 1, display: 'flex', marginLeft: theme.spacing(2), flexDirection: 'column'


    },
    heading: {
        display: 'flex',
        width: '100%',
        justifyContent: 'space-between',
        margin: theme.spacing(4),
        marginBottom: theme.spacing(10),
        paddingLeft: theme.spacing(5),
        paddingRight: theme.spacing(5)
    },
    options: {
        width: '100%',
        marginBottom: theme.spacing(2)
    },
    options_container: {
        display: 'flex',
        flexGrow: 1,
        flexDirection: 'column'
    },
    preview: {
        border: '1px solid #00c093', padding: theme.spacing(2)
    }
}));

export default useStyles;
