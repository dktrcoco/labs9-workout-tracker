const categoryArr = [];

// for(let i = 0; i < 49; i++) {
//   const category = {
//     id: i,
//     name: 'Legs',
//     user_id: i,
//   }
//   categoryArr.push(category)
// }

exports.seed = function(knex, Promise) {
  return knex("category").insert([
    { id: 0, name: "Legs", user_id: 0 },
    { id: 1, name: "Upperbody", user_id: 0 }
  ]);
};
