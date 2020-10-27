//style = "color:blue;font-size:46px;"
const CONSTANTS = require('../constants');

const styles = {
    header: {
        "text-align": "left",
        "padding": "0px",
        "margin": "0px",
        "color": "#445963",
        "font-family": "'Roboto', sans-serif"
    },

    container: {
        "display": "flex",
        "flex-direction": "column",
        "height": "100%",
        "width": "100%",
        "background-color": "#fff",
    },
    thankyou_text: {
        "color": "#445963",
    },

    signature: {
        "padding": "0px",
        "margin": "0px",
        "color": "#445963",
        "font-family": "'Roboto', sans-serif",
        "margin-bottom": "15px"
    },

    "inquiryBody": {
        "color": "rgba(0, 0, 0, 0.54)",
        "font-family": "'Roboto', sans-serif"
    },

    "footer": {
        "border-top": "1px solid rgba(0, 0, 0, 0.40)",
        "margin-top": "25px",
        "padding-top": "10px",
        "font-family": "'Roboto', sans-serif",
        "color": "#1b3039",
    },
    "link": {
        "color": "#1b3039",
    }
};

const getCSSstyle = (obj) => {

    let str = "";
    for (let key of Object.keys(obj)) {
        str += `${key}:${obj[key]};`
    }
    return str;
};


const sendConfirmEmailToUser = async (mailTransport, {email, name}) => {
    const confirmEmailTemplate = `<div style=style=${getCSSstyle(styles.container)}">
    <h2 style=style=${getCSSstyle(styles.header)}>Dear ${name}, thanks for reaching out!</h2>
    <div>
    <p style=style=${getCSSstyle(styles.inquiryBody)}>
        We have received your message and would like to thank you for 
        writing to us. If your inquiry is urgent, please use the telephone 
        number listed below to talk to one of our staff members. 
        Otherwise, we will reply by email as soon as possible. 
    </p>
    <strong style=style=${getCSSstyle(styles.signature)} >Talk to you soon, <br>
        Aaron Malki Real Estate
    </strong>
    </div>

    <div>
    <footer style=style=${getCSSstyle(styles.footer)}>
        <b>Aaron Malki Real Estate</b> <br>
        ${CONSTANTS.address.line1} <br>
       ${CONSTANTS.address.line2} <br>
        <a style=style=${getCSSstyle(styles.link)}  href="tel:${CONSTANTS.phoneNumber.tel}"> ${CONSTANTS.phoneNumber.dash}</a> <br>
        <a style=style=${getCSSstyle(styles.link)} href="https://the-malki-site.web.app/">aaronmalki.com</a>
    </footer>
    </div>
</div>`;


    // format email:https://dev.to/tareksalem/send-emails-in-node-js-using-nodemailer-grandjs-and-jsx-components-4k8m
    const email_build = {
        from: '"Aaron Malki Real Estate" <noreply@firebase.com>', // sender address
        to: email, // list of receivers
        subject: "Message Received! 🚀", // Subject line
        html: confirmEmailTemplate, // html body
    };

    return await mailTransport.sendMail(email_build);

};

module.exports = sendConfirmEmailToUser;

