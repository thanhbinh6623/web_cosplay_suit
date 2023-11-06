var myMD = require('../models/cosplau_suit_user_model');
var myUser = require('../models/cosplay_suit_model');

exports.homeWeb = async (req, res, next) => {
    console.log(req.session.userU);
    var username = req.session.userU.fullname;
    res.render('cosplay_suit/home', { username: username });
}

exports.quanlyKH = async (req, res, next) => {
    // var username = req.session.userU.fullname;
    let username = req.session.userU.fullname;
    let page = Number(req.query.page) || 1;
    let limit = Number(req.query.limit) || 5;
    let skip = (page - 1) * limit;
    let dieu_Kien = {};
    if (typeof (req.query.email) != 'undefined') {
        dieu_Kien = { email: new RegExp('.*' + req.query.email + '.*') };
    }
    let list = await myMD.tb_userModel.find({role: { $ne: "Admin" }});
    let page_length = Math.ceil(list.length / limit);
    //page_length = 3

    let listUser = await myMD.tb_userModel.find({ $and: [{ role: { $ne: "Admin" } }, dieu_Kien] })
        .skip(skip)
        .limit(limit);


    if (req.method == 'POST') {
        let v = req.body.id__v;
        let id = req.body.id_user;
        console.log(v);
        let objU = new myMD.tb_userModel();
        if (v == 0) {
            objU.__v = 1;
        } else {
            objU.__v = 0;
        }



        objU._id = id;

        try {
            await myMD.tb_userModel.findByIdAndUpdate({ _id: id }, objU);
            
        } catch (error) {
            msg = 'loi';
            console.log(error);
        }
        res.redirect('/users/home/quanlykhachhang');
        return;
    }

    res.render('navigation_view/quanlykhachhang', { username: username, listUser: listUser, page_length: page_length, page: page });
}

exports.quanlyKHVoHieuHoa = async (req, res, next) => {
    // var username = req.session.userU.fullname;
    let username = req.session.userU.fullname;
    let page = Number(req.query.page) || 1;
    let limit = Number(req.query.limit) || 5;
    let skip = (page - 1) * limit;
    let dieu_Kien = {};
    if (typeof (req.query.email) != 'undefined') {
        dieu_Kien = { email: new RegExp('.*' + req.query.email + '.*') };
    }
    let list = await myMD.tb_userModel.find( );
    let page_length = Math.ceil(list.length / limit);
    //page_length = 3

    let listUser = await myMD.tb_userModel.find({ $and: [{ role: { $ne: "Admin" } }, dieu_Kien] })
        .skip(skip)
        .limit(limit);
    let v = req.body.id__v;
    let id = req.body.id_user;
    console.log(v);
    if (req.method == 'POST') {
        let objU = new myMD.tb_userModel();
        if (v == 0) {
            objU.__v = 1;
        } else {
            objU.__v = 0;
        }



        objU._id = id;

        try {
            await myMD.tb_userModel.findByIdAndUpdate({ _id: id }, objU);

            res.redirect('/users/home/quanlykhachhang');
        } catch (error) {
            msg = 'loi';
            console.log(error);
        }
    }




    res.render('navigation_view/quanlykhachhang', { username: username, listUser: listUser, page_length: page_length, page: page });
}


exports.quanlyKHbyID = async (req, res, next) => {
    let list = await myMD.tb_userModel.findOne({ _id: req.params._id });

    res.json(list);
}
exports.deleteKHbyID = async (req , res,next) => {
    let id = req.params.id;
    try {
        
        await myMD.tb_userModel.findByIdAndDelete(id,req.body );
        res.redirect('/users/home/quanlykhachhang');
        
    } catch (error) {
        
    }
    res.render('navigation_view/quanlykhachhang');
}

