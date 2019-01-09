const scheduleWorkoutsArr = []

for (let i = 0; i < 49; i++) {
  const d = new Date();
  let month = d.getMonth() + 1;
  let day = d.getDay();

  if (day < 10) {
    day = '0' + day;
  }
  
  if (month < 10) {
    month = '0' + month;
  }

  const dateString = `${d.getFullYear()}-${month}-${day}`
  scheduleWorkouts = {
    user_id: i,
    title: 'Deadlift Day #1',
    date: dateString,
    category_id: 1
    
  }
  scheduleWorkoutsArr.push(scheduleWorkouts)
}

exports.seed = function(knex, Promise) {
  return knex('schedule_workouts').insert(scheduleWorkoutsArr);
};
