const express = require('express');
const mongoose = require('mongoose');
const Bag = require('../models/bag');

const router = express.Router();

/**
 * POST /bag
 * Create a new bag
 */
router.post('/', async (req, res) => {
  try {
    const bag = await Bag.create(req.body);
    return res.status(201).json(bag);
  } catch (err) {
    return res.status(400).json({
      error: 'Validation error',
      message: err.message,
    });
  }
});

/**
 * GET /bag
 * Get all bags
 */
router.get('/', async (req, res) => {
  try {
    const bags = await Bag.find().sort({ createdAt: -1 });
    return res.json(bags);
  } catch (err) {
    return res.status(500).json({
      error: 'Server error',
      message: err.message,
    });
  }
});

/**
 * GET /bag/:id
 * Get 1 bag by id
 */
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // check if id is valid mongo objectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        error: 'Invalid id',
        message: 'This is not a valid MongoDB ObjectId',
      });
    }

    const bag = await Bag.findById(id);

    if (!bag) {
      return res.status(404).json({
        error: 'Not found',
        message: 'Bag not found',
      });
    }

    return res.json(bag);
  } catch (err) {
    return res.status(500).json({
      error: 'Server error',
      message: err.message,
    });
  }
});

/**
 * PUT /bag/:id
 * Update a bag by id
 */
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        error: 'Invalid id',
        message: 'This is not a valid MongoDB ObjectId',
      });
    }

    const updatedBag = await Bag.findByIdAndUpdate(id, req.body, {
      new: true,         // return updated document
      runValidators: true // enforce schema validation on update
    });

    if (!updatedBag) {
      return res.status(404).json({
        error: 'Not found',
        message: 'Bag not found',
      });
    }

    return res.json(updatedBag);
  } catch (err) {
    return res.status(400).json({
      error: 'Validation error',
      message: err.message,
    });
  }
});

/**
 * DELETE /bag/:id
 * Delete a bag by id
 */
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        error: 'Invalid id',
        message: 'This is not a valid MongoDB ObjectId',
      });
    }

    const deletedBag = await Bag.findByIdAndDelete(id);

    if (!deletedBag) {
      return res.status(404).json({
        error: 'Not found',
        message: 'Bag not found',
      });
    }

    return res.json({
      message: 'Bag deleted successfully',
      bag: deletedBag,
    });
  } catch (err) {
    return res.status(500).json({
      error: 'Server error',
      message: err.message,
    });
  }
});

module.exports = router;
