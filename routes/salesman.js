var express = require('express');
var router = express.Router();
let Smodel = require('../models/salesman');
let mongoose = require('mongoose');



router.get('/', function(req, res, next) {
    res.send('HEY HEY ');
});
router.get('/:id', function(req, res, next) {
    if(parseInt(req.params.id)=== 1 ){
        let msg = new Smodel({
            id:2,
            name:'benten',
            age:10
        })
        msg.save()
            .then(doc=> {
                console.log(doc)
            })
            .catch(err =>{
                console.error(err)
            })
        module.export = mongoose.model('salesman',msg);
        res.send('id 1 found  ');
    }
    else{
        res.send('ID NOT FOUND ');
    }
});
router.post('/',function(req,res,next){


});



module.exports = router;