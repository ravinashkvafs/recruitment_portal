'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const bcrypt = require('bcrypt-nodejs');
const dateFormat = require('../utility/date_format');
const UserSchema = new mongoose.Schema({
    emailid: { type: String, required: true, lowercase: true, unique: true, trim: true, index: true },
    password: { type: String, required: true, trim: true },
    fullname: { type: String, required: true, trim: true },
    email: { type: String, lowercase: true, trim: true },
    mobile: { type: String, lowercase: true, trim: true },
    gender: { type: String, lowercase: true, trim: true },
    role: {
        admin: { type: Boolean, default: false }
    },
    designation: { type: String, lowercase: true, trim: true },
    is_active: { type: Boolean, default: true },
    doj: { type: Object, default: dateFormat.now },
    project_code: { type: String, required: true, trim: true, lowercase: true }
}, { timestamps: true });
UserSchema.methods.comparePassword = function (newPassword, cb) {
    bcrypt.compare(newPassword, this.password, (err, isMatched) => {
        if (err)
            cb(err);
        else
            cb(null, isMatched);
    });
};
UserSchema.pre('save', function (next) {
    const salt_factor = 9;
    let user = this;
    if (user.isModified('password')) {
        if (('fullname' in user) && user.fullname) {
            const words = user.fullname.split(" ");
            user.fullname = words.map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(" ");
        }
        bcrypt.genSalt(salt_factor, function (err, salt) {
            if (err)
                return next(err);
            bcrypt.hash(user.password, salt, null, function (err, hash) {
                if (err)
                    next(err);
                else {
                    user.password = hash;
                    next();
                }
            });
        });
    }
    else
        next();
});
module.exports = mongoose.model('users', UserSchema);
