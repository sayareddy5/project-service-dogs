const Donation = require("../models/donationModel")
const User = require("../models/User")

const DonateController = {
    index: async (req, res) => {
        // get the user details if the user exists in  req.session  object
        const authorized = req.session.user && req.session.user.authorized === true;
        const username = req.session.user ? req.session.user.username : null;
        const userImageUrl = req.session.user ? req.session.user.imageUrl : null

        // render page with rewuired details of the user
        res.render('donate/donate-main.ejs',{authorized, username, title: "Donate",imageUrl:userImageUrl});
    },
    paymentPage: async (req, res) => {
        // get the user details if the user exists in  req.session  object
        const authorized = req.session.user && req.session.user.authorized === true;
        const username = req.session.user ? req.session.user.username : null;
        const userImageUrl = req.session.user ? req.session.user.imageUrl : null
        
        // rendesr page with required detail of the user
        res.render('donate/donate-page.ejs',{layout: 'baseTemplates/payment.ejs',authorized, username, title: "Payment Page",imageUrl:userImageUrl});
    },

    handlePayment: async (req, res) =>{

        // get the form data from the req.body object
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

        // save the new donation instance
        await newDonation.save();
        try {
            
            // redirect to PayPal payment page
            const paypalPaymentUrl = `https://www.sandbox.paypal.com/donate/?hosted_button_id=4TTJFAWB6S8U6`;

            // redirect the user to the payment page
            res.redirect(paypalPaymentUrl);
        } catch (error) {
            res.status(500).json({ error: 'Something is Wrong please try after sometime' });
        }
    }
};


module.exports = DonateController