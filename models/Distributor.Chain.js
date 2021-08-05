const mongoose = require("mongoose");

const documentType = (type, require) => {
  return {
    type,
    required: require,
  };
};

const DistributorChainSchema = new mongoose.Schema({
  _id: mongoose.Types.ObjectId,
  ssc_number: documentType(String, true),
  full_name: documentType(String, true),
  ssc_type: documentType(String, true),
  referrer: documentType(String),
  created_at: documentType(String, true),
  expires_at: documentType(String, true),
});

module.exports = DistributorChain = mongoose.model(
  "distributor-chain",
  DistributorChainSchema
);
