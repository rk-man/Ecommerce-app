import nodemailer from "nodemailer";
var transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "naveenrk.official@gmail.com",
    pass: process.env.EMAIL_PASSWORD,
  },
});

export async function sendMail(email: string, code: string) {
  const emailRes = await transporter.sendMail({
    from: "naveenrk.official@gmail.com", // sender address
    to: email, // list of receivers
    subject: "Confirm your email!", // Subject line
    text: `Here's your confirmation code : ${code} Click here`, // plain text body
    html: `<h2>Here's your confirmation code : ${code}</h2>`, // html body
  });

  return emailRes;
}
