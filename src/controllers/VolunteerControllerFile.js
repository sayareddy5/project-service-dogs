const VolunteerForm = require("../models/volunteerForm")
const volunteerController = {
    volunteering: (req, res) => {
        const authorized = req.session.user && req.session.user.authorized === true;
        const username = req.session.user ? req.session.user.username : null;
        
        console.log(req.session.user)
        res.render('volunteer/volunteering.ejs',{authorized, username, title: "Volunteer"});
    },
    HandleVolunteerForm: (req, res) => {
        const formData = req.body;
        const volunteerForm = new VolunteerForm(formData);
        volunteerForm.save()
            

        return res.redirect("/volunteer/volunteering");

    }
};


module.exports = volunteerController