
exports.up = function(knex, Promise) {
  return knex.schema
    .createTable("events", function(table) {
      table.increments();
      table.integer("sport_id").unsigned().notNullable();
      table.foreign("sport_id").references("id").inTable("sports")
      table.string("name")
    })
};

exports.down = function(knex, Promise) {
  return knex.schema
    .dropTable("events");
};
