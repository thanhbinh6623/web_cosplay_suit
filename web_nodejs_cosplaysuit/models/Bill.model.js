var db = require('./db.model');
const mongoose = require("mongoose");

const tb_cartoder = new db.mongoose.Schema(
    {
        id_user: {type: db.mongoose.Schema.Types.ObjectId, ref: 'tb_userModel'},
        id_product: {type: db.mongoose.Schema.Types.ObjectId, ref: 'prodcutModel'},
        amount: {type: Number, require: true},
        properties : {type : String, require : true}
    },
    {
        collection: "cartorders"
    }
);

const tb_bill = new db.mongoose.Schema(
    {
        id_shop: {type: db.mongoose.Schema.Types.ObjectId, ref: 'tb_shopModel'},
        id_user: {type: db.mongoose.Schema.Types.ObjectId, ref: 'tb_userModel'},
        time: {type: String, require: true},
        status: {type: Number, require: true},
    },
    {
        collection: 'bills'
    }
);

const tb_billdetails = new db.mongoose.Schema(
    {
        id_bill: {type: db.mongoose.Schema.Types.ObjectId, ref: 'bill'},
        id_product: {type: db.mongoose.Schema.Types.ObjectId, ref: 'prodcutModel'},
        amount: {type: Number, require: true},
        time: {type: String, require: true},
        totalPayment: {type: Number, require: true}
    },
    {
        collection: 'billdetails'
    }
);

//tạo model
let tb_cartoderModel = db.mongoose.model('cartoder', tb_cartoder);
let tb_billModel = db.mongoose.model('bill', tb_bill);
let tb_billdetailsModel = db.mongoose.model('billdetails', tb_billdetails);

module.exports = {tb_cartoderModel,tb_billModel, tb_billdetailsModel};