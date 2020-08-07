module.exports = {
    development: {
        port: process.env.PORT || 3000,
        saltingRounds: 10,
        corsOptions: {
            origin: [`http://localhost:8080`],
            credentials: true
        },
        jwtSecure: false,
        jwtCookieExpiry: new Date(Date.now() + 604800000),
        jwtOption: { expiresIn: '1d', issuer: process.env.ISSUER },
        jwtSecret: process.env.JWT_SECRET,
        mongoUri: process.env.ATLAS_URI_RW
    },
    production: {
        port: process.env.PORT || 80,
        saltingRounds: 10,
        corsOptions: {
            origin: [`https://monthly-budget-calculator.herokuapp.com`],
            credentials: true
        },
        jwtSecure: true,
        jwtCookieExpiry: new Date(Date.now() + 604800000),
        jwtOption: { expiresIn: '1d', issuer: process.env.ISSUER },
        jwtSecret: process.env.JWT_SECRET,
        mongoUri: process.env.ATLAS_URI_RW
    }
}