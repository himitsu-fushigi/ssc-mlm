const express = require("express");
const DistributorChainRouter = express.Router();

// @dev controllers & middlewares
const { createChain } = require("../controllers/Distributor.Chain");
const { createFinance } = require("../controllers/Distributor.Finance");
const {
  createAuthentication,
} = require("../controllers/Distributor.Authentication");
const {
  validateDistributor,
} = require("../middlewares/Distributor.Validation");
const { createAdminFinance } = require("../controllers/Admin.Finance");

// @dev routes
DistributorChainRouter.post(
  "/create-chain",
  validateDistributor,
  createChain,
  createFinance,
  createAdminFinance,
  createAuthentication
);

module.exports = DistributorChainRouter;
