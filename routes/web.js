const homeController = require('../app/http/controllers/homeController')

function initRoutes(app) {
    //app.use(express.static('public'))
    app.get('/', homeController().index)

    app.get('/cart', (req, res) => {
        res.render('customer/cart')
    })

    app.get('/login', (req, res) => {
        res.render('auth/login')
    })

    app.get('/register', (req, res) => {
        res.render('auth/register')
    })
}

module.exports = initRoutes