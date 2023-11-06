const VolunteerForm = require("../models/volunteerForm")
const User = require("../models/User")

const volunteerController = {
    volunteering: (req, res) => {
        const authorized = req.session.user && req.session.user.authorized === true;
        const username = req.session.user ? req.session.user.username : null;
        const userImageUrl = req.session.user ? req.session.user.imageUrl : null
        
        res.render('volunteer/volunteering.ejs',{authorized, username, title: "Volunteer",imageUrl:userImageUrl});
    },
    showVolunteerApplication:async (req, res) => {
        const authorized = req.session.user && req.session.user.authorized === true;
        const username = req.session.user ? req.session.user.username : null;
        const userImageUrl = req.session.user ? req.session.user.imageUrl : null


        res.render('volunteer/volunteer-application.ejs',{authorized, username, title: "Volunteer Application",imageUrl:userImageUrl});
    },
    HandleVolunteerForm: (req, res) => {
        const formData = req.body;
        const volunteerForm = new VolunteerForm(formData);
        volunteerForm.save()
            

        return res.redirect("/volunteer/volunteering");

    }
};


module.exports = volunteerController