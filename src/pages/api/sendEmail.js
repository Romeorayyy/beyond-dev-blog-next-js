import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).end();
  }

  // Destructure the data from the request body
  const { name, subject, email, inquiryDetails } = req.body;

  // Check if environment variables are set correctly
  if (!process.env.EMAIL || !process.env.PASSWORD) {
    console.error('EMAIL or PASSWORD environment variable is not set.');
    return res
      .status(500)
      .json({ success: false, message: 'Server configuration error.' });
  }

  // Create the transporter for nodemailer
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });

  // Set up the email options
  const mailOptions = {
    from: email,
    to: process.env.EMAIL,
    subject: `New contact from ${name}: ${subject}`,
    text: inquiryDetails,
  };

  // Try sending the email and respond accordingly
  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', info);
    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error sending email:', error);
    return res.status(500).json({ success: false, message: error.message });
  }
}
