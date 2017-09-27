const mongoose = require('mongoose');
const db = mongoose.connect('mongodb://localhost/test'); // 连接数据库
const Schema = mongoose.Schema; // 创建模型

const UserScheMa = new Schema({
    name: String,
    password: String
});

let user = db.model('users', UserScheMa);

module.exports = user;