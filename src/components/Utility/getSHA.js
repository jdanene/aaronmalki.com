const hash = require('hash.js');

const getSHA = (txt)=>{
    return hash.sha256().update(txt).digest('hex');
};

export default getSHA;