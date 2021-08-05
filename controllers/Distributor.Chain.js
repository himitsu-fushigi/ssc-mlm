const DistributorChain = require("../models/Distributor.Chain");

module.exports = {
  // @dev initialize chain for distributor
  createChain: async (req, res, next) => {
    const {
      newNode,
      first_name,
      middle_name,
      last_name,
      amount,
      referrer,
      createdAt,
      expiresAt,
    } = req.body;

    try {
      const checkIfUserExists = await DistributorChain.findOne({
        ssc_number: newNode,
      });

      // @dev check if the new node is already a distributor
      if (checkIfUserExists)
        return res.status(400).json({
          message: "Distributor with given SSC Number already exists!",
        });

      const _id = require("mongoose").Types.ObjectId();
      const full_name = [first_name, middle_name, last_name];

      // @dev intialize the new chain
      let newChain;

      if (referrer)
        newChain = new DistributorChain({
          _id,
          ssc_number: newNode,
          full_name: middle_name
            ? full_name.join(" ")
            : `${first_name} ${last_name}`,
          ssc_type: amount,
          referrer,
          created_at: createdAt,
          expires_at: expiresAt,
        });
      else
        newChain = new DistributorChain({
          _id,
          ssc_number: newNode,
          full_name: middle_name
            ? full_name.join(" ")
            : `${first_name} ${last_name}`,
          ssc_type: amount,
          referrer: "",
          created_at: createdAt,
          expires_at: expiresAt,
        });

      await newChain.save();

      req.chainId = _id;
      next();
    } catch (error) {
      console.log(error);
    }
  },
};
