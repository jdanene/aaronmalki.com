const stringToPath = aString =>{
    return aString.toLowerCase().replace(/\s/g, '-')
};

export default stringToPath;