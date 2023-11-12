const Contact = require("../models/contactForm")
const user = require("../models/User")
const ContactController = {
    index: async (req, res) => {
        const authorized = req.session.user && req.session.user.authorized === true;
        const username = req.session.user ? req.session.user.username : null;
        const userImageUrl = req.session.user ? req.session.user.imageUrl : null

        res.render('contact/contact-us.ejs',{authorized, username, title: "Contact",imageUrl:userImageUrl});
    },
    contactFormHandle: async(req, res) => {

        const { name, email, question } = req.body;
  
        try {
            const newContact = new Contact({
                name,
                email,
                question
            });
    
            await newContact.save();
    
            res.status(200).send('Form submitted successfully!');
        } catch (error) {
            console.error('Error saving contact form data:', error);
            res.status(500).send('Internal Server Error');
        }
    
    }
};


module.exports = ContactController