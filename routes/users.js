var express = require('express');
var router = express.Router();

const db = require('../models/photo');

/*
* 链接数据库
* */
db.connect();

/*
* 查询列表页
* */
router.get('/', (req, res, next) => {
    db.query("select * from user", (err, rows) => {
        if (err){
            res.render("users", {title: "用户列表", data: []});
        }else {
            res.render("users", {title: "用户列表", data: rows, s_name: '', s_age: ''});
        }
    })
});

/*
* 添加用户
* */
router.get('/add', (req, res, next) => {
    res.render('add');
});
router.post('/add', (req, res, next) => {
    let name = req.body.name;
    let age = req.body.age;
    db.query("insert into user(name, age) values('" + name + "'," + age + ")", (err, rows) => {
        if (err) {
            res.send("新增失败" + err);
        }else {
            res.redirect("/users");
        }
    });
});


/*
* 删除用户
* */
router.get('/del/:id', (req, res) => {
    let id = req.params.id;
    db.query("delete from user where id = " + id, (err, rows) => {
        if (err) {
            res.send("删除失败" + err);
        }else {
            res.redirect("/users");
        }
    })
});

/*
* 修改
* */
router.get('/toUpdate/:id', (req, res) => {
    let id = req.params.id;
    let sql = "select * from user where id =" + id;
    db.query(sql, (err, rows) => {
        if (err) {
            res.send('修改页面跳转失败');
        }else {
            res.render("update", {data: rows});
        }
    })
});
router.post("/update", (req, res, next) => {
    let id = req.body.id;
    let name = req.body.name;
    let age = req.body.age;
    let sql = "update user set name = '" + name + "', age = " + age + " where id = " + id;
    db.query(sql, (err, rows) => {
        if (err) {
            res.send("修改失败" + err)
            /*console.log(sql);*/
        }else {
            res.redirect("/users")
        }
    })
});

/*
* 查询
* */
router.post("/search", (req, res, next) => {
    let name = req.body.s_name;
    let age = req.body.s_age;
    let sql = "select * from user";
    /*if (name) {
        sql += " where name = '" + name + "'";
    }
    sql.replace("and", "where");*/
    if (name && age) {
        sql += " where name = '" + name + "' and age = " + age;
    }else if (name) {
        sql += " where name = '" + name + "'";
    }else if(age) {
        sql += " where age = " + age;
    }
    db.query(sql, (err, rows) => {
        if (err) {
            res.send("查询失败" + err);
        }else {
            res.render("users", {title: "用户列表", data: rows, s_name: name, s_age: age})
        }
    })
});
/*
*
* */
/*/!* GET users listing. *!/
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});*/

module.exports = router;
