import express, { json } from 'express';
import { createTransport } from 'nodemailer';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());
app.use(json());

const transporter = createTransport({
  service: 'Gmail',
  auth: {
    user: 'samnangproducer@gmail.com',
    pass: 'ltkioazqesubwsbc', 
  },
});

app.post('/send-email', async (req, res) => {
  const { name, email, message } = req.body;

  const mailOptions = {
    from: 'samnangproducer@gmail.com',
    to: 'samnangproducer@gmail.com',  
    replyTo: email,                    
    subject: `New message from ${name}`,
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.5; color: #333;">
        <h2 style="color: #007BFF;">New Contact Message</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> <a href="mailto:${email}" style="color: #007BFF;">${email}</a></p>
        <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
        <p style="white-space: pre-wrap;">${message}</p>
        <footer style="margin-top: 30px; font-size: 0.85em; color: #666;">
          This message was sent from your website contact form.
        </footer>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.log('Email error:', error);
    res.status(500).json({ message: 'Failed to send email' });
  }
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});
