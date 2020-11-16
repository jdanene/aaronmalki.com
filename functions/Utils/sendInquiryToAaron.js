const MESSAGE_TYPES = require("../constants");

const getHtmlMessageBody = (payload) => {
    let str = `<br/><h3> Contact Info</h3>`;
    // Basic contact info
    Object.keys(payload).sort().forEach((key) => {
        let value = payload[key];
        if (key === 'timeCreated') {
            value = new Date(value).toString();
        }
        if (!(key === 'messageType' || key === 'details')) {
            str += `<i >${key}: </i> ${value} <br/> <hr> `
        }
    });

    // details
    if ('details' in payload) {
        str += `<br/><h3> Details</h3>`;

        Object.keys(payload.details).sort().forEach((key) => {
            let value = payload.details[key];
            if (key === 'timeCreated') {
                value = new Date(value).toString();
            }
            if (key !== 'messageType') {
                str += `<i >${key}: </i> ${value} <br/> <hr> `
            }
        });


    }


    return str

};

const convertMsgTypeToSubject = ({messageType}) => {
    if (messageType === MESSAGE_TYPES.buy) {
        return 'Buy Inquiry 🏠'
    } else if (messageType === MESSAGE_TYPES.lease) {
        return 'Lease Inquiry ⏳'
    } else {
        return "General Inquiry ✔"
    }
};

const sendInquiryToAaron = async (mailTransport, rootEmail, payload) => {

    const {name} = payload;


    const htmlMessage = `
        <div>
        ${getHtmlMessageBody(payload)}
        <br/>
    `;


    // format email:https://dev.to/tareksalem/send-emails-in-node-js-using-nodemailer-grandjs-and-jsx-components-4k8m
    const email_build = {
        from: `"${name}" <noreply@aaronmalki.com>`, // sender address
        to: rootEmail, // list of receivers
        subject: `${convertMsgTypeToSubject(payload)} - aaronmalki.com`, // Subject line
        html: htmlMessage, // html body
    };

    return await mailTransport.sendMail(email_build);

};

module.exports = sendInquiryToAaron;

