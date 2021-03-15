const Menu = require('../../models/menu')

function homeController() {
    return {
        async index(req, res) {
            const services = await Menu.find()
            //console.log(services)
            return res.render('home', {services: services})

            /*Menu.find().then(function(services){
                console.log(services)
                return res.render('home', {services: services})
            })*/
        }
    }
}

module.exports = homeController