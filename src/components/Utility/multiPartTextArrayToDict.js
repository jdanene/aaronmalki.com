import arrayToDict from "./arrayToDict";
import {DB_MULTIPART_TEXT_KEY} from "../../constants/contants";

const multiPartTextArrayToDict = (text_obj) => {

    let dict = {value:text_obj[DB_MULTIPART_TEXT_KEY.value]};

    if (DB_MULTIPART_TEXT_KEY.secondaryValues in text_obj) {
        dict[DB_MULTIPART_TEXT_KEY.secondaryValues]=arrayToDict(text_obj[DB_MULTIPART_TEXT_KEY.secondaryValues])
    }

    return dict


};

export default multiPartTextArrayToDict

