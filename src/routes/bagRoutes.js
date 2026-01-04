const express = require("express");
const mongoose = require("mongoose");
const Bag = require("../models/bag");

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const bag = await Bag.create(req.body);
    return res.status(201).json(bag);
  } catch (err) {
    return res.status(400).json({
      error: "Validation error",
      message: err.message,
    });
  }
});

router.get("/", async (req, res) => {
  try {
    const bags = await Bag.find().sort({ createdAt: -1 });
    return res.json(bags);
  } catch (err) {
    return res.status(500).json({
      error: "Server error",
      message: err.message,
    });
  }
});

router.patch("/:id/vote", async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        error: "Invalid id",
        message: "This is not a valid MongoDB ObjectId",
      });
    }

    const updatedBag = await Bag.findByIdAndUpdate(
      id,
      { $inc: { votes: 1 } },
      { new: true }
    );

    if (!updatedBag) {
      return res.status(404).json({
        error: "Not found",
        message: "Bag not found",
      });
    }

    return res.json({
      votes: updatedBag.votes,
      bag: updatedBag,
    });
  } catch (err) {
    return res.status(500).json({
      error: "Server error",
      message: err.message,
    });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        error: "Invalid id",
        message: "This is not a valid MongoDB ObjectId",
      });
    }

    const bag = await Bag.findById(id);

    if (!bag) {
      return res.status(404).json({
        error: "Not found",
        message: "Bag not found",
      });
    }

    return res.json(bag);
  } catch (err) {
    return res.status(500).json({
      error: "Server error",
      message: err.message,
    });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        error: "Invalid id",
        message: "This is not a valid MongoDB ObjectId",
      });
    }

    const updatedBag = await Bag.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedBag) {
      return res.status(404).json({
        error: "Not found",
        message: "Bag not found",
      });
    }

    return res.json(updatedBag);
  } catch (err) {
    return res.status(400).json({
      error: "Validation error",
      message: err.message,
    });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        error: "Invalid id",
        message: "This is not a valid MongoDB ObjectId",
      });
    }

    const deletedBag = await Bag.findByIdAndDelete(id);

    if (!deletedBag) {
      return res.status(404).json({
        error: "Not found",
        message: "Bag not found",
      });
    }

    return res.json({
      message: "Bag deleted successfully",
      bag: deletedBag,
    });
  } catch (err) {
    return res.status(500).json({
      error: "Server error",
      message: err.message,
    });
  }
});

module.exports = router;
