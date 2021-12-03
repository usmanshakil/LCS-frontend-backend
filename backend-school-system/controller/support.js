const db = require('../models');
const { sendEmail } = require('../helper/email');
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/web_config.json')[env];
module.exports = {
    support: async (req, res, next) => {
        try {

            //Save user query into support table
            req.value.body.user_id = req.user.id;
            req.value.body.name = `${req.user.first_name} ${req.user.last_name}`;
            req.value.body.email = req.user.email;
            req.value.body.phone = req.user.phone;
            const support = await db.support.create(req.value.body);

            //Send email to super admin
            var supportDetail = [{
                contactEmail: config.contact_email,
                email: config.support_email,
                adminName: config.name,
                userEmail: req.user.email,
                subject: req.value.body.subject,
                message: req.value.body.message,
                hasSendToAdmin: true,
                ticketNumber: `#${support.id}`
            },
            {
                contactEmail: config.contact_email,
                email: req.user.email,
                userName: req.value.body.name,
                subject: req.value.body.subject,
                message: req.value.body.message,
                hasSendToAdmin: false,
                ticketNumber: `#${support.id}`,
                logo: config.email_logo
            }]
            //Send Email To Admin and user
            const emailResponse = await sendEmail('support', supportDetail)
            return res.status(200).json({ message: "Support request sent successfully" })
        } catch (err) {
            return res.status(400).json({ message: err.message })
        }
    }
}