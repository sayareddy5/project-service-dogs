const Donation = require("../models/donationModel")
const User = require("../models/User")

const DonateController = {
    index: async (req, res) => {
        const authorized = req.session.user && req.session.user.authorized === true;
        const username = req.session.user ? req.session.user.username : null;
        const userImageUrl = req.session.user ? req.session.user.imageUrl : null

        res.render('donate/donate-main.ejs',{authorized, username, title: "Donate",imageUrl:userImageUrl});
    },
    paymentPage: async (req, res) => {
        const authorized = req.session.user && req.session.user.authorized === true;
        const username = req.session.user ? req.session.user.username : null;
        const userImageUrl = req.session.user ? req.session.user.imageUrl : null
       
        res.render('donate/donate-page.ejs',{layout: 'baseTemplates/payment.ejs',authorized, username, title: "Payment Page",imageUrl:userImageUrl});
    },

    handlePayment: async (req, res) =>{
        const { amount, honoreeName, honoreeMessage, donationType, firstName, lastName, organizationName, emailPermission, mailPermission, email} = req.body;

        const newDonation = new Donation({
            amount,
            honoreeName,
            honoreeMessage,
            donationType,
            firstName,
            lastName,
            email,
            organizationName,
            emailPermission,
            mailPermission,
        });

        try {
            
            const savedDonation = await newDonation.save();
            // Redirect to PayPal payment page
            const paypalPaymentUrl = `https://www.sandbox.paypal.com/donate/?hosted_button_id=4TTJFAWB6S8U6`;
            res.redirect(paypalPaymentUrl);
        } catch (error) {
            res.status(500).json({ error: 'Something is Wrong please try after sometime' });
        }
    }
};


module.exports = DonateController