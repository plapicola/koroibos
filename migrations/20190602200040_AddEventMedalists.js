
exports.up = function(knex, Promise) {
  return knex.schema
    .createTable("event_medalists", function(table) {
      table.increments();
      table.enu("medal", ["Gold", "Silver", "Bronze"]);
      table.integer("event_id").unsigned().notNullable();
      table.foreign("event_id").references("id").inTable("events")
      table.integer("olympian_id").unsigned().notNullable();
      table.foreign("olympian_id").references("id").inTable("olympians")
    })
};

exports.down = function(knex, Promise) {
  return knex.schema
    .dropTable("event_medalists")
};
