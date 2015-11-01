/**
 * index.js
 *
 * Created on: 2015-11-01
 *     Author: Yassin Kammoun (yassin.kammoun@heig-vd.ch)
 */

'use strict';

var express = require('express');
var controller = require('./question.controller');

var router = express.Router();

router.get('/:poll_id/', controller.index);
router.get('/:poll_id/questions/:id', controller.show);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);

module.exports = router;