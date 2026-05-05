import dotenv from "dotenv";
import nodemailer from "nodemailer";

dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    type: "OAuth2",
    user: process.env.Gmail_User,
    clientId: process.env.Gmail_Client_Id,
    clientSecret: process.env.Gmail_Client_Secret,
    refreshToken: process.env.Gmail_Refresh_Token,
  },
});

// Verify the connection configuration
transporter.verify((error, success) => {
  if (error) {
    throw new Error(`Error connecting to email server: ${error.message}`);
  } else {
    console.log("Email server is ready to send messages");
  }
});

// Function to send email
export const sendEmail = async ({ to, subject, text, html }) => {
  try {
    const info = await transporter.sendMail({
      from: `"Auth with Redis" <${process.env.Gmail_User}>`, // sender address
      to, // list of receivers
      subject, // Subject line
      text, // plain text body
      html, // html body
    });

    console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  } catch (error) {
    throw new Error(`Error sending email: ${error.message}`);
  }
};
