const Question = require("../models/faqModel")
const AboutController = {
    organizationHandle: (req, res) => {
        const authorized = req.session.user && req.session.user.authorized === true;
        const username = req.session.user ? req.session.user.username : null;
        res.render('abouttemplates/organization.ejs',{username, authorized, title:"Our Organization"});
    },
    FAQHandle: (req, res) => {
        const authorized = req.session.user && req.session.user.authorized === true;
        const username = req.session.user ? req.session.user.username : null;
        res.render('abouttemplates/faq.ejs',{username, authorized, title:"FAQ"});
    },
    newsletterHandle: (req, res) => {
        const authorized = req.session.user && req.session.user.authorized === true;
        const username = req.session.user ? req.session.user.username : null;
        res.render('abouttemplates/newsletter.ejs',{username, authorized, title:"NewsLetter"});
    },
    faqFormHanle: async (req, res) => {
        const { question, email } = req.body;

        try {
            // Create a new Question instance
            const newQuestion = new Question({
                question,
                email
            });

            // Save the new question to the database
            await newQuestion.save();

            // Send a success response
            res.status(200).send('Form submitted successfully!');
        } catch (error) {
            // Handle errors appropriately
            console.error('Error saving question form data:', error);
            res.status(500).send('Internal Server Error');
        }
    },
};


module.exports = AboutController