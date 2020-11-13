const dictToArray = (aDict)=>{
    return Array(Object.keys(aDict).length).fill().map((_, i) => aDict[i]);
};

export default dictToArray;