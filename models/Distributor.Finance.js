const mongoose = require("mongoose");

const documentType = (type, require) => {
  return {
    type,
    required: require,
  };
};

const DistributorFinanceSchema = new mongoose.Schema({
  _id: mongoose.Types.ObjectId,
  ssc_number: documentType(String, true),
  amount_earned: documentType(String, true),
  amount_earned_from: documentType(Array, true),
  created_at: documentType(String, true),
  expires_at: documentType(String, true),
});

module.exports = DistributorFiananceModel = mongoose.model(
  "distributor-finance",
  DistributorFinanceSchema
);
