export {}
const express = require("express");
const router = express.Router();

const placeController = require('../controllers/places');

router.post('/add', placeController.addPlace);

router.get('/', placeController.getPlaceFields);

module.exports = router;