const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export const sendVerificationCode = async (email, code) => {
  await sendEmail(email, "Verify you email", `OTP: ${code}`);
};

export const sendEmail = async (to, subject, content) => {
  await sgMail.send({
    from: process.env.SENDGRID_EMAIL,
    to,
    subject,
    html: `<strong>${content}</strong>`,
  });
};
