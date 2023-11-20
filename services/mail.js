import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  service: "gmail",
 
  auth: {
    user: "alishkarki220@gmail.com",
    pass: "qxtgzzpyonoubwfc",
  },
  debug: true,
  logger: true,
});

export const sendMail = async (email, token, host) => {
  try {
    // console.log(host)
    var mailOptions = {
      from: "alishkarki220@gmail.com",
      to: email,
      subject: "reset password",
      html: `
            <h1> click the link to reset the password </h1>
            <a href="http://${host}/reset/${token}"> Link  </a>
        `,
    };

    const mail = await transporter.sendMail(mailOptions).then((mail)=>{
        if (mail) {
          return mail;
      }
      
    })
    .catch( (error)=> {
    return error
  })
}catch(error){
    return error;


}}