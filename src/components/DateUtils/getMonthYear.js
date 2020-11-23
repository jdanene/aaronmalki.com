const getMonthYearToTimeStamp = (date) => {
    return new Date(date.getFullYear(),date.getMonth());
};

const getDateFromTimeStamp= (timeStamp)=>{
    if (typeof timeStamp === 'string' || timeStamp instanceof String){
        return new Date(parseInt(timeStamp));

    }else{
        return new Date(timeStamp);
    }


};

export {getMonthYearToTimeStamp,getDateFromTimeStamp};