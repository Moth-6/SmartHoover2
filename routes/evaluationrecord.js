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
router.post('/:id/:gid',function(req,res) {
        var calculatedBonus = (req.body.actualValue/req.body.targetValue)*50;
        let msg = new Smodel({

            id: req.params.id,
            gid: req.params.gid,

            attribute: req.body.attribute,
            targetValue: req.body.targetValue,
            actualValue: req.body.actualValue,

            bonus:calculatedBonus
        });
        msg.save().then((response,doc) => {
            console.log(response);
            res.send(doc);
        });

});

router.put('/',function(req,res){
    //todo id not found
    var calculatedBonus = (req.body.actualValue/req.body.targetValue)*50;
    Smodel.findOneAndUpdate(
        {
            id:req.body.id,
            gid:req.body.gid
        },
        {
            attribute:req.body.attribute,
            targetValue: req.body.targetValue,
            actualValue: req.body.actualValue,
            bonus: calculatedBonus

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
router.put('/:id/:gid',function(req,res){
    //todo id not found
    var calculatedBonus = (req.body.actualValue/req.body.targetValue)*50;
    Smodel.findOneAndUpdate(
        {
            id:req.params.id,
            gid:req.params.gid
        },
        {
            attribute:req.body.attribute,
            targetValue: req.body.targetValue,
            actualValue: req.body.actualValue,
            bonus: calculatedBonus

        },
        {
            new: true,                       // return updated doc
            runValidators: true              // validate before update
        })
        .then(doc => {
            console.log(doc);
            res.send(doc)
        })
        .catch(err => {
            console.error(err);
            res.send(doc)
        })


});
router.delete('/:id/:gid',function(req,res){
    Smodel.findOneAndRemove({
        id:req.params.id,
        gid:req.params.gid
    })
        .then(response => {
            console.log(response);
            res.send(response)
        })
        .catch(err => {
            console.error(err);
            res.send(err)
        })
});





router.get('/employee', function(req, res, next) {
    const request = require('request')
    var token;

    request.post('https://sepp-hrm.inf.h-brs.de/symfony/web/index.php/oauth/issueToken', {
        json: {
            "client_id": "orange",
            "client_secret": "hrm",
            "grant_type": "client_credentials"
        }
    }, (error, res, body) => {
        if (error) {
            console.error(error)
            return
        }
        console.log(`statusCode: ${res.statusCode}`)
        token = body.access_token;
        console.log(token.toString())

        const options = {
            url: 'https://sepp-hrm.inf.h-brs.de/symfony/web/index.php/api/v1/employee/3',
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + token.toString()
            }
        };

        request(options, function(err, res, body) {
            let json = JSON.parse(body);
            console.log(json.data.unit);
        });
    });
    res.send(next);
});


router.post('/employee/:id/bonus/:value',function(req,res) {

    const request = require('request')
    var token;
    let response = res;
    request.post('https://sepp-hrm.inf.h-brs.de/symfony/web/index.php/oauth/issueToken', {
        json: {
            "client_id": "orange",
            "client_secret": "hrm",
            "grant_type": "client_credentials"
        }
    }, (error, res, body) => {
        if (error) {
            console.error(error)
            return
        }
        console.log(`statusCode: ${res.statusCode}`)
        token = body.access_token;
        console.log(token.toString())

        request.post('https://sepp-hrm.inf.h-brs.de/symfony/web/index.php/api/v1/employee/' + req.params.id + '/custom-field', {
            form: {
                fieldId: "8",
                value: req.params.value
            },
            headers: {
                'Authorization': 'Bearer ' + token.toString()
            }
        }, (error, res, body) => {
            if (error) {
                console.error(error)
                return
            }
            console.log(`statusCode: ${res.statusCode}`)
            console.log(body)
            response.send(res)

        });

    });

    //res.send(res);

})

router.get('/employee/:id/bonus', function(req, res, next) {
    const request = require('request')
    var token;
    let response = res;
    request.post('https://sepp-hrm.inf.h-brs.de/symfony/web/index.php/oauth/issueToken', {
        json: {
            "client_id": "orange",
            "client_secret": "hrm",
            "grant_type": "client_credentials"
        }
    }, (error, res, body) => {
        if (error) {
            console.error(error)
            return
        }
        console.log(`statusCode: ${res.statusCode}`)
        token = body.access_token;
        console.log(token.toString())

        const options = {
            url: 'https://sepp-hrm.inf.h-brs.de/symfony/web/index.php/api/v1/employee/'+req.params.id+'/custom-field',
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + token.toString()
            }
        };

        request(options, function(err, res, body) {
            let json = JSON.parse(body);
            //console.log(json);
            //console.log(res.body)
            response.send(json.data[2].value)

        });

    });

});


router.get('/employee/:id/picture', function(req, res, next) {
    const request = require('request')
    var token;

    request.post('https://sepp-hrm.inf.h-brs.de/symfony/web/index.php/oauth/issueToken', {
        json: {
            "client_id": "orange",
            "client_secret": "hrm",
            "grant_type": "client_credentials"
        }
    }, (error, res, body) => {
        if (error) {
            console.error(error)
            return
        }
        console.log(`statusCode: ${res.statusCode}`)
        token = body.access_token;
        console.log(token.toString())

        const options = {
            url: 'https://sepp-hrm.inf.h-brs.de/symfony/web/index.php/api/v1/employee/'+req.params.id+'/photo',
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + token.toString()
            }
        };

        request(options, function(err, res, body) {
            //let json = JSON.parse(body);
        });

    });
    res.send(res);
});

module.exports = router;