const isObjectEmpty = (obj)=>{
    return (obj === null) || (obj === undefined) || (obj.constructor === Object && Object.keys(obj).length === 0)
};

export default isObjectEmpty;