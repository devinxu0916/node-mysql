const user = require('../models/mongo');

let find = function (name) {
    let flag = false;
    user.find({name: name}, (err, data) => {
        if (data) {
            flag = true
        }
        return flag
    })
};

module.exports = find;
