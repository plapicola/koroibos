
exports.up = function(knex, Promise) {
  return knex.schema
    .alterTable("olympians", function(table) {
      table.integer("sport_id").unsigned().notNullable();
      table.foreign("sport_id").references("id").inTable("sports");
    })
};

exports.down = function(knex, Promise) {
  return knex.schema
    .alterTable("olympians", function(table) {
      table.dropColumn("sport_id");
    })
};
