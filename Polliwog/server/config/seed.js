/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var User = require('../api/user/user.model');
var Init = require('../api/Init.scenario');

User.find({}).remove(function() {
  User.create({
    provider: 'local',
    name: 'Test User',
    email: 'test@test.com',
    password: 'test'
  }, {
    provider: 'local',
    role: 'admin',
    name: 'Admin',
    email: 'admin@admin.com',
    password: 'admin'
  }, {
      provider: 'local',
      role: 'speaker',
      name: 'Speaker',
      email: 'speaker@speaker.com',
      password: 'speaker'
    },

    function(err) {
      console.log('finished populating users');
      Init.run();
    }
  );
});
