const DistributorChain = require("../models/Distributor.Chain");

module.exports = {
  // @dev initialize chain for distributor
  createChain: async (req, res, next) => {
    // @dev req.body is a user input from either postman or ssc user node server
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
      // @dev ssc_number must be unique thus check if the ssc_number already exists
      const checkIfUserExists = await DistributorChain.findOne({
        ssc_number: newNode,
      });

      if (checkIfUserExists)
        return res.status(400).json({
          message: "Distributor with given SSC Number already exists!",
        });

      // @dev _id is used for referrence around different models
      const _id = require("mongoose").Types.ObjectId();

      // @dev user name is divided into 3 parts so convert to array and join as a single string
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
