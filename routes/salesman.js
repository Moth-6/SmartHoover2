var express = require('express');
var router = express.Router();
let Smodel = require('../models/salesman');
let mongoose = require('mongoose');
let db = require('../src/database.js');


router.get('/', function(req, res, next) {
    res.send('HEY HEY ');
    /*mangoose.connection.db.collection('salesmen').find().toArray((err,items)=>{
        res.send(items);
    })
    */
});
router.get('/:id', function(req, res, next) {
     Smodel.find({id:req.params.id})
        .then(doc => {
            console.log(doc)
            res.send('this is '+ doc);

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
            name: req.body.name,
            age: req.body.age
        })
        msg.save()


        res.send('posted successfully  ');
    }
});
router.put('/',function(req,res){
    //todo id not found
    Smodel.findOneAndUpdate(
        {
            id:req.body.id
        },
        {
            name:req.body.name,
            age: req.body.age
        },
        {
            new: true,                       // return updated doc
            runValidators: true              // validate before update
        })
        .then(doc => {
            console.log(doc)
            res.send('updated successfully')
        })
        .catch(err => {
            console.error(err)
            res.send('error')
        })


});
router.delete('/',function(req,res){
    Smodel.findOneAndRemove({
        id:req.body.id
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