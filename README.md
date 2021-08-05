## Swasthya Samriddhi Card - Multi Level Marketing (Backend)
***

In this project, server is created on `Node.js` where DB is on `MongoDB` & `Express.js` is used as a framework for Node.js.

#### Project Workflow
`index.js > app.js > routes (Distributor.Chain.js) > Controllers (Includes Models)`

<img src="./public/Screen%20Shot%202021-08-05%20at%2008.46.13.png"/>

#### Schema Design

<img src="./public/MLM-SSC.png"/>

#### Dev Documentation
* Middleware validates user input checks if given user phone number is used or not.
* **Distributor Chain** - `Create Chain` controller
  - Checks if provided SSC Number is already registered or not
  - Creates new document where full_name is conditionally set whether the `middle_name` is provided or not.
* **Distributor Finance** -  `createFinance` controller
  - checks if user has **referrer** or not 
  - if has referrer then again checks for if it's `single or double leveled referrer`
  - Earned amount is distributed as per marketing expenses layout on each different card, then new user `ssc_number` is pushed to `amount_earned_from` in referrers db
* **Admin Finance** - `createAdminFinance` Controller
  - Checks if user is admin or not i.e. Leader appointed by company
  - if it's not admin then he/she has no **salary_reserve** slab
  - again alike distributor finance level of referrance is checked
    ```
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
    ```
    In this snippet first _id of 1st level referrer is extracted to update AdminFinance Model i.e. _tempAdminChain and 2nd level referrer's _id is extracted from _tempFirstLevelReferrer.
    - Again amounts are distributed accordingly.
* **Distributor Authentication** - createAuthentication
  - user's phone number is extracted and default passord is assigned Default Auth Password is **SSC@user2021**

`Process is completed here for initial phase!`

***
###Contact For Support and Additional Information
Dev - Laxman Rai
email: laxman.rai@hashtechnologies.net
phone: 9849092326