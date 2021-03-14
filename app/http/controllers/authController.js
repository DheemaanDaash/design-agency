function authController() {
    return {
        login(req, res) {
            res.render('home')
        }
    }
}

module.exports = authController