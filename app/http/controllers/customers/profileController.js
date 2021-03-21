const Profile = require ('../../../models/profile')

function profileController() {
    return {
        async profile(req, res) {
            const profiles = await Profile.find()
            console.log(profiles)
            return res.render('customers/profiles', {profiles: profiles})
        }
    }
}

module.exports = profileController