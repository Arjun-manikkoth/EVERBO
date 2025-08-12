const Admin = require("../models/adminModel");
const User = require("../models/userModel");
const Banner = require("../models/bannerModel");
const { BANNER_ADDED, AUTH_MESSAGES, BANNER_MESSAGES } = require("../constants/messages");
const bcrypt = require("bcrypt");

//admin login load
const loadLogin = async (req, res) => {
    try {
        res.render("login");
    } catch (error) {
        console.log(error.message);
    }
};

//admin verify login
const verifyLogin = async (req, res) => {
    try {
        const Email = req.body.email;
        const Password = req.body.password;
        const userData = await Admin.findOne({ email: Email });

        if (userData) {
            const match = await bcrypt.compare(Password, userData.password);
            if (match) {
                req.session.admin_Id = userData._id;
                res.redirect("/admin/dashboard");
            } else {
                res.render("login", { message_signin: AUTH_MESSAGES.WRONG_CREDENTIALS });
            }
        } else {
            res.render("login", { message_signin: AUTH_MESSAGES.ACCOUNT_NOT_FOUND });
        }
    } catch (error) {
        console.log(error.message);
    }
};

//view users page
const usersLoad = async (req, res) => {
    try {
        let page = 1;
        if (req.query.page) {
            page = req.query.page;
        }
        let limit = 18;
        let count = await User.find({}).countDocuments();
        let totalPages = Math.ceil(count / limit);
        const userDetails = await User.find({})
            .limit(limit)
            .skip((page - 1) * limit);
        res.render("users", { userDetails, totalPages, currentPage: page });
    } catch (error) {
        console.log(error.message);
    }
};

//user management page
const userBlock = async (req, res) => {
    try {
        const Id = req.query.id;
        const userData = await User.findOne({ _id: Id });
        if (userData.is_blocked == 0) {
            const value = 1;
            await User.updateOne({ _id: Id }, { $set: { is_blocked: value } });
        } else {
            const value = 0;
            await User.updateOne({ _id: Id }, { $set: { is_blocked: value } });
        }
        res.redirect("/admin/users");
    } catch (error) {
        console.log(error.message);
    }
};

//admin logout
const logout = async (req, res) => {
    try {
        req.session.destroy();
        res.redirect("/admin");
    } catch (error) {
        console.log(error.message);
    }
};

//load banner page
const bannerLoad = async (req, res) => {
    try {
        let page = 1;
        if (req.query.page) {
            page = req.query.page;
        }
        let limit = 4;
        let count = await Banner.find({}).countDocuments();
        let totalPages = Math.ceil(count / limit);
        const banner = await Banner.find({})
            .limit(limit)
            .skip((page - 1) * limit)
            .sort({ createdAt: 1 });

        res.render("banner", { banner, totalPages, currentPage: page });
    } catch (error) {
        console.log(error.message);
    }
};

//load add banner page
const addBannerLoad = async (req, res) => {
    try {
        res.render("add_banner");
    } catch (error) {
        console.log(error.message);
    }
};

//add category to db
const addBanner = async (req, res) => {
    try {
        const banner = new Banner({
            image: req.file.filename,
        });
        await banner.save();
        res.status(200).json({ message: BANNER_MESSAGES.BANNER_ADDED });
    } catch (error) {
        console.log(error.message);
    }
};

//banner management page
const bannerSelect = async (req, res) => {
    try {
        const Id = req.query.id;
        const bannerData = await Banner.findOne({ _id: Id });
        if (bannerData.is_active === true) {
            await Banner.updateOne({ _id: Id }, { $set: { is_active: false } });
        } else {
            await Banner.updateMany({}, { $set: { is_active: false } });
            await Banner.updateOne({ _id: Id }, { $set: { is_active: true } });
        }
        res.redirect("/admin/banner");
    } catch (error) {
        console.log(error.message);
    }
};

module.exports = {
    loadLogin,
    verifyLogin,
    logout,
    usersLoad,
    userBlock,
    bannerLoad,
    addBannerLoad,
    addBanner,
    bannerSelect,
};
