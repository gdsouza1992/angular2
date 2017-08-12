const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const db = 'mongodb://gdsouza:gdsouza2192@ds015730.mlab.com:15730/videoplayer';
const Video = require('../models/video');


mongoose.Promise = global.Promise;
mongoose.connect(db, (err) => {
    if(err){
        console.log("Error in connecting to mongodb");
    }
}) 


router.get('/videos',(req,res)=>{
    console.log("GET request for all videos");
    Video.find({})
    .exec((err,videos) => {
        if(err){
            console.log("ERROR in getting videos", err);
            res.json(err);
        } else {
            res.json(videos);
        }

    });

});


router.get('/video/:id',(req,res)=>{
    console.log("GET request for single video");
    Video.findById(req.params.id)
    .exec((err,video) => {
        if(err){
            console.log("ERROR in getting videos", err);
            res.json(err);
        } else {
            res.json(video);
        }
    });
});

router.post('/video', (req, res) => {
    console.log("POST request for video");
    const newVideo = new Video();
    newVideo.title = req.body.title;
    newVideo.url = req.body.url;
    newVideo.description = req.body.description;

    newVideo.save((err, insertedVideo) => {
        if(err){
            console.log("ERROR in saving video",err);
            res.json(err);
        } else {
            res.json(insertedVideo);
        }
    })
});

router.put('/video/:id', (req, res) => {
    console.log("UPDATE request for video");
    Video.findByIdAndUpdate(
        req.params.id,
        {
            $set: {
                title: req.body.title,
                url: req.body.url,
                description: req.body.description
            }
        },
        {
            new: true
        },
        (err, updatedVideo) => {
            if(err){
                console.log("ERROR in updating video");
                res.json(err);
            } else {
                res.json(updatedVideo);
            }
        }
    );
});


module.exports = router;