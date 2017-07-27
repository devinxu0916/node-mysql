/**
 * Created by Administrator on 2017/7/18.
 */
const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();
const join = path.join;

router.get('/upload', (req, res) => [
    res.render('photos/upload', {
        title: 'Photo upload'
    })
]);

/*router.post('/', (dir) => {
    return function (req, res, next) {
        let img = req.files.photo.image;
        let name = req.body.photo.name || img.name;
    }
});*/
router.post('/upload', (req, res, next) => {
   console.log(req.body);
   console.log(req.files);
});

module.exports = router;
