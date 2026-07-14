const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.SENDER_EMAIL,
        pass: process.env.EMAIL_PASSWORD
    }
})

exports.sendMessage = async (req, res, next) => {
    try {
        const { name, email, phone, message } = req.body;

        if (!name || !message) {
            return res.status(400).json({ success: false, message: 'Name and message are required' });
        }

        const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: process.env.SENDER_EMAIL,
            replyTo: email,
            subject: `New enquiry from website - ${name}`,
            text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\n\nMessage:\n${message}`
        };

        transporter.sendMail(mailOptions, (error) => {
            if (error) {
                return res.status(500).json({ success: false, message: 'Could not send message, please try again later' });
            }
            res.status(200).json({ success: true, message: 'Message sent successfully' });
        })
    } catch (err) {
        next(err);
    }
}
