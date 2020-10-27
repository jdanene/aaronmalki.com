import getRandomValueFromArray from "./getRandomValueFromArray";
const getRandomValueFromObject = (obj)=>{
    let k = getRandomValueFromArray(Object.keys(obj));
    return {[k]:obj[k]}
};

export default getRandomValueFromObject;