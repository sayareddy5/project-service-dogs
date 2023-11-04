const VolunteerForm = require("../models/volunteerForm")
const volunteerController = {
    volunteering: (req, res) => {
        const authorized = req.session.user && req.session.user.authorized === true;
        const username = req.session.user ? req.session.user.username : null;
        
        
        res.render('volunteer/volunteering.ejs',{authorized, username, title: "Volunteer"});
    },
    showVolunteerApplication: (req, res) => {
        const authorized = req.session.user && req.session.user.authorized === true;
        const username = req.session.user ? req.session.user.username : null;
        
        
        res.render('volunteer/volunteer-application.ejs',{authorized, username, title: "Volunteer Application"});
    },
    HandleVolunteerForm: (req, res) => {
        const formData = req.body;
        const volunteerForm = new VolunteerForm(formData);
        volunteerForm.save()
            

        return res.redirect("/volunteer/volunteering");

    }
};


module.exports = volunteerController