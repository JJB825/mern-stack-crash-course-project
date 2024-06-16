const express = require('express')
const {
  getallWorkouts,
  getsingleWorkout,
  createWorkout,
  deleteWorkout,
  updateWorkout,
} = require('../controllers/workoutController')
const router = express.Router()

// GET all workouts
router.get('/', getallWorkouts)

// GET a single workout
router.get('/:id', getsingleWorkout)

// POST a new workout
router.post('/', createWorkout)

// DELETE a workout
router.delete('/:id', deleteWorkout)

// UPDATE a workout
router.patch('/:id', updateWorkout)

// exports all routes created here to be used in server.js
module.exports = router
