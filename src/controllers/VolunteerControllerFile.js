const VolunteerForm = require("../models/volunteerForm")
const User = require("../models/User")

const volunteerController = {
    volunteering: (req, res) => {

        // get the user details if the user exists in  req.session  object
        const authorized = req.session.user && req.session.user.authorized === true;
        const username = req.session.user ? req.session.user.username : null;
        const userImageUrl = req.session.user ? req.session.user.imageUrl : null
        
        // render page with required detail
        res.render('volunteer/volunteering.ejs',{authorized, username, title: "Volunteer",imageUrl:userImageUrl});
    },
    showVolunteerApplication:async (req, res) => {

        // get the user details if the user exists in  req.session  object
        const authorized = req.session.user && req.session.user.authorized === true;
        const username = req.session.user ? req.session.user.username : null;
        const userImageUrl = req.session.user ? req.session.user.imageUrl : null

        // render page with required detail
        res.render('volunteer/volunteer-application.ejs',{authorized, username, title: "Volunteer Application",imageUrl:userImageUrl});
    },
    HandleVolunteerForm: async (req, res) => {

        // get the form data
        const formData = req.body;
        // create a new volunteerForm instance
        const volunteerForm = new VolunteerForm(formData);

        // save the volunteer from
    
        await volunteerForm.save();
        res.status(200).json({ success: true });
        // redirec to volunteering page
        

    }
};


module.exports = volunteerController