const arrayToDict = (anArray)=>{
    let dict = {};

    anArray.forEach((val,index)=>{
        dict[index] = val
    });
    return dict
};

export default arrayToDict;