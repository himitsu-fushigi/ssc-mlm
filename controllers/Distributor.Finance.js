const DistributorChain = require("../models/Distributor.Chain");
const DistributorFinance = require("../models/Distributor.Finance");

module.exports = {
  createFinance: async (req, res, next) => {
    const { createdAt, expiresAt, newNode, referrer, amount } = req.body;

    try {
      const newFinance = new DistributorFinance({
        _id: req.chainId,
        ssc_number: newNode,
        amount_earned: "0",
        amount_earned_from: [],
        created_at: createdAt,
        expires_at: expiresAt,
      });

      // @dev check if there is referrer then go to 3 levels
      if (referrer) {
        var count = 1;

        // @dev first check second level referrer
        const temp_referrer = await DistributorChain.findOne({
          ssc_number: referrer,
        });

        if (temp_referrer.referrer) count = 2; // @dev if the distributor has 2 level of referrer increase count

        // @dev get previous finance to add new amount to referrer
        const prevDistributorFinance = await DistributorFinance.findOne({
          ssc_number: referrer,
        });

        // @dev distribute amount to referrer & admin here
        if (count === 1) {
          switch (amount) {
            // @dev if card type is 1000
            case "1000":
              // @dev update distributor finance
              await DistributorFinance.updateOne(
                {
                  ssc_number: referrer,
                },
                {
                  $set: {
                    amount_earned: prevDistributorFinance.amount_earned + 120,
                    amount_earned_from: [
                      ...prevDistributorFinance.amount_earned_from,
                      newNode,
                    ],
                  },
                }
              );
              break;

            // @dev if card type is 2000
            case "2000":
              // @dev update distributor finance
              await DistributorFinance.updateOne(
                {
                  ssc_number: referrer,
                },
                {
                  $set: {
                    amount_earned: prevDistributorFinance.amount_earned + 240,
                    amount_earned_from: [
                      ...prevDistributorFinance.amount_earned_from,
                      newNode,
                    ],
                  },
                }
              );
              break;

            // @dev if card type is 3000
            case "3000":
              // @dev update distributor finance
              await DistributorFinance.updateOne(
                {
                  ssc_number: referrer,
                },
                {
                  $set: {
                    amount_earned: prevDistributorFinance.amount_earned + 365,
                    amount_earned_from: [
                      ...prevDistributorFinance.amount_earned_from,
                      newNode,
                    ],
                  },
                }
              );
              break;

              return;
          }
        } else if (count === 2) {
          const firstLevelFinance = await DistributorFinance.findOne({
            ssc_number: temp_referrer.referrer,
          });
          switch (amount) {
            case "1000":
              // @dev update distributor finance
              await DistributorFinance.updateOne(
                {
                  ssc_number: referrer,
                },
                {
                  $set: {
                    amount_earned: prevDistributorFinance.amount_earned + 120,
                    amount_earned_from: [
                      ...prevDistributorFinance.amount_earned_from,
                      newNode,
                    ],
                  },
                }
              );

              // @dev update distributor finance
              await DistributorFinance.updateOne(
                {
                  ssc_number: temp_referrer.referrer,
                },
                {
                  $set: {
                    amount_earned: firstLevelFinance.amount_earned + 120,
                    amount_earned_from: [
                      ...prevDistributorFinance.amount_earned_from,
                      newNode,
                    ],
                  },
                }
              );
              break;
            case "2000":
              // @dev update distributor finance
              await DistributorFinance.updateOne(
                {
                  ssc_number: referrer,
                },
                {
                  $set: {
                    amount_earned: prevDistributorFinance.amount_earned + 240,
                    amount_earned_from: [
                      ...prevDistributorFinance.amount_earned_from,
                      newNode,
                    ],
                  },
                }
              );

              // @dev update distributor finance
              await DistributorFinance.updateOne(
                {
                  ssc_number: temp_referrer.referrer,
                },
                {
                  $set: {
                    amount_earned: firstLevelFinance.amount_earned + 240,
                    amount_earned_from: [
                      ...prevDistributorFinance.amount_earned_from,
                      newNode,
                    ],
                  },
                }
              );
              break;

            case "3000":
              // @dev update distributor finance
              await DistributorFinance.updateOne(
                {
                  ssc_number: referrer,
                },
                {
                  $set: {
                    amount_earned: prevDistributorFinance.amount_earned + 365,
                    amount_earned_from: [
                      ...prevDistributorFinance.amount_earned_from,
                      newNode,
                    ],
                  },
                }
              );

              // @dev update distributor finance
              await DistributorFinance.updateOne(
                {
                  ssc_number: temp_referrer.referrer,
                },
                {
                  $set: {
                    amount_earned: firstLevelFinance.amount_earned + 365,
                    amount_earned_from: [
                      ...prevDistributorFinance.amount_earned_from,
                      newNode,
                    ],
                  },
                }
              );
              break;

              return;
          }
        }
      }

      newFinance.save();
      next();
    } catch (error) {
      console.log(error);
    }
  },
};
