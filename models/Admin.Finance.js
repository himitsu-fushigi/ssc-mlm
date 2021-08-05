const mongoose = require('mongoose');

const documentType = (type, required) => {
    return {
        type,
        required
    }
}

const AdminFinanceSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    salary_reserve: documentType(Number, false),
    ssc_reserve: documentType(Number, true),
    lead_account: documentType(Number, true),
    created_at: documentType(String, true),
    expires_at: documentType(String, true),
})

module.exports = AdminFinanceModel = mongoose.model('admin-finance', AdminFinanceSchema)