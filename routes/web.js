const homeController = require('../app/http/controllers/homeController')
const authController = require('../app/http/controllers/authController')
const cartController = require('../app/http/controllers/customers/cartController')
const courseController = require('../app/http/controllers/customers/courseController')
const profileController = require('../app/http/controllers/customers/profileController')
const taskController = require('../app/http/controllers/customers/taskController')
const adminTaskController = require('../app/http/controllers/admin/taskController')
const statusController = require('../app/http/controllers/admin/statusController')

// Middlewares
const guest = require('../app/http/middleware/guest')
const auth = require('../app/http/middleware/auth')
const admin = require('../app/http/middleware/admin')


function initRoutes(app) {
    app.get('/', homeController().index)
    app.get('/login', guest, authController().login)
    app.post('/login', authController().postLogin)
    app.get('/register', guest, authController().register)
    app.post('/register', authController().postRegister)
    app.post('/logout', authController().logout)

    app.get('/cart', cartController().cart)
    app.post('/update-cart', cartController().update)
    
    // Customer routes
    app.get('/courses', courseController().course)
    app.get('/profile', profileController().profile)
    app.post('/tasks', auth, taskController().store)
    app.get('/customer/tasks', auth, taskController().index)
    app.get('/customer/tasks/:id', auth, taskController().show)

    // Admin routes
    app.get('/admin/tasks', admin, adminTaskController().index)
    app.post('/admin/task/status', admin, statusController().update)
}

module.exports = initRoutes