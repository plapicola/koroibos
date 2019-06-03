
exports.up = function(knex, Promise) {
  return knex.schema
    .createTable("sports", function(table) {
      table.increments();
      table.string("name");
    })
};

exports.down = function(knex, Promise) {
  return knex.schema
    .dropTable("sports");
};
