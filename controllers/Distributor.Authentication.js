const DistributorAuthentication = require("../models/Distributor.Authentication");

module.exports = {
    createAuthentication: async (req, res, next) => {
        const {phone, createdAt, expiresAt} = req.body;
        try {
            const newAuth = new DistributorAuthentication({
                _id: req.chainId,
                phone_number: phone,
                password: require('bcrypt').hashSync(process.env.DEFAULT_USER_PWD, 10),
                created_at: createdAt,
                expires_at: expiresAt
            })

            await newAuth.save()

            res.send("Done")
        } catch (error) {
            console.log(error)
        }
    }
}