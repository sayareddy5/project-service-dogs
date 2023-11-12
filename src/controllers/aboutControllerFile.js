const Question = require("../models/faqModel")
const User = require("../models/User")

const AboutController = {
    organizationHandle:async (req, res) => {
        const authorized = req.session.user && req.session.user.authorized === true;
        const username = req.session.user ? req.session.user.username : null;
        const userImageUrl = req.session.user ? req.session.user.imageUrl : null
        
        res.render('abouttemplates/organization.ejs',{username, authorized, title:"Our Organization",imageUrl:userImageUrl});
    },
    FAQHandle: async (req, res) => {
        const authorized = req.session.user && req.session.user.authorized === true;
        const username = req.session.user ? req.session.user.username : null;
        const userImageUrl = req.session.user ? req.session.user.imageUrl : null

        res.render('abouttemplates/faq.ejs',{username, authorized, title:"FAQ",imageUrl:userImageUrl});
    },
    newsletterHandle: async (req, res) => {
        const authorized = req.session.user && req.session.user.authorized === true;
        const username = req.session.user ? req.session.user.username : null;
        const userImageUrl = req.session.user ? req.session.user.imageUrl : null
        
        res.render('abouttemplates/newsletter.ejs',{username, authorized, title:"NewsLetter",imageUrl:userImageUrl});
    },
    faqFormHanle: async (req, res) => {
        const { question, email } = req.body;

        try {
            const newQuestion = new Question({
                question,
                email
            });

            await newQuestion.save();

            res.status(200).send('Form submitted successfully!');
        } catch (error) {
            
            console.error('Error saving question form data:', error);
            res.status(500).send('Internal Server Error');
        }
    },
};


module.exports = AboutController