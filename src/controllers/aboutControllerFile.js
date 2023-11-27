const Question = require("../models/faqModel")
const User = require("../models/User")

const AboutController = {
    organizationHandle:async (req, res) => {
        const authorized = req.session.user && req.session.user.authorized === true;
        const username = req.session.user ? req.session.user.username : null;
        const userImageUrl = req.session.user ? req.session.user.imageUrl : null
        
        //render page with the required details to display
        res.render('abouttemplates/organization.ejs',{username, authorized, title:"Our Organization",imageUrl:userImageUrl});
    },
    FAQHandle: async (req, res) => {
        const authorized = req.session.user && req.session.user.authorized === true;
        const username = req.session.user ? req.session.user.username : null;
        const userImageUrl = req.session.user ? req.session.user.imageUrl : null

        
        //render page with the required details to display
        res.render('abouttemplates/faq.ejs',{username, authorized, title:"FAQ",imageUrl:userImageUrl});
    },
    faqFormHanle: async (req, res) => {
        // get question and email from req.body 
        const { question, email } = req.body;

        try {
            // cretae a neww question instance
            const newQuestion = new Question({
                question,
                email
            });

            // save the question
            await newQuestion.save();

            //send message success
            res.status(200).send('Form submitted successfully!');
        } catch (error) {
            
            // any errors send the default internal server error
            console.error('Error saving question form data:', error);
            res.status(500).send('Internal Server Error');
        }
    },
};


module.exports = AboutController