const task = require('../../../models/task')
const Task = require('../../../models/task')

function taskController () {
    return {
        index (req, res) {
            task.find({ status: { $ne: 'completed' } }, null, { sort: { 'createdAt':-1 } }).populate('customerId', '-password').exec((err, tasks) => {
                if(req.xhr) {
                    return res.json(tasks)
                } else {
                    return res.render('admin/tasks')
                }
            })
        }
    }
}
module.exports = taskController