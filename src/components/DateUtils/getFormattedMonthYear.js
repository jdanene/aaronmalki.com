const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];


const getFormattedMonthYear = (date) => {
    return `${monthNames[date.getMonth()]} ${date.getFullYear()}`;


};

export default getFormattedMonthYear