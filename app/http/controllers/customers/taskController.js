const Task = require('../../../models/task')
const moment = require('moment')

function orderController () {
    return {
        store (req, res) {
            // Validate request
            const { phone, address } = req.body
            if( !phone || !address) {
                req.flash('error', 'All fields are required')
                return res.redirect('/cart')
            }
            const task = new Task({
                customerId: req.user._id,
                items: req.session.cart.items,
                phone,
                address
            })
            task.save().then(result =>{
                Task.populate(result, { path: 'customerId' }, (err, placedTask) => {
                    req.flash('sussess', 'Task created successfully')
                    delete req.session.cart
                    // Emit
                    const eventEmitter = req.app.get('eventEmitter')
                    eventEmitter.emit('taskPlaced', placedTask)
                    return res.redirect('/customer/tasks')
                })
                
            }).catch(err => {
                req.flash('error', 'Something went wrong')
                return res.redirect('/cart')
            })
        },
        async index(req, res) {
            const tasks = await Task.find({ customerId: req.user._id },
                null,
                { sort: { 'createdAt': -1 } } )
                res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check-0, pre-check=0')
            res.render('customers/tasks', { tasks: tasks, moment: moment })
        },
        async show(req, res) {
            const task = await Task.findById(req.params.id)
            // Authorize User
            if(req.user._id.toString() === task.customerId.toString()) {
                return res.render('customers/singleTask', { task })
            } 
            return res.redirect('/')
        }
    }
}
module.exports = orderController