const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema(
  {
    category: {
      type: String,
      required: true,
      trim: true,
      index: true,
      // e.g. "MRCS Part A", "MRCS Part B"
    },
    subCategory: {
      type: String,
      required: true,
      trim: true,
      index: true,
      // e.g. "ENT", "Anatomy", "Physiology"
    },
    source: {
      type: String,
      trim: true,
      index: true,
      // e.g. "Bailey's ENT MCQ BOOK"
    },
    chapter: {
      type: String,
      trim: true,
      index: true,
      // e.g. "Ch 1: Basic Science"
    },
    stem: {
      type: String,
      required: true,
      trim: true,
    },
    options: {
      type: [String],
      validate: {
        validator: (v) => v.length >= 2 && v.length <= 6,
        message: 'A question must have between 2 and 6 options.',
      },
    },
    correctAnswer: {
      type: String,
      required: true,
      trim: true,
      // Must match one of the strings in options exactly
    },
    rationale: {
      type: String,
      required: true,
      trim: true,
    },
    highYieldSummary: {
      type: String,
      trim: true,
    },
    isDemo: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

questionSchema.index({ category: 1, subCategory: 1, source: 1, chapter: 1, isActive: 1 });
questionSchema.index({ isDemo: 1, isActive: 1 });

module.exports = mongoose.model('Question', questionSchema);