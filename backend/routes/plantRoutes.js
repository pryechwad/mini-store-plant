const express = require('express');
const router = express.Router();
const {
  getPlants,
  getPlant,
  createPlant,
  updatePlant,
  deletePlant
} = require('../controllers/plantController');

// @route   GET /api/plants
router.get('/', getPlants);

// @route   GET /api/plants/:id
router.get('/:id', getPlant);

// @route   POST /api/plants
router.post('/', createPlant);

// @route   PUT /api/plants/:id
router.put('/:id', updatePlant);

// @route   DELETE /api/plants/:id
router.delete('/:id', deletePlant);

module.exports = router;