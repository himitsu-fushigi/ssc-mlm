const mongoose = require("mongoose");

const documentType = (type, require) => {
    return {
        type,
        required: require
    }
}

const DistributorAuthenticationSchema = new mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    phone_number: documentType(String, true),
    password: documentType(String, true),
    created_at: documentType(String, true),
    expires_at: documentType(String, true)
});

module.exports = DistributorChainModel = mongoose.model(
  "distributor-authentication",
  DistributorAuthenticationSchema
);
