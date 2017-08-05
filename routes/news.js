var express = require('express');
var router = express.Router();

var data = [
    {
        id: 1,
        cid: 1,
        title: '战狼'
    },
    {
        id: 2,
        cid: 1,
        title: '战狼2'
    },
    {
        id: 3,
        cid: 2,
        title: '战狼3'
    },
    {
        id: 4,
        cid: 2,
        title: '战狼4'
    }
];
router.get('/', (req, res, next) => {
    res.render('news/cateList');
});

router.get('/cateList', (req, res, next) => {
    res.render('news/cateList');
});

router.get('/list/:id', (req, res, next) => {
    let cid = req.params.id;
    let newData = [];
    for (let i = 0; i < data.length; i++) {
        if (data[i].cid == cid) {
            newData.push(data[i])
        }
    }
    res.render('news/list', {data: newData});
});

module.exports = router;
