const router = require('express').Router();
const getController = require('../../controllers/getController');

// Private GET routes here:
// router.get('/secureData', secureGetController.secureData);
router.route('/notes')
    .get(getController.getAllNotes);

router.route('/allBeverages')
    .get(getController.getAllBeverages);

router.route('/bevs/avail')
    .get(getController.getAvailBevs);

module.exports = router;