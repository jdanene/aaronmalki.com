import { styled } from "@material-ui/core/styles";
import { spacing } from "@material-ui/system";
import MuiButtonGroup from "@material-ui/core/ButtonGroup";

/**
 * Applies the spacing system to the material UI Button
 */
const ButtonGroup = styled(MuiButtonGroup)(spacing);

//https://material-ui.com/system/spacing/
export default ButtonGroup;