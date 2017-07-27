/**
 * Created by Administrator on 2017/7/17.
 */
const express = require('express');
const router = express.Router();


let photos = [];
photos.push({
    name: 'Node.js Logo',
    path: 'http://nodejs.org/images/logos/nodejs-green.png'
});

photos.push({
    name: 'Ryan Speaking',
    path: 'http://nodejs.org/images/ryan-speaker.jpg'
});

router.get('/', (req, res, next) => {
    res.render('photos', {
        title: 'Photos',
        photos: photos
    })
});

module.exports = router;