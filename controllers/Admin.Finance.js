const AdminFinance = require("../models/Admin.Finance");
const DistributorChain = require("../models/Distributor.Chain");
// const DistributorFinance = require("../models/Distributor.Finance");

module.exports = {
  createAdminFinance: async (req, res, next) => {
    const { createdAt, expiresAt, isAdmin, referrer, amount } = req.body;

    try {
      // @dev only leaders have the salary reserve
      if (isAdmin) {
        const newAdminFinance = new AdminFinance({
          _id: req.chainId,
          salary_reserve: 0,
          ssc_reserve: 0,
          lead_account: 0,
          created_at: createdAt,
          expires_at: expiresAt,
        });

        await newAdminFinance.save();
      } else {
        const newAdminFinance = new AdminFinance({
          _id: req.chainId,
          ssc_reserve: 0,
          lead_account: 0,
          created_at: createdAt,
          expires_at: expiresAt,
        });

        await newAdminFinance.save();

        // @dev check if there is referrer then go to 3 levels
        if (referrer) {
          var count = 1;

          // @dev first check second level referrer
          const temp_referrer = await DistributorChain.findOne({
            ssc_number: referrer,
          });

          if (temp_referrer.referrer) count = 2; // @dev if the distributor has 2 level of referrer increase count

          // @dev distribute amount to referrer & admin here
          if (count === 1) {
            // @dev get previous finance to add new amount to admin
            const prevAdminFinance = await AdminFinance.findOne({
              _id: temp_referrer._id,
            });

            switch (amount) {
              // @dev if card type is 1000
              case "1000":
                if (!isNaN(prevAdminFinance.salary_reserve))
                  // @dev update admin finance
                  await AdminFinance.updateOne(
                    {
                      _id: prevAdminFinance._id,
                    },
                    {
                      $set: {
                        salary_reserve: prevAdminFinance.salary_reserve + 120,
                        ssc_reserve: prevAdminFinance.ssc_reserve + 5,
                        lead_account: prevAdminFinance.lead_account + 5,
                      },
                    }
                  );
                // @dev update admin finance
                else
                  await AdminFinance.updateOne(
                    {
                      _id: prevAdminFinance._id,
                    },
                    {
                      $set: {
                        ssc_reserve: prevAdminFinance.ssc_reserve + 5,
                        lead_account: prevAdminFinance.lead_account + 5,
                      },
                    }
                  );
                break;

              // @dev if card type is 2000
              case "2000":
                if (!isNaN(prevAdminFinance.salary_reserve))
                  // @dev update admin finance
                  await AdminFinance.updateOne(
                    {
                      _id: prevAdminFinance._id,
                    },
                    {
                      $set: {
                        salary_reserve: prevAdminFinance.salary_reserve + 245,
                        ssc_reserve: prevAdminFinance.ssc_reserve + 5,
                        lead_account: prevAdminFinance.lead_account + 5,
                      },
                    }
                  );
                // @dev update admin finance
                else
                  await AdminFinance.updateOne(
                    {
                      _id: prevAdminFinance._id,
                    },
                    {
                      $set: {
                        ssc_reserve: prevAdminFinance.ssc_reserve + 5,
                        lead_account: prevAdminFinance.lead_account + 5,
                      },
                    }
                  );
                break;

              // @dev if card type is 3000
              case "3000":
                if (!isNaN(prevAdminFinance.salary_reserve))
                  // @dev update admin finance
                  await AdminFinance.updateOne(
                    {
                      _id: prevAdminFinance._id,
                    },
                    {
                      $set: {
                        salary_reserve: prevAdminFinance.salary_reserve + 365,
                        ssc_reserve: prevAdminFinance.ssc_reserve + 10,
                        lead_account: prevAdminFinance.lead_account + 10,
                      },
                    }
                  );
                // @dev update admin finance
                else
                  await AdminFinance.updateOne(
                    {
                      _id: prevAdminFinance._id,
                    },
                    {
                      $set: {
                        ssc_reserve: prevAdminFinance.ssc_reserve + 10,
                        lead_account: prevAdminFinance.lead_account + 10,
                      },
                    }
                  );
                break;
                return;
            }
          } else if (count === 2) {
            // @dev get previous finance to add new amount to admin
            const prevAdminFinance = await AdminFinance.findOne({
              _id: temp_referrer._id,
            });

            const _tempAdminChain = await DistributorChain.findOne({
              _id: temp_referrer._id,
            });

            const _tempFirstLevelReferrer = await DistributorChain.findOne({
              ssc_number: _tempAdminChain.referrer,
            });

            switch (amount) {
              // @dev if card type is 1000
              case "1000":
                if (!isNaN(prevAdminFinance.salary_reserve)) {
                  // @dev update admin finance
                  await AdminFinance.updateOne(
                    {
                      _id: prevAdminFinance._id,
                    },
                    {
                      $set: {
                        salary_reserve: prevAdminFinance.salary_reserve + 120,
                        ssc_reserve: prevAdminFinance.ssc_reserve + 5,
                        lead_account: prevAdminFinance.lead_account + 5,
                      },
                    }
                  );

                  await AdminFinance.updateOne(
                    {
                      _id: _tempFirstLevelReferrer._id,
                    },
                    {
                      $set: {
                        salary_reserve: prevAdminFinance.salary_reserve + 120,
                        ssc_reserve: prevAdminFinance.ssc_reserve + 5,
                        lead_account: prevAdminFinance.lead_account + 5,
                      },
                    }
                  );
                }
                // @dev update admin finance
                else {
                  await AdminFinance.updateOne(
                    {
                      _id: prevAdminFinance._id,
                    },
                    {
                      $set: {
                        ssc_reserve: prevAdminFinance.ssc_reserve + 5,
                        lead_account: prevAdminFinance.lead_account + 5,
                      },
                    }
                  );

                  await AdminFinance.updateOne(
                    {
                      _id: _tempFirstLevelReferrer._id,
                    },
                    {
                      $set: {
                        ssc_reserve: prevAdminFinance.ssc_reserve + 5,
                        lead_account: prevAdminFinance.lead_account + 5,
                      },
                    }
                  );
                }
                break;

              // @dev if card type is 2000
              case "2000":
                if (!isNaN(prevAdminFinance.salary_reserve)) {
                  // @dev update admin finance
                  await AdminFinance.updateOne(
                    {
                      _id: prevAdminFinance._id,
                    },
                    {
                      $set: {
                        salary_reserve: prevAdminFinance.salary_reserve + 245,
                        ssc_reserve: prevAdminFinance.ssc_reserve + 5,
                        lead_account: prevAdminFinance.lead_account + 5,
                      },
                    }
                  );

                  await AdminFinance.updateOne(
                    {
                      _id: _tempFirstLevelReferrer._id,
                    },
                    {
                      $set: {
                        salary_reserve: prevAdminFinance.salary_reserve + 245,
                        ssc_reserve: prevAdminFinance.ssc_reserve + 5,
                        lead_account: prevAdminFinance.lead_account + 5,
                      },
                    }
                  );
                }
                // @dev update admin finance
                else {
                  await AdminFinance.updateOne(
                    {
                      _id: prevAdminFinance._id,
                    },
                    {
                      $set: {
                        ssc_reserve: prevAdminFinance.ssc_reserve + 5,
                        lead_account: prevAdminFinance.lead_account + 5,
                      },
                    }
                  );

                  await AdminFinance.updateOne(
                    {
                      _id: _tempFirstLevelReferrer._id,
                    },
                    {
                      $set: {
                        ssc_reserve: prevAdminFinance.ssc_reserve + 5,
                        lead_account: prevAdminFinance.lead_account + 5,
                      },
                    }
                  );
                }
                break;

              // @dev if card type is 3000
              case "3000":
                if (!isNaN(prevAdminFinance.salary_reserve)) {
                  // @dev update admin finance
                  await AdminFinance.updateOne(
                    {
                      _id: prevAdminFinance._id,
                    },
                    {
                      $set: {
                        salary_reserve: prevAdminFinance.salary_reserve + 365,
                        ssc_reserve: prevAdminFinance.ssc_reserve + 10,
                        lead_account: prevAdminFinance.lead_account + 10,
                      },
                    }
                  );

                  await AdminFinance.updateOne(
                    {
                      _id: _tempFirstLevelReferrer._id,
                    },
                    {
                      $set: {
                        salary_reserve: prevAdminFinance.salary_reserve + 365,
                        ssc_reserve: prevAdminFinance.ssc_reserve + 10,
                        lead_account: prevAdminFinance.lead_account + 10,
                      },
                    }
                  );
                }
                // @dev update admin finance
                else {
                  await AdminFinance.updateOne(
                    {
                      _id: prevAdminFinance._id,
                    },
                    {
                      $set: {
                        ssc_reserve: prevAdminFinance.ssc_reserve + 10,
                        lead_account: prevAdminFinance.lead_account + 10,
                      },
                    }
                  );

                  await AdminFinance.updateOne(
                    {
                      _id: _tempFirstLevelReferrer._id,
                    },
                    {
                      $set: {
                        ssc_reserve: prevAdminFinance.ssc_reserve + 10,
                        lead_account: prevAdminFinance.lead_account + 10,
                      },
                    }
                  );
                }
                break;
                return;
            }
          }
        }
      }

      next();
    } catch (error) {
      console.log(error);
    }
  },
};
