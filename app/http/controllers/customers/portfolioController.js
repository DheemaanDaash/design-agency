function portfolioController() {
    return {
        portfolio(req, res) {
            return res.render('customers/portfolios')
        }
    }
}

module.exports = portfolioController