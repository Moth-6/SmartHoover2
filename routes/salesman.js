var express = require('express');
var router = express.Router();
let Smodel = require('../models/salesman');
let mongoose = require('mongoose');
let db = require('../src/database.js');
mongoose.set('useFindAndModify', false);


router.get('/', function(req, res, next) {

    mongoose.connection.db.collection('salesmen').find().toArray((err,items)=>{
        res.send(items);
    })

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
        msg.save().then((response,doc) => {
            console.log(response);
            res.send(doc);
        });


        //res.send('posted successfully  ');
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
router.delete('/:id',function(req,res){
    /*
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

    Smodel.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Employee Delete :' + JSON.stringify(err, undefined, 2)); }
    });


     */
    Smodel.findOneAndRemove({
        id:req.params.id
    })
        .then((response,doc) => {
            console.log(response);
            res.send(doc);
        })
        .catch((err,doc) => {
            console.error(err);
            res.send(doc)
        })


});

module.exports = router;