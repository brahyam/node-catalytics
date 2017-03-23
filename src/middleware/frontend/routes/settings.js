const express = require('express');
const router = express.Router();

module.exports = function (app) {

  router.get('/', function (req, res, next) {
    res.render('settings');
  });

  router.get('/approvals', function (req, res, next) {
    app.service('users').find({paginate: false, query: {approved: false}})
      .then(results => {
        console.log('found pending:', results);
        if (results) {
          res.render('userApprovals', {users: results});
        }
      })
      .catch(err => console.error(err));
  });

  router.get('/approvals/:id', function (req, res, next) {
    // var userId = req.params.id;
    // if(userId){
    //   app.service('users').update(userId,{approved:true},)
    //     .then(user => {
    //       if(user){
    //         user.approved = true;
    //         user.save
    //       }
    //     })
    //     .catch(err => console.error(err));
    // }
  });


  return router;
};
