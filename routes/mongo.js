const express = require('express');
const router = express.Router();
const user = require('../models/mongo');
const find = require('../check/check');

/* Get home page */
router.get('/', (req, res) => {
    res.render('mongoDemo/mongo', {
        title: 'index'
    })
});

/* login */
router.get('/login', (req, res) => {
    res.render('mongoDemo/login', {
        title: 'login'
    })
});
router.post('/login', (req, res) => {
    user.findOne({
        name: req.body.name
    }, (err, data) => {
        if (err) {
            console.log(err)
        } else if (data){
            if (data.password === req.body.password) {
                console.log(req.body.name + '登陆成功' + new Date());
                let se = req.session;
                let flag = find(req.body.name);
                if (flag) {
                    req.session
                }
                res.render('mongoDemo/user-center', {
                    user: data.name
                })
            } else {
                console.log('用户名或密码输入错误');
                res.redirect('/mongo/login');
            }
        }else {
            console.log('没有此用户，请注册');
            res.redirect('/mongo/register')
        }

    })
});

/* register */
router.get('/register', (req, res) => {
    res.render('mongoDemo/register', {
        title: 'register'
    })
});
router.post('/register', (req, res) => {
    user.findOne({
        name: req.body.name
    }, (err, docs) => {
        if (err) {
            console.log(err)
        } else if (!docs) {
            user.create({
                name: req.body.name,
                password: req.body.password
            }, (err, doc) => {
                if (err) {
                    console.log(err)
                } else  {
                    console.log(doc)
                }
            });
            res.render('mongoDemo/user-center', {
                user: req.body.name
            })
        } else {
            console.log('用户已存在');
            res.redirect('/mongo/register')
        }
    })
});

/* userCenter */
router.post('/userCenter', (req, res) => {
    let query = {
        name: req.body.name,
        password: req.body.password
    };
    user.count(query, (err, doc) => {
        if (doc === 1) {
            console.log(query.name + ": 登录成功 " + new Date());
            res.render('mongoDemo/user-center', {
                user: query.name
            })
        } else {
            console.log(query.name + ": 登录失败 " + new Date());
            res.redirect('/mongo')
        }
    })
});

module.exports = router;