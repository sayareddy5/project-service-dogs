const Contact = require("../models/contactForm")
const user = require("../models/User")
const ContactController = {
    index: async (req, res) => {

        // get the user details if the user exits in req.session object
        const authorized = req.session.user && req.session.user.authorized === true;
        const username = req.session.user ? req.session.user.username : null;
        const userImageUrl = req.session.user ? req.session.user.imageUrl : null

        // render the page with required details
        res.render('contact/contact-us.ejs',{authorized, username, title: "Contact",imageUrl:userImageUrl});
    },

    contactFormHandle: async(req, res) => {

        // get details from the req.body obejct
        const { name, email, question } = req.body;
  
        try {
            // create a new cotnact instance
            const newContact = new Contact({
                name,
                email,
                question
            });
            
            // save the contact from data
            await newContact.save();
    
            res.status(200).send('Form submitted successfully!');
        } catch (error) {
            console.error('Error saving contact form data:', error);
            res.status(500).send('Internal Server Error');
        }
    
    }
};


module.exports = ContactController