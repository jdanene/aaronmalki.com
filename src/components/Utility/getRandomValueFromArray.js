const getRandomValueFromArray = (array)=>{
    return array[Math.floor(Math.random() * array.length)];
};

export default getRandomValueFromArray;