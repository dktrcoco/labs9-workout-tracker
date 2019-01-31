import React, { useState, useContext } from "react";
import { Store } from "../../index";
import FormModal from "../../shared/FormModal";
import ExerciseDetails from "./ExerciseDetails";
import axios from "axios";
import styled from "styled-components";
import firebase from "firebase";
import AddWorkout from "./AddWorkout";
import Button from "../../shared/Button";

const WorkoutDetails = props => {
  const { state, dispatch } = useContext(Store);

  const [selectedDate, setSelectedDate] = useState(state.selectedDate);
  const [addingWorkout, setAddingWorkout] = useState(false);
  const [completed, setCompleted] = useState(false);

  const dateStringParser = date => {
    if (date.length === 10) {
      return date;
    }
    date = date.split("T")[0].split("-");

    const newDate = date[0] + "/" + date[1] + "/" + date[2];

    return new Date(newDate);
  };

  const toggleAddingWorkout = e => {
    e.preventDefault();
    setAddingWorkout(!addingWorkout);
  };

  const dateFormat = d => {
    let month = d.getMonth() + 1;
    let day = d.getDate();

    if (day < 10) {
      day = "0" + day;
    }

    if (month < 10) {
      month = "0" + month;
    }

    return `${d.getFullYear()}-${month}-${day}`;
  };

  const unscheduleWorkout = async (e, scheduleWorkout) => {
    console.log(scheduleWorkout);
    const token = await firebase.auth().currentUser.getIdToken();

    const deleteRes = await axios.delete(
      `https://fitmetrix.herokuapp.com/api/schedule/delete/workout/${
        scheduleWorkout.id
      }`,
      {
        headers: {
          Authorization: token
        }
      }
    );

    console.log("deleteRes:", deleteRes);

    if (deleteRes.status === 200) {
      console.log("200 OK");
      const newScheduleWorkouts = await axios.get(
        "https://fitmetrix.herokuapp.com/api/schedule",
        {
          headers: {
            Authorization: token
          }
        }
      );

      dispatch({
        type: "UPDATE_SCHEDULE_WORKOUTS",
        payload: newScheduleWorkouts.data
      });
    }
  };

  // const renderWorkout = () => {
  //   if (props.datePopulated === false) {
  //     return (
  //       <div>
  //         <WorkoutDetailsDiv>
  //           No workouts Scheduled
  //           <Button
  //             onClick={e => {
  //               toggleAddingWorkout(e);
  //             }}
  //           >
  //             Schedule Workout
  //           </Button>
  //           {addingWorkout === true ? (
  //             <AddWorkout
  //               workouts={state.workouts}
  //               scheduleWorkouts={state.scheduleWorkouts}
  //               selectedDate={props.selectedDate}
  //             />
  //           ) : null}
  //         </WorkoutDetailsDiv>
  //       </div>
  //     );
  //   }
  // };

  const completedWorkout = async (e, scheduleWorkout) => {
    e.preventDefault();
    const token = await firebase.auth().currentUser.getIdToken();

    const updateRes = await axios
      .put(
        `https://fitmetrix.herokuapp.com/api/schedule/edit/workout/${
          scheduleWorkout.id
        }`,
        { completed: false },
        {
          headers: {
            Authorization: token
          }
        }
      )
      .catch(err => console.log("err", err));
    console.log("updateRes:", updateRes);
    if (updateRes.status === 200) {
      console.log("200 OK");
      const newScheduleWorkouts = await axios.get(
        "https://fitmetrix.herokuapp.com/api/schedule",
        {
          headers: {
            Authorization: token
          }
        }
      );

      dispatch({
        type: "UPDATE_SCHEDULE_WORKOUTS",
        payload: newScheduleWorkouts.data
      });
    }
  };

  const calcPercentage = workout => {
    const total = workout.exercises.length;
    const totalcomplete = 0;
    workout.exercises.map(exercise => {
      if (exercise.completed === true) {
        totalcomplete++;
      }
    });
    if (total !== 0 && total === totalcomplete) {
      setCompleted(true);
    }
    return totalcomplete / total;
  };

  return (
    <FormModal
      onSubmit={{ completedWorkout }}
      closeModal={() => dispatch({ type: "UPDATE_DATE_SELECTED" })}
      title={"Workout Details"}
    >
      <WorkoutContainer>
        {/* {renderWorkout()} */}
        {props.selectedDate === null
          ? state.scheduleWorkouts &&
            state.scheduleWorkouts.map(scheduleWorkout => {
              if (
                dateFormat(dateStringParser(scheduleWorkout.date)) ===
                dateFormat(props.currentDay)
              ) {
                return (
                  <WorkoutDetailsDiv key={scheduleWorkout.id}>
                    <WorkoutTitleDiv>
                      <h3>{scheduleWorkout.title}</h3>
                      <Button
                        type="button"
                        onClick={e => unscheduleWorkout(e, scheduleWorkout)}
                      >
                        Unschedule
                      </Button>
                    </WorkoutTitleDiv>
                    <ExerciseListDiv>
                      {scheduleWorkout.exercises &&
                        scheduleWorkout.exercises.map(exercise => {
                          return (
                            <ExerciseDetails
                              dispatch={props.dispatch}
                              key={exercise.id}
                              exercise={exercise}
                            />
                          );
                        })}
                    </ExerciseListDiv>
                  </WorkoutDetailsDiv>
                );
              }
            })
          : state.scheduleWorkouts &&
            state.scheduleWorkouts.map(scheduleWorkout => {
              if (
                dateFormat(dateStringParser(scheduleWorkout.date)) ===
                dateFormat(props.selectedDate)
              ) {
                return (
                  <WorkoutDetailsDiv key={scheduleWorkout.id}>
                    <WorkoutTitleDiv>
                      <h3>{scheduleWorkout.title}</h3>
                    </WorkoutTitleDiv>
                    <ExerciseListDiv>
                      {scheduleWorkout.exercises &&
                        scheduleWorkout.exercises.map(exercise => {
                          return (
                            <ExerciseDetails
                              dispatch={props.dispatch}
                              key={exercise.id}
                              exercise={exercise}
                            />
                          );
                        })}
                    </ExerciseListDiv>
                    <Button
                      type="button"
                      onClick={e => completedWorkout(e, scheduleWorkout)}
                    >
                       Workout Complete
                    </Button>
                    <Button
                      type="button"
                      onClick={e => unscheduleWorkout(e, scheduleWorkout)}
                    >
                      Unschedule Workout
                    </Button>
                  </WorkoutDetailsDiv>
                );
              }
            })}
      </WorkoutContainer>
    </FormModal>
  );
};

export default WorkoutDetails;

const WorkoutContainer = styled.div`
  justify-content: space-around;
  background-color: white;
`;
const WorkoutDetailsDiv = styled.div`
display:flex
padding: 10px;
width:100%
flex-direction:column;
align-items: center;
height: 600px;
Button {
  margin-top:30px;
}
`;

const WorkoutTitleDiv = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-around;
`;

const ExerciseListDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: stretch;
  margin-top: 30px;
  width: 100%;
  div:last-child {
    border-bottom: none;
  }
`;
