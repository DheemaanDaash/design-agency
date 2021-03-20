const Course = require('../../../models/course')

function courseController() {
    return {
        async course(req, res) {
            const courses = await Course.find()
            console.log(courses)
            return res.render('customers/courses', {courses: courses})

            /*Menu.find().then(function(courses){
                console.log(courses)
                return res.render('home', {courses: courses})
            })*/
        }
    }
}

module.exports = courseController