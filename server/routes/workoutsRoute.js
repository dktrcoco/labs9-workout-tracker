const express = require("express");
const db = require("../database/dbConfig");
const router = express.Router();

//Get all workouts
router.get("/all", async (req, res) => {
  try {
    const allWorkouts = await db("workouts");
    res.status(200).json(allWorkouts);
  } catch (error) {
    res.status(500).json({
      "Well this is embarrassing": "Something went wrong",
      error
    });
  }
});

//GET Workout set
router.get("/:id", async (req, res) => {
  try {
    //grab the user ID from the user's DB
    const userInfo = await db("users").where("id", "=", req.params.id);
    userId = userInfo[0].id;
    //use that user ID to pull the workouts associated with the user
    const workoutInfo = await db("workouts").where("user_id", "=", userId);
    //workouts return as an array
    res.status(200).json(workoutInfo);
  } catch (error) {
    res.status(500).json({
      "Well this is embarrassing": "Something went wrong",
      error
    });
  }
});

// Create new set of workouts
router.post("/:id", async (req, res) => {
  try {
    //Grab user_id from user table
    const userInfo = await db("users").where("id", "=", req.params.id);
    let userId = userInfo[0].id;
    //Create Object from req.body data and user_id
    const insertObj = {
      title: req.body.title,
      category_id: req.body.category_id,
      user_id: userId
    };
    //Insert Obj into workout table to create the workout ID
    const addWorkout = await db("workouts").insert(insertObj);
    
    const workout = {
      ...insertObj,
      id: addWorkout[0]
    };

    console.log("workout: ", workout);
    const exercisesArr = req.body.exercises;
    console.log(exercisesArr);
    for (let exercise of exercisesArr) {
      const exerciseObj = {
        ...exercise,
        workout_id: workout.id
      };
      console.log("exerciseObj: ", exerciseObj);
      const addExercises = await db("exercises").insert(exerciseObj);
    }
    const completeExercises = await db("exercises").where(
      "workout_id",
      "=",
      workout.id
    );
    insertObj.exercises = completeExercises;
    res.status(201).json(insertObj);
  } catch (error) {
    res.status(500).json({ error });
  }
});

// EDIT set of workouts
router.put("/edit/:id", async (req, res) => {
  const workoutObj = ({ title, category_id, exercises } = req.body);
  console.log("workoutObj:", workoutObj);
  try {
    const updatedWorkout = await db("workouts")
      .where("id", "=", req.params.id)
      .update(workoutObj);
    {
      updatedWorkout === 0
        ? res.status(404).json({
            message: "The workout with the specified ID does not exist."
          })
        : res.status(200).json(workoutObj);
    }
  } catch (error) {
    console.log("the req.params.id is... ", req.params.id);
    console.log("the error is... ", error);
    res.status(500).json(error);
  }
});

module.exports = router;
