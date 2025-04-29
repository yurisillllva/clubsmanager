const express = require('express');
const ClubController = require('../controllers/ClubController');

const router = express.Router();

router.get('/clubs', ClubController.index);
router.get('/clubs/:id', ClubController.show);
router.post('/clubs', ClubController.store);
router.put('/clubs/:id', ClubController.update);
router.delete('/clubs/:id', ClubController.delete);

module.exports = router;