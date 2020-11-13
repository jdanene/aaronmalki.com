/**
 * True if variable is object
 * @param aVar
 * @return {boolean}
 */
const isObject = (aVar)=>{
    return (aVar!==null )&&( aVar !== undefined) &&aVar.constructor === Object
};

export default isObject;