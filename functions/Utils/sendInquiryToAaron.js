const sendInquiryToAaron = async (mailTransport, {email, message, name, timeCreated}) => {

    const formattedTime = new Date(timeCreated).toString();


    const htmlMessage = `
        <div>
        <i >Name: </i> ${name} <br/> 
        <hr>
        <i>Email: </i>  ${email} <br/> 
        <hr>
        <i>Time of Inquiry: </i> ${formattedTime} <br/> 
        <hr>
        <i>Message: </i> ${message} 
        <br/>
    `;

    // format email:https://dev.to/tareksalem/send-emails-in-node-js-using-nodemailer-grandjs-and-jsx-components-4k8m
    const email_build = {
        from: `"${name} - aaronmalki.com" <noreply@firebase.com>`, // sender address
        to: email, // list of receivers
        subject: "Inquiry ✔", // Subject line
        html: htmlMessage, // html body
    };

    return await mailTransport.sendMail(email_build);

};

module.exports = sendInquiryToAaron;

