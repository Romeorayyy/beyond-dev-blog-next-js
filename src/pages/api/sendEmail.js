// pages/api/sendEmail.js
import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).end();
  }

  const { name, subject, email, inquiryDetails } = req.body;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });

  const mailOptions = {
    from: email,
    to: process.env.EMAIL,
    subject: `New contact from ${name}: ${subject}`,
    text: inquiryDetails,
  };

  const info = await transporter.sendMail(mailOptions);

  return res.status(200).json({ success: true });
}
