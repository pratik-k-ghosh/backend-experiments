import { Resend } from "resend";
import env from "../config/env.js";

const resend = new Resend(env.resendAPI);

export const sendMail = async ({ to, subject, html }) => {
  try {
    const { error } = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: [to],
      subject,
      html,
    });

    if (error) return console.error({ error });
  } catch (err) {
    return console.error({ err });
  }
};
