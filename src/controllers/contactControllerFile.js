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
            // Create a new Contact instance
            const newContact = new Contact({
                name,
                email,
                question
            });
     
            // Save the new contact to the database
            await newContact.save();
    
            // Send a success response
            res.status(200).send('Form submitted successfully!');
        } catch (error) {
            // Handle errors appropriately
            console.error('Error saving contact form data:', error);
            res.status(500).send('Internal Server Error');
        }
    
    }
};


module.exports = ContactController