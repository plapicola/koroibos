
exports.up = function(knex, Promise) {
  return knex.schema
    .createTable("olympians", function(table) {
      table.increments();
      table.string("name");
      table.integer("age");
      table.integer("height");
      table.integer("weight");
      table.enu("sex", ["M", "F"]);
      table.timestamps(true, true);
    })
};

exports.down = function(knex, Promise) {
  return knex.schema
    .dropTable("olympians");
};
