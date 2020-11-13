import isObject from "./isObject";
import {DB_MULTIPART_TEXT_KEY} from "../../constants/contants";

const getSecondaryText = (secondaryValues) => {
    return Array(Object.keys(secondaryValues).length).fill().map((_, i) => secondaryValues[i])
};

const _parseMultiPartTextToArray = (text_obj) => {
    if (DB_MULTIPART_TEXT_KEY.secondaryValues in text_obj) {
        return [text_obj[DB_MULTIPART_TEXT_KEY.value]].concat(getSecondaryText(text_obj.secondaryValues))
    } else {
        return [text_obj[DB_MULTIPART_TEXT_KEY.value]];
    }

};


const parseMultiPartTextToArray = (text_obj) => {

    if (isObject(text_obj)) {
        return _parseMultiPartTextToArray(text_obj)
    }

    if (DB_MULTIPART_TEXT_KEY.secondaryValues in text_obj) {
        return [text_obj[DB_MULTIPART_TEXT_KEY.value]].concat(text_obj.secondaryValues);

    } else {
        return [text_obj[DB_MULTIPART_TEXT_KEY.value]];
    }
};


export default parseMultiPartTextToArray;