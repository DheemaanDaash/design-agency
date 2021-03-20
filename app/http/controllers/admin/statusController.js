const Task = require('../../../models/task')

function statusController() {
    return {
        update(req, res) {
            Task.updateOne({ _id: req.body.taskId }, { status: req.body.status }, (err, data) => {
                
                if(err) {
                    return res.redirect('/admin/tasks')
                }
                // Emit event
                const eventEmitter = req.app.get('eventEmitter')
                eventEmitter.emit('taskUpdated', { id: req.body.taskId, status: req.body.status })
                return res.redirect('/admin/tasks')
            })
        }
    }
}

module.exports = statusController