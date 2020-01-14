var express = require('express');
var router = express.Router();
let Smodel = require('../models/evaluationrecord');
let mongoose = require('mongoose');
let db = require('../src/database.js');


router.get('/', function(req, res, next) {

    mongoose.connection.db.collection('evaluationrecords').find().toArray((err,items)=>{
        res.send(items);
    })

});

//test
router.get('/:id/:gid', function(req, res, next) {
    Smodel
        .find({
            id:req.params.id,
            gid:req.params.gid
        })
        .then(doc => {
            console.log(doc);
            res.send(doc);

        })
        .catch(err => {
            console.error(err)
        })


});
router.get('/:id', function(req, res, next) {
    Smodel
        .find({
            id:req.params.id
        })
        .then(doc => {
            console.log(doc);
            res.send(doc);

        })
        .catch(err => {
            console.error(err)
        })


});
router.post('/',function(req,res) {
    if ( Smodel.countDocuments({id: req.body.id})>=1) { /// TODO STILL DOESNT WORK
        res.send('error duplicate id  ');
    } else {
        let msg = new Smodel({
            id: req.body.id,
            gid: req.body.gid,
            attribute: req.body.attribute,
            targetValue: req.body.targetValue,
            actualValue: req.body.actualValue,
            bonus: req.body.bonus
        });
        msg.save();


        res.send('posted successfully  ');
    }
});
router.put('/',function(req,res){
    //todo id not found
    Smodel.findOneAndUpdate(
        {
            id:req.body.id,
            gid:req.body.gid
        },
        {
            attribute:req.body.attribute,
            targetValue: req.body.targetValue,
            actualValue: req.body.actualValue,
            bonus: req.body.bonus

        },
        {
            new: true,                       // return updated doc
            runValidators: true              // validate before update
        })
        .then(doc => {
            console.log(doc);
            res.send('updated successfully')
        })
        .catch(err => {
            console.error(err);
            res.send('error')
        })


});
router.delete('/',function(req,res){
    Smodel.findOneAndRemove({
        id:req.body.id,
        gid:req.body.gid
    })
        .then(response => {
            console.log(response);
            res.send('deleted successfully')
        })
        .catch(err => {
            console.error(err);
            res.send('error')
        })
});

module.exports = router;