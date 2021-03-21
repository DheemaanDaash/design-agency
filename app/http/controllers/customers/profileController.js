const Profile = require ('../../../models/profile')

function profileController() {
    return {
        async profile(req, res) {
            const profiles = await Profile.find()
            console.log(profiles)
            return res.render('/customers/profile', {profiles: profiles})
        }
    }
}

module.exports = profileController